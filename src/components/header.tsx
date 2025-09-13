'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useSession, signOut } from 'next-auth/react';
import { Menu, X, User, LogOut } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAccountMenuOpen, setIsAccountMenuOpen] = useState(false);
  const { data: session } = useSession();
  const accountMenuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleAccountMenu = () => {
    setIsAccountMenuOpen(!isAccountMenuOpen);
  };

  const handleSignOut = () => {
    signOut({ callbackUrl: '/' });
  };

  // Close account menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (accountMenuRef.current && !accountMenuRef.current.contains(event.target as Node)) {
        setIsAccountMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <motion.header 
      className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-2xl border-b border-black/20 shadow-lg"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <Link href="/">
            <motion.div 
              className="flex items-center cursor-pointer"
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
          </Link>
          
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
            {/* Account Menu */}
            <div className="relative" ref={accountMenuRef}>
              <motion.button
                onClick={toggleAccountMenu}
                className="flex items-center gap-2 px-4 py-2 rounded-2xl transition-all duration-300 hover:scale-105"
                style={{ backgroundColor: session ? '#f3f4f6' : '#30302e', color: session ? '#30302e' : 'white' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="w-5 h-5" />
                <span className="hidden sm:inline">
                  {session ? session.user?.name || 'Account' : 'Inloggen'}
                </span>
              </motion.button>

              {/* Account Dropdown */}
              <AnimatePresence>
                {isAccountMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-gray-200 py-2 z-50"
                  >
                    {session ? (
                      <>
                        <div className="px-4 py-2 border-b border-gray-100">
                          <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
                          <p className="text-xs text-gray-500">{session.user?.email}</p>
                          <p className="text-xs text-blue-600 font-medium capitalize">{session.user?.role}</p>
                        </div>
                        <div className="py-1">
                          <motion.a
                            href="/prikbord"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                            whileHover={{ x: 4 }}
                          >
                            Prikbord
                          </motion.a>
                          {session.user?.role === 'admin' && (
                            <motion.a
                              href="/admin"
                              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                              whileHover={{ x: 4 }}
                            >
                              Admin Dashboard
                            </motion.a>
                          )}
                        </div>
                        <div className="py-1 border-t border-gray-100">
                          <motion.button
                            onClick={handleSignOut}
                            className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors"
                            whileHover={{ x: 4 }}
                          >
                            <LogOut className="w-4 h-4" />
                            Uitloggen
                          </motion.button>
                        </div>
                      </>
                    ) : (
                      <div className="py-1">
                        <motion.a
                          href="/auth/signin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          whileHover={{ x: 4 }}
                        >
                          Inloggen
                        </motion.a>
                        <motion.a
                          href="/auth/register"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                          whileHover={{ x: 4 }}
                        >
                          Registreren
                        </motion.a>
                      </div>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

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
              {/* Mobile Account Section */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                {session ? (
                  <>
                    <div className="px-4 py-2 mb-4 bg-gray-50 rounded-lg">
                      <p className="text-sm font-medium text-gray-900">{session.user?.name}</p>
                      <p className="text-xs text-gray-500">{session.user?.email}</p>
                      <p className="text-xs text-blue-600 font-medium capitalize">{session.user?.role}</p>
                    </div>
                    <motion.a
                      href="/prikbord"
                      className="block text-lg font-medium transition-colors duration-300 hover:scale-105 py-2"
                      style={{ color: '#30302e' }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Prikbord
                    </motion.a>
                    {session.user?.role === 'admin' && (
                      <motion.a
                        href="/admin"
                        className="block text-lg font-medium transition-colors duration-300 hover:scale-105 py-2"
                        style={{ color: '#30302e' }}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Admin Dashboard
                      </motion.a>
                    )}
                    <motion.button
                      onClick={() => {
                        handleSignOut();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-2 w-full text-lg font-medium text-red-600 py-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <LogOut className="w-5 h-5" />
                      Uitloggen
                    </motion.button>
                  </>
                ) : (
                  <>
                    <motion.a
                      href="/auth/signin"
                      className="block text-lg font-medium transition-colors duration-300 hover:scale-105 py-2"
                      style={{ color: '#30302e' }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Inloggen
                    </motion.a>
                    <motion.a
                      href="/auth/register"
                      className="block text-lg font-medium transition-colors duration-300 hover:scale-105 py-2"
                      style={{ color: '#30302e' }}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Registreren
                    </motion.a>
                  </>
                )}
              </div>

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
