'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { QuizFlow } from '@/components/quiz-flow';
import { MemeResultDialog } from '@/components/meme-result-dialog';
import { QuizState } from '@/types/quiz';

export default function Home() {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    answers: {},
    isComplete: false,
    userName: ''
  });
  const [showMemeDialog, setShowMemeDialog] = useState(false);
  const [showNameInput, setShowNameInput] = useState(false);
  const [userName, setUserName] = useState('');

  const startQuiz = (name: string) => {
    setQuizState(prev => ({
      ...prev,
      userName: name,
      currentQuestionIndex: 0,
      answers: {},
      isComplete: false
    }));
  };

  const completeQuiz = () => {
    setQuizState(prev => ({ ...prev, isComplete: true }));
    setShowMemeDialog(true);
  };

  const resetQuiz = () => {
    setQuizState({
      currentQuestionIndex: 0,
      answers: {},
      isComplete: false,
      userName: ''
    });
    setShowMemeDialog(false);
    setShowNameInput(false);
    setUserName('');
  };

  const handleBackToHome = () => {
    resetQuiz();
  };

  const handleStartClick = () => {
    if (userName.trim()) {
      startQuiz(userName);
    } else {
      setShowNameInput(true);
    }
  };

  if (quizState.userName && !quizState.isComplete) {
    return (
      <QuizFlow
        quizState={quizState}
        setQuizState={setQuizState}
        onComplete={completeQuiz}
        onBack={handleBackToHome}
      />
    );
  }

  return (
    <div className="w-full" style={{ backgroundColor: '#fdee34' }}>
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
        style={{ 
          backgroundImage: 'url(/images/Achtergrond.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      ></div>

      {/* Hero Section */}
      <div className="relative z-10 w-full">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-16 pb-4">
          <div className="text-center">
            

            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-black mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ color: '#30302e' }}
            >
              Meme
              <br />
              Generator
            </motion.h1>

            <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center px-4 py-2 rounded-full bg-white/90 backdrop-blur-xl border border-black/20 shadow-lg">
                <span className="text-sm font-medium" style={{ color: '#30302e' }}>#AllesVoorSchiedam</span>
              </div>
            </motion.div>
            <br />
            
            <motion.p 
              className="text-xl md:text-2xl mb-8 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ color: '#30302e' }}
            >
              Beantwoord de vragen en maak een persoonlijke meme over Schiedam.
            </motion.p>
            <br />

            {!showNameInput ? (
              <motion.div 
                className="flex flex-col sm:flex-row justify-center gap-6"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <motion.button
                  onClick={() => setShowNameInput(true)}
                  className="group relative px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 overflow-hidden text-white shadow-2xl"
                  style={{ backgroundColor: '#30302e' }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="relative z-10">Start nu</span>
                </motion.button>
                
                
              </motion.div>
            ) : (
              <motion.div 
                className="fixed inset-0 z-50 flex items-center justify-center p-4"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setShowNameInput(false)}></div>
                <motion.div 
                  className="relative w-full max-w-md mx-auto"
                  initial={{ opacity: 0, scale: 0.9, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white/95 backdrop-blur-2xl rounded-3xl p-6 sm:p-8 shadow-2xl border border-black/20">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center" style={{ color: '#30302e' }}>Wat is je naam?</h3>
                    <div className="space-y-4 sm:space-y-6">
                      <div>
                        <input
                          type="text"
                          placeholder="Typ je naam hier..."
                          value={userName}
                          onChange={(e) => setUserName(e.target.value)}
                          className="w-full px-4 sm:px-6 py-3 sm:py-4 bg-white border border-black/20 rounded-2xl focus:outline-none focus:ring-4 focus:ring-black/20 focus:border-black text-base sm:text-lg font-medium transition-all duration-300"
                          style={{ color: '#30302e' }}
                          autoFocus
                        />
                      </div>
                      <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                        <motion.button
                          onClick={() => setShowNameInput(false)}
                          className="flex-1 bg-white border border-black/20 font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl transition-all duration-300 hover:bg-gray-50"
                          style={{ color: '#30302e' }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          Terug
                        </motion.button>
                        <motion.button
                          onClick={handleStartClick}
                          disabled={!userName.trim()}
                          className="flex-1 text-white font-bold py-3 sm:py-4 px-4 sm:px-6 rounded-2xl transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50"
                          style={{ backgroundColor: '#30302e' }}
                          whileHover={{ scale: userName.trim() ? 1.02 : 1 }}
                          whileTap={{ scale: userName.trim() ? 0.98 : 1 }}
                        >
                          Start
                        </motion.button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      <br />
      <br />
      

      

      <br />
      <br />
      <br />
      


      <MemeResultDialog
        isOpen={showMemeDialog}
        onClose={() => setShowMemeDialog(false)}
        quizState={quizState}
        onReset={resetQuiz}
      />
    </div>
  );
}