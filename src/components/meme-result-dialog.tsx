'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { toPng } from 'html-to-image';
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

  const handleDownload = async () => {
    const memeElement = document.getElementById('meme-canvas');
    if (!memeElement) return;

    setIsGenerating(true);
    try {
      const dataUrl = await toPng(memeElement, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#fdee34'
      });
      
      const link = document.createElement('a');
      link.download = `alles-voor-schiedam-${quizState.userName.toLowerCase().replace(/\s+/g, '-')}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleShare = async () => {
    const memeElement = document.getElementById('meme-canvas');
    if (!memeElement) return;

    try {
      const dataUrl = await toPng(memeElement, {
        quality: 1.0,
        pixelRatio: 2,
        backgroundColor: '#fdee34'
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
      <DialogContent className="max-w-4xl w-full mx-4 sm:mx-auto bg-white/95 backdrop-blur-2xl border border-black/20 shadow-2xl">
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
          className="flex justify-center my-6 sm:my-8 px-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <MemeCanvas 
            quizState={quizState} 
            className="shadow-2xl border-2 sm:border-4 border-black/20 rounded-2xl sm:rounded-3xl max-w-full"
            id="meme-canvas"
          />
        </motion.div>

        {/* Action Buttons */}
        <div className="space-y-4 sm:space-y-6 px-4 sm:px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            <motion.button
              onClick={handleDownload}
              disabled={isGenerating}
              className="text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl transition-all duration-300 flex items-center justify-center shadow-2xl disabled:cursor-not-allowed text-sm sm:text-base"
              style={{ backgroundColor: '#30302e' }}
              whileHover={{ scale: isGenerating ? 1 : 1.02 }}
              whileTap={{ scale: isGenerating ? 1 : 0.98 }}
            >
              <Download className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              {isGenerating ? 'Genereren...' : 'Download'}
            </motion.button>
            
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
          </div>

          <motion.button
            onClick={onReset}
            className="w-full bg-white/90 backdrop-blur-xl border border-black/20 font-medium py-3 sm:py-4 px-4 sm:px-6 rounded-2xl transition-all duration-300 flex items-center justify-center shadow-lg text-sm sm:text-base"
            style={{ color: '#30302e' }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
            Nieuwe Quiz Maken
          </motion.button>
        </div>

        {/* Social Media Instructions */}
        <Card className="bg-white/90 backdrop-blur-xl border border-black/20 mt-6 sm:mt-8 shadow-lg mx-4 sm:mx-6">
          <CardContent className="p-4 sm:p-6">
            <h3 className="font-bold mb-3 text-lg sm:text-xl" style={{ color: '#30302e' }}>Deel jouw visie!</h3>
            <p className="mb-4 text-base sm:text-lg" style={{ color: '#30302e' }}>
              <i>Gebruik <span className="font-mono font-bold" style={{ color: '#30302e' }}>#AllesVoorSchiedam</span></i>
            </p>
            <p className="text-xs sm:text-sm" style={{ color: '#30302e' }}>
              💡 Tip: Deel op Facebook, Instagram, LinkedIn, TikTok of X
            </p>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  );
}
