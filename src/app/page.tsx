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
      />
    );
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fdee34' }}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundColor: '#fdee34' }}></div>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse" style={{ backgroundColor: '#fdee34' }}></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl animate-pulse delay-1000" style={{ backgroundColor: '#fdee34' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl animate-pulse delay-500" style={{ backgroundColor: '#fdee34' }}></div>
      </div>


      {/* Hero Section */}
      <main className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-32">
          <div className="text-center">
            

            <motion.h1 
              className="text-6xl md:text-8xl lg:text-9xl font-black mb-8 leading-tight"
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
              className="flex flex-wrap justify-center gap-4 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center px-4 py-2 rounded-full bg-white/90 backdrop-blur-xl border border-black/20 shadow-lg">
                <span className="text-sm font-medium" style={{ color: '#30302e' }}>⚡ 2 minuten klaar</span>
              </div>
              
            </motion.div>
            
            <motion.h2 
              className="text-2xl md:text-4xl lg:text-5xl font-bold mb-8 max-w-5xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              style={{ color: '#30302e' }}
            >
              De slimste meme-generator voor Schiedam
            </motion.h2>
            
            <motion.p 
              className="text-xl md:text-2xl mb-12 max-w-4xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              style={{ color: '#30302e' }}
            >
              Persoonlijk, snel en klaar voor sociale media. Beantwoord drie vragen en krijg je eigen gepersonaliseerde meme over jouw visie voor Schiedam.
            </motion.p>

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
                className="max-w-lg mx-auto"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white/90 backdrop-blur-2xl rounded-3xl p-8 shadow-2xl border border-black/20">
                  <h3 className="text-3xl font-bold mb-8 text-center" style={{ color: '#30302e' }}>Wat is je naam?</h3>
                  <div className="space-y-6">
                    <div>
                      <input
                        type="text"
                        placeholder="Typ je naam hier..."
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full px-6 py-4 bg-white border border-black/20 rounded-2xl focus:outline-none focus:ring-4 focus:ring-black/20 focus:border-black text-lg font-medium transition-all duration-300"
                        style={{ color: '#30302e' }}
                        autoFocus
                      />
                    </div>
                    <div className="flex gap-4">
                      <motion.button
                        onClick={() => setShowNameInput(false)}
                        className="flex-1 bg-white border border-black/20 font-bold py-4 px-6 rounded-2xl transition-all duration-300 hover:bg-gray-50"
                        style={{ color: '#30302e' }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Terug
                      </motion.button>
                      <motion.button
                        onClick={handleStartClick}
                        disabled={!userName.trim()}
                        className="flex-1 text-white font-bold py-4 px-6 rounded-2xl transition-all duration-300 disabled:cursor-not-allowed"
                        style={{ backgroundColor: '#30302e' }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Begin Quiz
                      </motion.button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      {/* Features Section */}
      <section className="py-32 relative" style={{ backgroundColor: '#fdee34' }}>
        <div className="absolute inset-0" style={{ backgroundColor: '#fdee34' }}></div>
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <motion.div 
            className="text-center mb-11"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-5xl md:text-7xl font-black mb-8" style={{ color: '#30302e' }}>
              Jouw persoonlijke
              <br />
              Schiedam meme
            </h2>
            <p className="text-2xl md:text-3xl max-w-4xl mx-auto leading-relaxed" style={{ color: '#30302e' }}>
              Uniek, professioneel en klaar voor sociale media
            </p>
            
          </motion.div>

          <motion.div 
              className="flex flex-wrap justify-center gap-4 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <div className="flex items-center px-4 py-2 rounded-full bg-white/90 backdrop-blur-xl border border-black/20 shadow-lg">
                <span className="text-sm font-medium" style={{ color: '#30302e' }}>✨ Aangedreven door TripleZero AI</span>
              </div>
              
            </motion.div>
          
          
        </div>
      </section>


      <MemeResultDialog
        isOpen={showMemeDialog}
        onClose={() => setShowMemeDialog(false)}
        quizState={quizState}
        onReset={resetQuiz}
      />
    </div>
  );
}