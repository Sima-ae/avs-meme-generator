'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toPng, toJpeg } from 'html-to-image';
import { Download, Share2, RotateCcw, Check, Sparkles, Upload, Edit3, Save } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { MemeCanvas } from '@/components/meme-canvas';
import { QuizState } from '@/types/quiz';
import { quizAnswers } from '@/data/quizData';
import { useSession } from 'next-auth/react';

interface MemeResultDialogProps {
  isOpen: boolean;
  onClose: () => void;
  quizState: QuizState;
  onReset: () => void;
}

export function MemeResultDialog({ isOpen, onClose, quizState, onReset }: MemeResultDialogProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [uploaded, setUploaded] = useState(false);
  const [autoUploaded, setAutoUploaded] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUserName, setEditedUserName] = useState('');
  const [editedResultText, setEditedResultText] = useState('');
  const { data: session } = useSession();

  // Initialize edited text when dialog opens
  useEffect(() => {
    if (isOpen) {
      setEditedUserName(quizState.userName);
      const selectedAnswers = Object.entries(quizState.answers).map(([, answerId]) => {
        const answer = quizAnswers.find(a => a.id === answerId);
        return answer;
      }).filter(Boolean);
      const primaryAnswer = selectedAnswers[0];
      setEditedResultText(primaryAnswer?.result_text || 'Kiest voor Schiedam');
    }
  }, [isOpen, quizState]);

  // Helper function for rounded rectangles
  const drawRoundedRect = (ctx: CanvasRenderingContext2D, x: number, y: number, width: number, height: number, radius: number) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  };

  // Function to upload meme to prikbord
  const uploadMemeToPrikbord = async (canvas: HTMLCanvasElement, filename: string) => {
    try {
      // Convert canvas to blob
      const blob = await new Promise<Blob>((resolve) => {
        canvas.toBlob((blob) => {
          if (blob) resolve(blob);
        }, 'image/png');
      });

      // Create form data
      const formData = new FormData();
      formData.append('file', blob, filename);
      formData.append('title', `Meme van ${quizState.userName}`);
      // Use session user ID if available, otherwise use anonymous user ID (2)
      formData.append('userId', session?.user?.id || '2');

      // Upload to API
      const response = await fetch('/api/upload-meme', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      
      if (result.success) {
        setUploaded(true);
        setTimeout(() => setUploaded(false), 3000);
        return true;
      }
      return false;
    } catch (error) {
      console.error('Error uploading meme:', error);
      return false;
    }
  };

  // Function to generate meme canvas and upload automatically
  const generateAndUploadMeme = async () => {
    if (autoUploaded) return; // Don't upload multiple times
    
    try {
      console.log('Starting auto-upload process...');
      
      // Load background image
      const backgroundImg = new Image();
      backgroundImg.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        backgroundImg.onload = resolve;
        backgroundImg.onerror = reject;
        backgroundImg.src = '/images/Achtergrond.png';
      });

      console.log('Background image loaded, creating canvas...');

      // Create canvas for manual rendering with higher resolution
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const scale = 2; // Higher resolution for better quality
      canvas.width = 600 * scale;
      canvas.height = 600 * scale;
      ctx!.scale(scale, scale);
      
      // Fill with transparent background
      ctx!.fillStyle = 'transparent';
      ctx!.fillRect(0, 0, 600, 600);
      
      // Calculate meme position (centered)
      const memeWidth = 520;
      const memeHeight = 347;
      const memeX = (600 - memeWidth) / 2;
      const memeY = (600 - memeHeight) / 2;
      
      // Draw yellow background with rounded corners
      ctx!.fillStyle = '#fdee34';
      drawRoundedRect(ctx!, memeX, memeY, memeWidth, memeHeight, 16);
      ctx!.fill();
      
      // Draw background image overlay with rounded corners
      ctx!.save();
      drawRoundedRect(ctx!, memeX, memeY, memeWidth, memeHeight, 16);
      ctx!.clip();
      ctx!.globalAlpha = 0.3;
      ctx!.drawImage(backgroundImg, memeX, memeY, memeWidth, memeHeight);
      ctx!.restore();
      
      // Get the selected answers
      const selectedAnswers = Object.entries(quizState.answers).map(([, answerId]) => {
        const answer = quizAnswers.find(a => a.id === answerId);
        return answer;
      }).filter(Boolean);
      
      const primaryAnswer = selectedAnswers[0];
      if (!primaryAnswer) {
        console.log('No primary answer found');
        return;
      }
      
      console.log('Drawing meme content for:', editedUserName, editedResultText);
      
      // Draw header badge with rounded corners (centered on card)
      const headerText = 'Alles voor Schiedam';
      const headerWidth = 200;
      const headerHeight = 40;
      const headerX = memeX + (memeWidth - headerWidth) / 2;
      const headerY = memeY + 20;
      
      ctx!.fillStyle = '#30302e';
      drawRoundedRect(ctx!, headerX, headerY, headerWidth, headerHeight, 8);
      ctx!.fill();
      
      // Draw header text
      ctx!.fillStyle = 'white';
      ctx!.font = 'bold 16px Arial';
      ctx!.textAlign = 'center';
      ctx!.textBaseline = 'middle';
      ctx!.fillText(headerText, headerX + headerWidth / 2, headerY + headerHeight / 2);
      
      // Draw main content area
      const contentX = memeX + 40;
      const contentY = headerY + headerHeight + 20;
      const contentWidth = memeWidth - 80;
      const contentHeight = memeHeight - headerHeight - 80;
      
      // Draw white background for content
      ctx!.fillStyle = 'white';
      drawRoundedRect(ctx!, contentX, contentY, contentWidth, contentHeight, 12);
      ctx!.fill();
      
      // Draw user name
      ctx!.fillStyle = '#30302e';
      ctx!.font = 'bold 24px Arial';
      ctx!.textAlign = 'center';
      ctx!.textBaseline = 'top';
      ctx!.fillText(editedUserName, contentX + contentWidth / 2, contentY + 20);
      
      // Draw result text (centered)
      ctx!.font = '16px Arial';
      ctx!.textAlign = 'center';
      ctx!.textBaseline = 'top';
      
      // Split text into lines if too long
      const words = editedResultText.split(' ');
      const lines = [];
      let currentLine = '';
      
      for (const word of words) {
        const testLine = currentLine + (currentLine ? ' ' : '') + word;
        const metrics = ctx!.measureText(testLine);
        
        if (metrics.width > contentWidth - 40) {
          if (currentLine) {
            lines.push(currentLine);
            currentLine = word;
          } else {
            lines.push(word);
          }
        } else {
          currentLine = testLine;
        }
      }
      if (currentLine) {
        lines.push(currentLine);
      }
      
      // Draw lines centered vertically
      const lineHeight = 20;
      const totalHeight = lines.length * lineHeight;
      const startY = contentY + (contentHeight - totalHeight) / 2;
      
      lines.forEach((line, index) => {
        ctx!.fillText(line, contentX + contentWidth / 2, startY + index * lineHeight);
      });
      
      // Draw footer elements
      ctx!.font = '12px Arial';
      ctx!.textAlign = 'left';
      ctx!.fillText('www.allesvoorschiedam.nl', memeX + 20, memeY + memeHeight - 20);
      
      ctx!.textAlign = 'right';
      ctx!.fillText('#AllesVoorSchiedam', memeX + memeWidth - 20, memeY + memeHeight - 20);
      
      console.log('Canvas rendered, converting to blob...');

      // Generate filename and upload
      const filename = `alles-voor-schiedam-${editedUserName.toLowerCase().replace(/\s+/g, '-')}.png`;
      const success = await uploadMemeToPrikbord(canvas, filename);
      
      if (success) {
        setAutoUploaded(true);
        setUploaded(true);
        setTimeout(() => setUploaded(false), 3000);
        console.log('✅ Meme successfully auto-uploaded!');
      } else {
        console.error('❌ Upload failed');
      }
      
    } catch (error) {
      console.error('Error auto-uploading meme:', error);
    }
  };

  // No automatic upload - user must approve first

  // Function to approve and upload meme to prikbord
  const handleApproveAndUpload = async () => {
    setIsGenerating(true);
    try {
      await generateAndUploadMeme();
    } catch (error) {
      console.error('Error approving and uploading meme:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadPNG = async () => {
    const memeElement = document.getElementById('meme-canvas');
    if (!memeElement) return;

    setIsGenerating(true);
    try {
      // Load background image
      const backgroundImg = new Image();
      backgroundImg.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        backgroundImg.onload = resolve;
        backgroundImg.onerror = reject;
        backgroundImg.src = '/images/Achtergrond.png';
      });

      // Create canvas for manual rendering with higher resolution
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const scale = 2; // Higher resolution for better quality
      canvas.width = 600 * scale;
      canvas.height = 600 * scale;
      ctx!.scale(scale, scale);
      
      // Fill with transparent background
      ctx!.fillStyle = 'transparent';
      ctx!.fillRect(0, 0, 600, 600);
      
      // Calculate meme position (centered)
      const memeWidth = 520;
      const memeHeight = 347;
      const memeX = (600 - memeWidth) / 2;
      const memeY = (600 - memeHeight) / 2;
      
      // Draw yellow background with rounded corners
      ctx!.fillStyle = '#fdee34';
      drawRoundedRect(ctx!, memeX, memeY, memeWidth, memeHeight, 16);
      ctx!.fill();
      
      // Draw background image overlay with rounded corners
      ctx!.save();
      drawRoundedRect(ctx!, memeX, memeY, memeWidth, memeHeight, 16);
      ctx!.clip();
      ctx!.globalAlpha = 0.3;
      ctx!.drawImage(backgroundImg, memeX, memeY, memeWidth, memeHeight);
      ctx!.restore();
      
      // Draw header badge with rounded corners (centered on card)
      const headerText = 'Alles voor Schiedam';
      const headerWidth = 200;
      const headerHeight = 30;
      const headerX = memeX + (memeWidth - headerWidth) / 2; // Center horizontally
      const headerY = memeY + 20;
      
      ctx!.fillStyle = '#30302e';
      drawRoundedRect(ctx!, headerX, headerY, headerWidth, headerHeight, 8);
      ctx!.fill();
      
      // Save context state and set text properties
      ctx!.save();
      ctx!.font = 'bold 14px Arial';
      ctx!.fillStyle = '#ffffff';
      
      // Measure text for manual centering
      const textMetrics = ctx!.measureText(headerText);
      const textWidth = textMetrics.width;
      const textHeight = 14; // Approximate text height
      
      // Calculate text position for perfect centering
      const textX = headerX + (headerWidth - textWidth) / 2;
      const textY = headerY + headerHeight / 2 + textHeight / 4; // Adjust for baseline
      
      // Draw text with manual centering
      ctx!.fillText(headerText, textX, textY);
      ctx!.restore();
      
      // Draw main content box with rounded corners (centered on card)
      const contentWidth = memeWidth - 80;
      const contentHeight = 140; // Made taller
      const contentX = memeX + (memeWidth - contentWidth) / 2; // Center horizontally
      const contentY = memeY + (memeHeight - contentHeight) / 2; // Center vertically
      
      ctx!.fillStyle = '#ffffff';
      drawRoundedRect(ctx!, contentX, contentY, contentWidth, contentHeight, 16);
      ctx!.fill();
      
      // Draw user name
      ctx!.fillStyle = '#30302e';
      ctx!.font = 'bold 24px Arial';
      ctx!.textAlign = 'center';
      ctx!.fillText(editedUserName, contentX + contentWidth/2, contentY + 40);
      
      // Draw result text
      ctx!.font = '14px Arial';
      ctx!.fillText(editedResultText, contentX + contentWidth/2, contentY + 70);
      
      // Draw footer elements
      ctx!.font = '12px Arial';
      ctx!.textAlign = 'left';
      ctx!.fillText('www.allesvoorschiedam.nl', memeX + 20, memeY + memeHeight - 20);
      
      ctx!.textAlign = 'right';
      ctx!.fillText('#AllesVoorSchiedam', memeX + memeWidth - 20, memeY + memeHeight - 20);
      
      // Convert to data URL and download
      const dataUrl = canvas.toDataURL('image/png');
      
      const filename = `alles-voor-schiedam-${editedUserName.toLowerCase().replace(/\s+/g, '-')}.png`;
      
      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      link.click();

      // Upload to prikbord
      await uploadMemeToPrikbord(canvas, filename);
    } catch (error) {
      console.error('Error generating PNG:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadJPG = async () => {
    const memeElement = document.getElementById('meme-canvas');
    if (!memeElement) return;

    setIsGenerating(true);
    try {
      // Load background image
      const backgroundImg = new Image();
      backgroundImg.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        backgroundImg.onload = resolve;
        backgroundImg.onerror = reject;
        backgroundImg.src = '/images/Achtergrond.png';
      });

      // Create canvas for manual rendering with higher resolution
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const scale = 2; // Higher resolution for better quality
      canvas.width = 600 * scale;
      canvas.height = 600 * scale;
      ctx!.scale(scale, scale);
      
      // Fill with white background
      ctx!.fillStyle = '#ffffff';
      ctx!.fillRect(0, 0, 600, 600);
      
      // Calculate meme position (centered)
      const memeWidth = 520;
      const memeHeight = 347;
      const memeX = (600 - memeWidth) / 2;
      const memeY = (600 - memeHeight) / 2;
      
      // Draw yellow background with rounded corners
      ctx!.fillStyle = '#fdee34';
      drawRoundedRect(ctx!, memeX, memeY, memeWidth, memeHeight, 16);
      ctx!.fill();
      
      // Draw background image overlay with rounded corners
      ctx!.save();
      drawRoundedRect(ctx!, memeX, memeY, memeWidth, memeHeight, 16);
      ctx!.clip();
      ctx!.globalAlpha = 0.3;
      ctx!.drawImage(backgroundImg, memeX, memeY, memeWidth, memeHeight);
      ctx!.restore();
      
      // Draw header badge with rounded corners (centered on card)
      const headerText = 'Alles voor Schiedam';
      const headerWidth = 200;
      const headerHeight = 30;
      const headerX = memeX + (memeWidth - headerWidth) / 2; // Center horizontally
      const headerY = memeY + 20;
      
      ctx!.fillStyle = '#30302e';
      drawRoundedRect(ctx!, headerX, headerY, headerWidth, headerHeight, 8);
      ctx!.fill();
      
      // Save context state and set text properties
      ctx!.save();
      ctx!.font = 'bold 14px Arial';
      ctx!.fillStyle = '#ffffff';
      
      // Measure text for manual centering
      const textMetrics = ctx!.measureText(headerText);
      const textWidth = textMetrics.width;
      const textHeight = 14; // Approximate text height
      
      // Calculate text position for perfect centering
      const textX = headerX + (headerWidth - textWidth) / 2;
      const textY = headerY + headerHeight / 2 + textHeight / 4; // Adjust for baseline
      
      // Draw text with manual centering
      ctx!.fillText(headerText, textX, textY);
      ctx!.restore();
      
      // Draw main content box with rounded corners (centered on card)
      const contentWidth = memeWidth - 80;
      const contentHeight = 140; // Made taller
      const contentX = memeX + (memeWidth - contentWidth) / 2; // Center horizontally
      const contentY = memeY + (memeHeight - contentHeight) / 2; // Center vertically
      
      ctx!.fillStyle = '#ffffff';
      drawRoundedRect(ctx!, contentX, contentY, contentWidth, contentHeight, 16);
      ctx!.fill();
      
      // Draw user name
      ctx!.fillStyle = '#30302e';
      ctx!.font = 'bold 24px Arial';
      ctx!.textAlign = 'center';
      ctx!.fillText(editedUserName, contentX + contentWidth/2, contentY + 40);
      
      // Draw result text
      ctx!.font = '14px Arial';
      ctx!.fillText(editedResultText, contentX + contentWidth/2, contentY + 70);
      
      // Draw footer elements
      ctx!.font = '12px Arial';
      ctx!.textAlign = 'left';
      ctx!.fillText('www.allesvoorschiedam.nl', memeX + 20, memeY + memeHeight - 20);
      
      ctx!.textAlign = 'right';
      ctx!.fillText('#AllesVoorSchiedam', memeX + memeWidth - 20, memeY + memeHeight - 20);
      
      // Convert to data URL and download
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      
      const filename = `alles-voor-schiedam-${editedUserName.toLowerCase().replace(/\s+/g, '-')}.jpg`;
      
      const link = document.createElement('a');
      link.download = filename;
      link.href = dataUrl;
      link.click();

      // Upload to prikbord (convert to PNG for consistency)
      const pngCanvas = document.createElement('canvas');
      const pngCtx = pngCanvas.getContext('2d');
      pngCanvas.width = canvas.width;
      pngCanvas.height = canvas.height;
      pngCtx!.drawImage(canvas, 0, 0);
      await uploadMemeToPrikbord(pngCanvas, filename.replace('.jpg', '.png'));
    } catch (error) {
      console.error('Error generating JPG:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    const memeElement = document.getElementById('meme-canvas');
    if (!memeElement) return;

    try {
      // Convert background image to data URL
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      await new Promise((resolve, reject) => {
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = reject;
        img.src = '/images/Achtergrond.png';
      });

      const dataUrl = await toPng(memeElement, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: 'transparent',
        includeQueryParams: true,
        skipFonts: false,
        preferredFontFormat: 'woff2'
      });
      
      const blob = await fetch(dataUrl).then(r => r.blob());
      const file = new File([blob], 'meme.png', { type: 'image/png' });
      
      if (navigator.share && navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: 'Mijn Alles voor Schiedam Meme',
          text: 'Bekijk mijn gepersonaliseerde meme! #AllesVoorSchiedam',
          files: [file]
        });
      } else {
        await navigator.clipboard.writeText('Bekijk mijn gepersonaliseerde meme! #AllesVoorSchiedam');
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl w-[95vw] max-h-[90vh] mx-auto bg-white/95 backdrop-blur-2xl border border-black/20 shadow-2xl overflow-y-auto my-2">
        <DialogHeader className="px-4 sm:px-6">
          <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-3xl flex items-center justify-center shadow-2xl" style={{ backgroundColor: '#30302e' }}>
              <Sparkles className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
            </div>
            <div>
              <DialogDescription className="text-lg sm:text-xl" style={{ color: '#30302e' }}>
                Gefeliciteerd, {quizState.userName}!
              </DialogDescription>
              <DialogTitle className="text-2xl sm:text-3xl lg:text-4xl font-black" style={{ color: '#30302e' }}>
                Jouw Meme is klaar!
              </DialogTitle>
            </div>
          </div>
        </DialogHeader>

        {/* Text Editor */}
        {isEditing && (
          <motion.div 
            className="bg-white/90 backdrop-blur-xl border border-black/20 rounded-2xl p-4 sm:p-6 mx-2 sm:mx-4 mb-4 sm:mb-6 shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4" style={{ color: '#30302e' }}>
              Pas je meme aan
            </h3>
            <div className="space-y-4">
              <div>
                <Label htmlFor="user-name" className="text-sm font-medium" style={{ color: '#30302e' }}>
                  Je naam
                </Label>
                <Input
                  id="user-name"
                  value={editedUserName}
                  onChange={(e) => setEditedUserName(e.target.value)}
                  className="mt-1"
                  placeholder="Voer je naam in"
                />
              </div>
              <div>
                <Label htmlFor="result-text" className="text-sm font-medium" style={{ color: '#30302e' }}>
                  Meme tekst
                </Label>
                <Input
                  id="result-text"
                  value={editedResultText}
                  onChange={(e) => setEditedResultText(e.target.value)}
                  className="mt-1"
                  placeholder="Voer je meme tekst in"
                />
              </div>
              <div className="flex gap-2">
                <Button
                  onClick={() => setIsEditing(false)}
                  className="flex-1"
                  style={{ backgroundColor: '#30302e' }}
                >
                  <Save className="w-4 h-4 mr-2" />
                  Opslaan
                </Button>
                <Button
                  onClick={() => {
                    setEditedUserName(quizState.userName);
                    const selectedAnswers = Object.entries(quizState.answers).map(([, answerId]) => {
                      const answer = quizAnswers.find(a => a.id === answerId);
                      return answer;
                    }).filter(Boolean);
                    const primaryAnswer = selectedAnswers[0];
                    setEditedResultText(primaryAnswer?.result_text || 'Kiest voor Schiedam');
                    setIsEditing(false);
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Reset
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Meme Preview */}
        <motion.div 
          className="flex justify-center my-4 sm:my-6 px-2 sm:px-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full max-w-sm sm:max-w-md lg:max-w-lg">
            <MemeCanvas 
              quizState={quizState} 
              customUserName={editedUserName}
              customResultText={editedResultText}
              className="shadow-2xl border-2 sm:border-4 border-black/20 rounded-2xl sm:rounded-3xl w-full h-auto"
              id="meme-canvas"
            />
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="space-y-2 sm:space-y-3 px-2 sm:px-4">
          {/* Edit and Approve Buttons */}
          <div className="flex gap-2">
            <motion.button
              onClick={() => setIsEditing(!isEditing)}
              className="bg-white/90 backdrop-blur-xl border border-black/20 font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl transition-all duration-300 flex items-center justify-center shadow-lg text-sm sm:text-base flex-1"
              style={{ color: '#30302e' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Edit3 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              {isEditing ? 'Bewerking sluiten' : 'Tekst bewerken'}
            </motion.button>
            
            {!uploaded && (
              <motion.button
                onClick={handleApproveAndUpload}
                disabled={isGenerating}
                className="text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl transition-all duration-300 flex items-center justify-center shadow-2xl disabled:cursor-not-allowed text-sm sm:text-base flex-1"
                style={{ backgroundColor: '#fdee34', color: '#30302e' }}
                whileHover={{ scale: isGenerating ? 1 : 1.02 }}
                whileTap={{ scale: isGenerating ? 1 : 0.98 }}
              >
                <Upload className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                {isGenerating ? 'Uploaden...' : 'Goedkeuren & Uploaden'}
              </motion.button>
            )}
          </div>

          {/* Download Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <motion.button
              onClick={handleDownloadJPG}
              disabled={isGenerating}
              className="text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl transition-all duration-300 flex items-center justify-center shadow-2xl disabled:cursor-not-allowed text-sm sm:text-base"
              style={{ backgroundColor: '#30302e' }}
              whileHover={{ scale: isGenerating ? 1 : 1.02 }}
              whileTap={{ scale: isGenerating ? 1 : 0.98 }}
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              {isGenerating ? 'Genereren...' : 'Download JPG (Wit)'}
            </motion.button>
            
            <motion.button
              onClick={handleDownloadPNG}
              disabled={isGenerating}
              className="text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl transition-all duration-300 flex items-center justify-center shadow-2xl disabled:cursor-not-allowed text-sm sm:text-base"
              style={{ backgroundColor: '#30302e' }}
              whileHover={{ scale: isGenerating ? 1 : 1.02 }}
              whileTap={{ scale: isGenerating ? 1 : 0.98 }}
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              {isGenerating ? 'Genereren...' : 'Download PNG (Transparant)'}
            </motion.button>
          </div>
          
          <div className="flex justify-center gap-2 sm:gap-3">
            <motion.button
              onClick={handleShare}
              className="bg-white/90 backdrop-blur-xl border border-black/20 font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl transition-all duration-300 flex items-center justify-center shadow-lg text-sm sm:text-base"
              style={{ color: '#30302e' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {copied ? <Check className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> : <Share2 className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />}
              {copied ? 'Gekopieerd!' : 'Delen op Social Media'}
            </motion.button>
            
            <motion.button
              onClick={onReset}
              className="bg-white/90 backdrop-blur-xl border border-black/20 font-medium py-3 sm:py-4 px-4 sm:px-6 rounded-2xl transition-all duration-300 flex items-center justify-center shadow-lg text-sm sm:text-base"
              style={{ color: '#30302e' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Opnieuw
            </motion.button>
          </div>
        </div>

        {/* Social Media Instructions */}
        <Card className="bg-white/90 backdrop-blur-xl border border-black/20 mt-2 sm:mt-3 shadow-lg mx-2 sm:mx-4">
          <CardContent className="p-2 sm:p-3">
            {uploaded && (
              <div className="text-center mb-3 p-2 bg-green-100 rounded-lg border border-green-300">
                <p className="text-sm font-semibold text-green-800">
                  ✅ Meme succesvol geüpload naar het Prikbord!
                </p>
              </div>
            )}
            {!uploaded && (
              <div className="text-center mb-3 p-2 bg-yellow-100 rounded-lg border border-yellow-300">
                <p className="text-sm font-semibold text-yellow-800">
                  ⚠️ Klik op "Goedkeuren & Uploaden" om je meme op te slaan op het Prikbord
                </p>
              </div>
            )}
            <p className="text-xs sm:text-sm text-center" style={{ color: '#30302e' }}>
              💡 Tip: Deel op Facebook, Instagram, LinkedIn, TikTok en/of X
            </p>
            <br />
            <p className="mb-2 text-sm sm:text-base text-center" style={{ color: '#30302e' }}>
              <i>Gebruik <span className="font-mono font-bold" style={{ color: '#30302e' }}>#AllesVoorSchiedam</span></i>
            </p>
            <p className="text-xs text-center text-gray-600 mt-2">
              {uploaded ? 'Je meme is opgeslagen op het Prikbord' : 'Bewerk je tekst en upload naar het Prikbord'}
            </p>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
