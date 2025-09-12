'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { QuizQuestion, QuizAnswer } from '@/types/quiz';

interface QuestionCardProps {
  question: QuizQuestion;
  answers: QuizAnswer[];
  onAnswerSelect: (answerId: number) => void;
  selectedAnswer?: number | null;
  isTransitioning?: boolean;
}

export function QuestionCard({ 
  question, 
  answers, 
  onAnswerSelect, 
  selectedAnswer, 
  isTransitioning 
}: QuestionCardProps) {
  return (
    <Card className="bg-white/90 backdrop-blur-2xl border border-black/20 shadow-2xl">
      <CardHeader className="text-center pb-8">
        <CardTitle className="text-4xl font-black mb-6 leading-tight" style={{ color: '#30302e' }}>
          {question.question_text}
        </CardTitle>
        <CardDescription className="text-xl leading-relaxed" style={{ color: '#30302e' }}>
          Choose the answer that best fits your vision for Schiedam
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-3">
        {answers.map((answer, index) => {
          const isSelected = selectedAnswer === answer.id;
          const isDisabled = isTransitioning && !isSelected;
          
          return (
            <motion.div
              key={answer.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <motion.button
                onClick={() => onAnswerSelect(answer.id)}
                disabled={isDisabled}
                className={`w-full justify-between p-6 h-auto text-left rounded-2xl transition-all duration-300 ${
                  isSelected
                    ? 'text-white border-2 border-transparent shadow-2xl'
                    : 'bg-white/90 backdrop-blur-xl border-2 border-black/20 hover:border-black/40 hover:bg-white'
                } ${
                  isDisabled ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                style={isSelected ? { backgroundColor: '#30302e' } : { color: '#30302e' }}
                whileHover={{ scale: isDisabled ? 1 : 1.02 }}
                whileTap={{ scale: isDisabled ? 1 : 0.98 }}
              >
                <span className="text-lg font-bold">
                  {answer.answer_text}
                </span>
                
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Check className="w-6 h-6" />
                  </motion.div>
                )}
              </motion.button>
            </motion.div>
          );
        })}
      </CardContent>
      
      <div className="px-6 pb-6">
        <p className="text-sm text-center font-medium" style={{ color: '#30302e' }}>
          Your answer will be used to generate a personalized meme
        </p>
      </div>
    </Card>
  );
}
