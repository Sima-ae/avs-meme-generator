'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toPng, toJpeg } from 'html-to-image';
import { Download, Share2, RotateCcw, Check, Sparkles, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
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
  const { data: session } = useSession();

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
      
      // Wait for the meme element to be rendered
      const memeElement = document.getElementById('meme-canvas');
      if (!memeElement) {
        console.log('Meme element not found, retrying in 1 second...');
        setTimeout(() => generateAndUploadMeme(), 1000);
        return;
      }

      console.log('Meme element found, capturing image...');

      // Use html-to-image to capture the actual rendered meme
      const dataUrl = await toPng(memeElement, {
        quality: 1.0,
        pixelRatio: 2, // Higher resolution
        backgroundColor: 'transparent'
      });

      console.log('Image captured, converting to blob...');

      // Convert data URL to blob
      const response = await fetch(dataUrl);
      const blob = await response.blob();

      // Create form data
      const formData = new FormData();
      const filename = `alles-voor-schiedam-${quizState.userName.toLowerCase().replace(/\s+/g, '-')}.png`;
      formData.append('file', blob, filename);
      formData.append('title', `Meme van ${quizState.userName}`);
      formData.append('userId', session?.user?.id || '2');

      console.log('Uploading to API...', { filename, userId: session?.user?.id || '2' });

      // Upload to API
      const uploadResponse = await fetch('/api/upload-meme', {
        method: 'POST',
        body: formData,
      });

      const result = await uploadResponse.json();
      console.log('Upload result:', result);
      
      if (result.success) {
        setAutoUploaded(true);
        setUploaded(true);
        setTimeout(() => setUploaded(false), 3000);
        console.log('✅ Meme successfully auto-uploaded!');
      } else {
        console.error('❌ Upload failed:', result.error);
      }
      
    } catch (error) {
      console.error('Error auto-uploading meme:', error);
    }
  };

  // Auto-upload when dialog opens
  useEffect(() => {
    if (isOpen && !autoUploaded) {
      console.log('Dialog opened, starting auto-upload timer...');
      // Longer delay to ensure the meme canvas is fully rendered
      const timer = setTimeout(() => {
        generateAndUploadMeme();
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, [isOpen, autoUploaded]);

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
      ctx!.fillText(quizState.userName, contentX + contentWidth/2, contentY + 40);
      
      // Draw result text
      const selectedAnswers = Object.entries(quizState.answers).map(([, answerId]) => {
        const answer = quizAnswers.find(a => a.id === answerId);
        return answer;
      }).filter(Boolean);
      const primaryAnswer = selectedAnswers[0];
      const resultText = primaryAnswer?.result_text || 'Kiest voor Schiedam';
      ctx!.font = '14px Arial';
      ctx!.fillText(resultText, contentX + contentWidth/2, contentY + 70);
      
      // Draw footer elements
      ctx!.font = '12px Arial';
      ctx!.textAlign = 'left';
      ctx!.fillText('www.allesvoorschiedam.nl', memeX + 20, memeY + memeHeight - 20);
      
      ctx!.textAlign = 'right';
      ctx!.fillText('#AllesVoorSchiedam', memeX + memeWidth - 20, memeY + memeHeight - 20);
      
      // Convert to data URL and download
      const dataUrl = canvas.toDataURL('image/png');
      
      const filename = `alles-voor-schiedam-${quizState.userName.toLowerCase().replace(/\s+/g, '-')}.png`;
      
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
      ctx!.fillText(quizState.userName, contentX + contentWidth/2, contentY + 40);
      
      // Draw result text
      const selectedAnswers = Object.entries(quizState.answers).map(([, answerId]) => {
        const answer = quizAnswers.find(a => a.id === answerId);
        return answer;
      }).filter(Boolean);
      const primaryAnswer = selectedAnswers[0];
      const resultText = primaryAnswer?.result_text || 'Kiest voor Schiedam';
      ctx!.font = '14px Arial';
      ctx!.fillText(resultText, contentX + contentWidth/2, contentY + 70);
      
      // Draw footer elements
      ctx!.font = '12px Arial';
      ctx!.textAlign = 'left';
      ctx!.fillText('www.allesvoorschiedam.nl', memeX + 20, memeY + memeHeight - 20);
      
      ctx!.textAlign = 'right';
      ctx!.fillText('#AllesVoorSchiedam', memeX + memeWidth - 20, memeY + memeHeight - 20);
      
      // Convert to data URL and download
      const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
      
      const filename = `alles-voor-schiedam-${quizState.userName.toLowerCase().replace(/\s+/g, '-')}.jpg`;
      
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
              className="shadow-2xl border-2 sm:border-4 border-black/20 rounded-2xl sm:rounded-3xl w-full h-auto"
              id="meme-canvas"
            />
          </div>
        </motion.div>

        {/* Action Buttons */}
        <div className="space-y-2 sm:space-y-3 px-2 sm:px-4">
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
              {uploaded ? <Upload className="w-4 h-4 sm:w-5 sm:h-5 mr-2" /> : <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />}
              {isGenerating ? 'Genereren...' : uploaded ? 'Geüpload naar Prikbord!' : 'Download PNG (Transparant)'}
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
            {(uploaded || autoUploaded) && (
              <div className="text-center mb-3 p-2 bg-green-100 rounded-lg border border-green-300">
                <p className="text-sm font-semibold text-green-800">
                  ✅ Meme succesvol geüpload naar het Prikbord!
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
              Je meme wordt automatisch opgeslagen op het Prikbord
            </p>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
