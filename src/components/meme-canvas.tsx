'use client';

import { QuizState } from '@/types/quiz';
import { quizAnswers } from '@/data/quizData';

interface MemeCanvasProps {
  quizState: QuizState;
  className?: string;
  id?: string;
}

export function MemeCanvas({ quizState, className = '', id }: MemeCanvasProps) {
  // Get the selected answers
  const selectedAnswers = Object.entries(quizState.answers).map(([, answerId]) => {
    const answer = quizAnswers.find(a => a.id === answerId);
    return answer;
  }).filter(Boolean);

  // Get the primary result (first answer for now)
  const primaryAnswer = selectedAnswers[0];
  
  if (!primaryAnswer) {
    return null;
  }

  const getTemplateStyles = (templateSlug: string) => {
    switch (templateSlug) {
      case 'park-template':
        return {
          background: 'linear-gradient(135deg, #fdee34 0%, #27ae60 100%)',
          icon: '🌳',
        }
      case 'speeltuin-template':
        return {
          background: 'linear-gradient(135deg, #fdee34 0%, #e74c3c 100%)',
          icon: '🎠',
        }
      case 'verkeer-template':
        return {
          background: 'linear-gradient(135deg, #fdee34 0%, #3498db 100%)',
          icon: '🚗',
        }
      case 'molens-template':
        return {
          background: 'linear-gradient(135deg, #fdee34 0%, #8b4513 100%)',
          icon: '🏭',
        }
      case 'jenever-template':
        return {
          background: 'linear-gradient(135deg, #fdee34 0%, #8b4513 100%)',
          icon: '🍺',
        }
      case 'stroopwafel-template':
        return {
          background: 'linear-gradient(135deg, #fdee34 0%, #8b4513 100%)',
          icon: '🧇',
        }
      case 'woningen-template':
        return {
          background: 'linear-gradient(135deg, #fdee34 0%, #2c3e50 100%)',
          icon: '🏠',
        }
      case 'ov-template':
        return {
          background: 'linear-gradient(135deg, #fdee34 0%, #9b59b6 100%)',
          icon: '🚌',
        }
      case 'cultuur-template':
        return {
          background: 'linear-gradient(135deg, #fdee34 0%, #8e44ad 100%)',
          icon: '🎭',
        }
      default:
        return {
          background: 'linear-gradient(135deg, #fdee34 0%, #f4d03f 100%)',
          icon: '✨',
        }
    }
  };

  const template = getTemplateStyles(primaryAnswer.meme_template_slug);

  return (
    <div 
      id={id}
      className={`relative overflow-hidden text-center bg-avs-white border-2 border-avs-black/20 w-full max-w-sm sm:max-w-md lg:max-w-lg aspect-[3/2] ${className}`}
      style={{ 
        borderRadius: '16px',
        backgroundColor: '#fdee34'
      }}
    >
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30 pointer-events-none"
        style={{ 
          backgroundImage: 'url(/images/Achtergrond.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>
      {/* Header */}
      <div className="absolute top-2 sm:top-4 left-1/2 transform -translate-x-1/2 z-10">
        <div className="bg-avs-black text-avs-white px-2 sm:px-3 py-1 rounded-lg font-bold text-xs sm:text-sm">
          Alles voor Schiedam
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col justify-center items-center h-full px-4 sm:px-6 lg:px-8 z-10">
        <div className="bg-avs-white/90 backdrop-blur-sm rounded-2xl p-4 sm:p-6 lg:p-8 shadow-xl border border-avs-black/10 w-full max-w-xs sm:max-w-sm">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-avs-black mb-2 sm:mb-4 break-words">
            {quizState.userName}
          </h1>
          <p className="text-xs sm:text-sm lg:text-base text-avs-black/80 font-medium break-words leading-tight">
            {primaryAnswer.result_text}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-2 sm:bottom-4 left-2 sm:left-4 right-2 sm:right-4 flex justify-between items-center z-10">
        <div className="text-xs sm:text-sm text-avs-black/70 font-medium truncate">
          www.allesvoorschiedam.nl
        </div>
        <div className="text-avs-black font-bold text-xs sm:text-sm">
          #AllesVoorSchiedam
        </div>
      </div>
    </div>
  );
}
