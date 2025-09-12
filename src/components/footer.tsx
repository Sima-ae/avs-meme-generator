'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="relative pt-6 pb-12 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center">
          {/* Logo */}
          <div className="flex flex-col items-center mb-6">
            <Image 
              src="/images/Weblogo-AvS-centered.png" 
              alt="Alles voor Schiedam Logo" 
              width={340} 
              height={100} 
              className="object-contain mb-4"
            />
          </div>

          {/* Links */}
          <div className="flex flex-wrap justify-center gap-6 mb-6">
            {['Algemene voorwaarden', 'Cookiebeleid', 'Privacybeleid'].map((item) => (
              <a 
                key={item} 
                href="#" 
                className="text-base font-medium transition-all duration-300 hover:scale-105 px-3 py-1 rounded-xl hover:bg-gray-100" 
                style={{ color: '#30302e' }}
              >
                {item}
              </a>
            ))}
          </div>

          {/* Bottom Text */}
          <div className="border-t border-black/20 pt-4">
            <p className="text-base font-medium" style={{ color: '#30302e' }}>
            Alles voor Schiedam © {new Date().getFullYear()}
            </p>
            <p className="text-sm mt-1" style={{ color: '#30302e' }}>
              <i>Beveiligd en ontwikkeld door: <a href="https://000-it.com" target="_blank" rel="noopener noreferrer" className="underline hover:no-underline transition-all duration-300">TripleZero iT</a></i>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
