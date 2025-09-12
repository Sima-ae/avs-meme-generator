'use client';

import { motion } from 'framer-motion';

export default function Header() {
  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-2xl border-b border-black/20 shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <motion.div 
            className="flex items-center space-x-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl" style={{ backgroundColor: '#30302e' }}>
              <span className="text-white font-bold text-xl">AvS</span>
            </div>
            <span className="text-3xl font-black" style={{ color: '#30302e' }}>
              Alles voor Schiedam
            </span>
          </motion.div>
          
          <nav className="hidden md:flex items-center space-x-8">
            {['Over', 'Hoe werkt het', 'Voorbeelden'].map((item, index) => (
              <motion.a
                key={item}
                href="#"
                className="text-lg font-medium transition-colors duration-300 hover:scale-105"
                style={{ color: '#30302e' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
            <motion.a
              href="#"
              className="text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: '#30302e' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact
            </motion.a>
          </nav>
        </div>
      </div>
    </motion.header>
  );
}
