'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { sql } from '@vercel/postgres';
import bcrypt from 'bcryptjs';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Wachtwoorden komen niet overeen');
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Wachtwoord moet minimaal 6 karakters lang zijn');
      setIsLoading(false);
      return;
    }

    try {
      // Check if user already exists
      const { rows: existingUsers } = await sql`
        SELECT id FROM users WHERE email = ${formData.email}
      `;

      if (existingUsers.length > 0) {
        setError('Er bestaat al een account met dit email adres');
        setIsLoading(false);
        return;
      }

      // Hash password
      const saltRounds = 12;
      const hashedPassword = await bcrypt.hash(formData.password, saltRounds);

      // Create user
      await sql`
        INSERT INTO users (name, email, password_hash, role)
        VALUES (${formData.name}, ${formData.email}, ${hashedPassword}, 'user')
      `;

      setSuccess(true);
      setTimeout(() => {
        router.push('/auth/signin');
      }, 2000);

    } catch (error) {
      console.error('Registration error:', error);
      setError('Er is een fout opgetreden bij het registreren');
    } finally {
      setIsLoading(false);
    }
  };

  if (success) {
    return (
      <div className='min-h-screen flex items-center justify-center' style={{ backgroundColor: '#fdee34' }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 mx-auto bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                Account aangemaakt!
              </h2>
              <p className="text-gray-600 mb-4">
                Je account is succesvol aangemaakt. Je wordt doorgestuurd naar de inlogpagina.
              </p>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <motion.div
                  className="bg-green-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 2 }}
                />
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-yellow-50 to-yellow-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="w-full h-full" style={{
          backgroundImage: `
            linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px'
        }} />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md relative z-10"
      >
        <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
          <CardHeader className="text-center pb-8">
            <div className="mb-4">
              <div className="w-16 h-16 mx-auto rounded-full flex items-center justify-center" style={{ backgroundColor: '#30302e' }}>
                <span className="text-2xl">👤</span>
              </div>
            </div>
            <CardTitle className="text-3xl font-bold" style={{ color: '#30302e' }}>
              Account aanmaken
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Maak een account aan om toegang te krijgen tot het prikbord
            </p>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-semibold text-gray-700">
                  Volledige naam
                </label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="Voer je volledige naam in"
                  className="h-12 text-base border-2 focus:border-yellow-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  Email adres
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Voer je email adres in"
                  className="h-12 text-base border-2 focus:border-yellow-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
                  Wachtwoord
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Minimaal 6 karakters"
                  className="h-12 text-base border-2 focus:border-yellow-500 transition-colors"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
                  Bevestig wachtwoord
                </label>
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                  placeholder="Bevestig je wachtwoord"
                  className="h-12 text-base border-2 focus:border-yellow-500 transition-colors"
                />
              </div>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm"
                >
                  {error}
                </motion.div>
              )}
              <Button
                type="submit"
                className="w-full h-12 text-base font-semibold text-white"
                disabled={isLoading}
                style={{ backgroundColor: '#30302e' }}
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Account aanmaken...
                  </div>
                ) : (
                  'Account aanmaken'
                )}
              </Button>
            </form>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600 mb-4">
                Heb je al een account?
              </p>
              <Button
                variant="outline"
                onClick={() => router.push('/auth/signin')}
                className="w-full h-10"
              >
                ← Inloggen
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
