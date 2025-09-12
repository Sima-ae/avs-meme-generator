'use client';

import { motion } from 'framer-motion';

export default function Footer() {
  return (
    <footer className="relative py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          {/* Logo and Brand */}
          <div className="flex flex-col items-center mb-12">
            <div className="w-20 h-20 rounded-3xl flex items-center justify-center shadow-2xl mb-6" style={{ backgroundColor: '#30302e' }}>
              <span className="text-white font-bold text-2xl">AvS</span>
            </div>
            <h2 className="text-5xl font-black mb-4" style={{ color: '#30302e' }}>
              Alles voor Schiedam
            </h2>
            <p className="text-2xl font-medium max-w-2xl mx-auto leading-relaxed" style={{ color: '#30302e' }}>
              ...
            </p>
          </div>

          

          

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {['Algemene voorwaarden', 'Cookiebeleid', 'Privacybeleid'].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="text-lg font-medium transition-all duration-300 hover:scale-105 px-4 py-2 rounded-xl hover:bg-gray-100" 
                style={{ color: '#30302e' }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Bottom Text */}
          <div className="border-t border-black/20 pt-8">
            <p className="text-lg font-medium" style={{ color: '#30302e' }}>
            Alles voor Schiedam © {new Date().getFullYear()}
            </p>
            <p className="text-sm mt-2" style={{ color: '#30302e' }}>
              Beveiligd en ontwikkeld door: TripleZero iT
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
