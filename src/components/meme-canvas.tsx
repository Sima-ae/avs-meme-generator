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
      className={`relative overflow-hidden text-center bg-avs-white border-2 border-avs-black/20 ${className}`}
      style={{ 
        width: '600px', 
        height: '400px',
        borderRadius: '16px',
        background: template.background
      }}
    >
      {/* Header */}
      <div className="absolute top-4 left-4 right-4 flex justify-between items-center">
        <div className="bg-avs-black text-avs-white px-3 py-1 rounded-lg font-bold text-sm">
          AllesVoorSchiedam
        </div>
        <div className="w-8 h-8 bg-avs-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center text-lg">
          {template.icon}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col justify-center items-center h-full px-8">
        <div className="bg-avs-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-avs-black/10">
          <h1 className="text-4xl font-bold text-avs-black mb-4">
            {quizState.userName}
          </h1>
          <p className="text-xl text-avs-black/80 font-medium">
            {primaryAnswer.result_text}
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-4 left-4 right-4 flex justify-between items-center">
        <div className="text-sm text-avs-black/70 font-medium">
          Meme Generator 2025
        </div>
        <div className="bg-avs-black text-avs-white px-3 py-1 rounded-lg font-bold text-sm">
          #AllesVoorSchiedam
        </div>
      </div>
    </div>
  );
}
