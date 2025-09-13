'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
            className="flex items-center"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Image 
              src="/images/Weblogo-AvS.png" 
              alt="Alles voor Schiedam Logo" 
              width={204} 
              height={60} 
              className="object-contain"
            />
          </motion.div>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {['Informatie', 'Hoe werkt het?', 'Prikbord'].map((item, index) => (
              <motion.a
                key={item}
                href={item === 'Prikbord' ? '/prikbord' : '#'}
                className="text-lg font-medium transition-colors duration-300 hover:scale-105"
                style={{ color: '#30302e' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {item}
              </motion.a>
            ))}
            <motion.a
              href="/contact"
              className="text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all duration-300 hover:scale-105"
              style={{ backgroundColor: '#30302e' }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Contact
            </motion.a>
          </nav>

          {/* Mobile Hamburger Menu */}
          <div className="md:hidden">
            <motion.button
              onClick={toggleMenu}
              className="p-2 rounded-lg transition-all duration-300 hover:bg-gray-100"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" style={{ color: '#30302e' }} />
              ) : (
                <Menu className="w-6 h-6" style={{ color: '#30302e' }} />
              )}
            </motion.button>
          </div>
        </div>
      </div>

      {/* Mobile Popup Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-2xl border-b border-black/20 shadow-lg"
          >
            <div className="px-4 py-6 space-y-4">
              {['Informatie', 'Hoe werkt het?', 'Prikbord'].map((item, index) => (
                <motion.a
                  key={item}
                  href={item === 'Prikbord' ? '/prikbord' : '#'}
                  className="block text-lg font-medium transition-colors duration-300 hover:scale-105 py-2"
                  style={{ color: '#30302e' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </motion.a>
              ))}
              <motion.a
                href="/contact"
                className="block text-white px-6 py-3 rounded-2xl font-bold shadow-lg transition-all duration-300 hover:scale-105 text-center mt-4"
                style={{ backgroundColor: '#30302e' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
