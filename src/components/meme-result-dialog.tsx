'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toPng, toJpeg } from 'html-to-image';
import { Download, Share2, RotateCcw, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Card, CardContent } from '@/components/ui/card';
import { MemeCanvas } from '@/components/meme-canvas';
import { QuizState } from '@/types/quiz';

interface MemeResultDialogProps {
  isOpen: boolean;
  onClose: () => void;
  quizState: QuizState;
  onReset: () => void;
}

export function MemeResultDialog({ isOpen, onClose, quizState, onReset }: MemeResultDialogProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleDownloadPNG = async () => {
    const memeElement = document.getElementById('meme-canvas');
    if (!memeElement) return;

    setIsGenerating(true);
    try {
      // Preload and convert background image to data URL first
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      const backgroundDataUrl = await new Promise<string>((resolve, reject) => {
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = reject;
        img.src = '/images/Achtergrond.png';
      });

      // Create a wrapper div with transparent background
      const wrapper = document.createElement('div');
      wrapper.style.backgroundColor = 'transparent';
      wrapper.style.padding = '40px';
      wrapper.style.display = 'flex';
      wrapper.style.justifyContent = 'center';
      wrapper.style.alignItems = 'center';
      wrapper.style.width = '600px';
      wrapper.style.height = '600px';
      wrapper.style.position = 'relative';
      
      // Clone the meme element and make it larger
      const clonedMeme = memeElement.cloneNode(true) as HTMLElement;
      clonedMeme.style.width = '520px';
      clonedMeme.style.height = '347px'; // 3:2 aspect ratio
      clonedMeme.style.maxWidth = 'none';
      clonedMeme.style.maxHeight = 'none';
      
      // Replace the background image src with data URL
      const backgroundImg = clonedMeme.querySelector('img[src="/images/Achtergrond.png"]') as HTMLImageElement;
      if (backgroundImg) {
        backgroundImg.src = backgroundDataUrl;
      }
      
      wrapper.appendChild(clonedMeme);
      
      // Temporarily add to DOM
      document.body.appendChild(wrapper);
      
      // Wait a bit for the image to render
      await new Promise(resolve => setTimeout(resolve, 100));

      const dataUrl = await toPng(wrapper, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: 'transparent',
        includeQueryParams: true,
        skipFonts: false,
        preferredFontFormat: 'woff2'
      });
      
      // Clean up
      document.body.removeChild(wrapper);
      
      const link = document.createElement('a');
      link.download = `alles-voor-schiedam-${quizState.userName.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
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
      // Preload and convert background image to data URL first
      const img = new Image();
      img.crossOrigin = 'anonymous';
      
      const backgroundDataUrl = await new Promise<string>((resolve, reject) => {
        img.onload = () => {
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
          resolve(canvas.toDataURL('image/png'));
        };
        img.onerror = reject;
        img.src = '/images/Achtergrond.png';
      });

      // Create a wrapper div with white background
      const wrapper = document.createElement('div');
      wrapper.style.backgroundColor = '#ffffff';
      wrapper.style.padding = '40px';
      wrapper.style.display = 'flex';
      wrapper.style.justifyContent = 'center';
      wrapper.style.alignItems = 'center';
      wrapper.style.width = '600px';
      wrapper.style.height = '600px';
      wrapper.style.position = 'relative';
      
      // Clone the meme element and make it larger
      const clonedMeme = memeElement.cloneNode(true) as HTMLElement;
      clonedMeme.style.width = '520px';
      clonedMeme.style.height = '347px'; // 3:2 aspect ratio
      clonedMeme.style.maxWidth = 'none';
      clonedMeme.style.maxHeight = 'none';
      
      // Replace the background image src with data URL
      const backgroundImg = clonedMeme.querySelector('img[src="/images/Achtergrond.png"]') as HTMLImageElement;
      if (backgroundImg) {
        backgroundImg.src = backgroundDataUrl;
      }
      
      wrapper.appendChild(clonedMeme);
      
      // Temporarily add to DOM
      document.body.appendChild(wrapper);
      
      // Wait a bit for the image to render
      await new Promise(resolve => setTimeout(resolve, 100));

      const dataUrl = await toJpeg(wrapper, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
        includeQueryParams: true,
        skipFonts: false,
        preferredFontFormat: 'woff2'
      });
      
      // Clean up
      document.body.removeChild(wrapper);
      
      const link = document.createElement('a');
      link.download = `alles-voor-schiedam-${quizState.userName.toLowerCase().replace(/\s+/g, '-')}.jpg`;
      link.href = dataUrl;
      link.click();
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
            <p className="text-xs sm:text-sm text-center" style={{ color: '#30302e' }}>
              💡 Tip: Deel op Facebook, Instagram, LinkedIn, TikTok en/of X
            </p>
            <br />
            <p className="mb-2 text-sm sm:text-base text-center" style={{ color: '#30302e' }}>
              <i>Gebruik <span className="font-mono font-bold" style={{ color: '#30302e' }}>#AllesVoorSchiedam</span></i>
            </p>
            
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
