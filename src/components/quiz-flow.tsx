'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { QuestionCard } from '@/components/question-card';
import { QuizState } from '@/types/quiz';
import { quizQuestions, quizAnswers } from '@/data/quizData';

interface QuizFlowProps {
  quizState: QuizState;
  setQuizState: (state: QuizState) => void;
  onComplete: () => void;
}

export function QuizFlow({ quizState, setQuizState, onComplete }: QuizFlowProps) {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  
  const currentQuestion = quizQuestions[quizState.currentQuestionIndex];
  const currentAnswers = quizAnswers.filter(answer => answer.question_id === currentQuestion.id);
  
  const progress = ((quizState.currentQuestionIndex + 1) / quizQuestions.length) * 100;
  const isLastQuestion = quizState.currentQuestionIndex === quizQuestions.length - 1;

  useEffect(() => {
    setSelectedAnswer(null);
    setIsTransitioning(false);
  }, [quizState.currentQuestionIndex]);

  const handleAnswerSelect = (answerId: number) => {
    if (isTransitioning) return;
    
    setSelectedAnswer(answerId);
    setIsTransitioning(true);
    
    setTimeout(() => {
      const newAnswers = {
        ...quizState.answers,
        [currentQuestion.id]: answerId
      };

      if (isLastQuestion) {
        setQuizState({
          ...quizState,
          answers: newAnswers,
          isComplete: true
        });
        onComplete();
      } else {
        setQuizState({
          ...quizState,
          answers: newAnswers,
          currentQuestionIndex: quizState.currentQuestionIndex + 1
        });
      }
    }, 300);
  };

  return (
    <div className="min-h-screen relative overflow-hidden" style={{ backgroundColor: '#fdee34' }}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundColor: '#fdee34' }}></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: '#fdee34' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000" style={{ backgroundColor: '#fdee34' }}></div>
      </div>

      {/* Progress Header */}
      <motion.div 
        className="bg-white/90 backdrop-blur-2xl border-b border-black/20 shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="text-sm font-medium" style={{ color: '#30302e' }}>
                Question {quizState.currentQuestionIndex + 1} of {quizQuestions.length}
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.history.back()}
                className="bg-white/90 backdrop-blur-xl border border-black/20 rounded-2xl transition-all duration-300 hover:bg-white shadow-lg px-4 py-2"
                style={{ color: '#30302e' }}
              >
                Terug
              </button>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Progress Bar */}
      <motion.div 
        className="relative z-50 bg-white/90 backdrop-blur-2xl border-b border-black/20 shadow-lg"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={{ opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium" style={{ color: '#30302e' }}>Progress</span>
            <span className="text-sm font-medium" style={{ color: '#30302e' }}>{Math.round(progress)}%</span>
          </div>
          <Progress 
            value={progress}
            className="h-3 bg-black/10"
          />
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          key={quizState.currentQuestionIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          <QuestionCard
            question={currentQuestion}
            answers={currentAnswers}
            onAnswerSelect={handleAnswerSelect}
            selectedAnswer={selectedAnswer}
            isTransitioning={isTransitioning}
          />
        </motion.div>

        {/* Navigation */}
        <motion.div 
          className="flex justify-between items-center mt-12"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          {quizState.currentQuestionIndex > 0 ? (
            <motion.button
              onClick={() => setQuizState({
                ...quizState,
                currentQuestionIndex: quizState.currentQuestionIndex - 1
              })}
              className="flex items-center gap-2 px-6 py-3 bg-white/90 backdrop-blur-xl border border-black/20 rounded-2xl transition-all duration-300 hover:bg-white shadow-lg"
              style={{ color: '#30302e' }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <ArrowLeft className="w-4 h-4" />
              Previous
            </motion.button>
          ) : (
            <div></div>
          )}
          
          <div className="text-sm font-medium" style={{ color: '#30302e' }}>
            {isLastQuestion ? 'Last question!' : `${quizQuestions.length - quizState.currentQuestionIndex - 1} questions remaining`}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
