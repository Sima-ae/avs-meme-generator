'use client';

import { useState, useEffect } from 'react';
import { signIn, getSession, getCsrfToken } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function SignInPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [csrfToken, setCsrfToken] = useState('');
  const router = useRouter();

  useEffect(() => {
    const getToken = async () => {
      try {
        const token = await getCsrfToken();
        console.log('CSRF Token received:', token);
        setCsrfToken(token || '');
      } catch (error) {
        console.error('Error getting CSRF token:', error);
        setCsrfToken('');
      }
    };
    getToken();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    console.log('Login attempt:', { email, password: '***', csrfToken });

    try {
      const result = await signIn('credentials', {
        email,
        password,
        csrfToken,
        redirect: false,
      });

      console.log('SignIn result:', result);

      if (result?.error) {
        console.error('Login error:', result.error);
        if (result.error === 'CredentialsSignin') {
          setError('Ongeldige inloggegevens. Controleer je email en wachtwoord.');
          // Try to get a fresh CSRF token
          try {
            const freshToken = await getCsrfToken();
            console.log('Fresh CSRF token:', freshToken);
            setCsrfToken(freshToken || '');
          } catch (tokenError) {
            console.error('Error getting fresh CSRF token:', tokenError);
          }
        } else {
          setError('Er is een fout opgetreden: ' + result.error);
        }
      } else if (result?.ok) {
        console.log('Login successful');
        const session = await getSession();
        console.log('Session:', session);
        if (session?.user?.role === 'admin') {
          router.push('/admin');
        } else {
          router.push('/prikbord');
        }
      } else {
        console.log('Login failed - no error or ok status');
        setError('Er is een fout opgetreden');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Er is een fout opgetreden');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: '#fdee34' }}>
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
                <span className="text-2xl">🔐</span>
              </div>
            </div>
            <CardTitle className="text-3xl font-bold" style={{ color: '#30302e' }}>
              Welkom terug
            </CardTitle>
            <p className="text-gray-600 mt-2">
              Log in om toegang te krijgen tot het prikbord
            </p>
          </CardHeader>
          <CardContent className="px-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                  Email adres
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Voer je wachtwoord in"
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
                    Inloggen...
                  </div>
                ) : (
                  'Inloggen'
                )}
              </Button>
            </form>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-sm text-gray-600 mb-4">
                Heb je nog geen account?
              </p>
              <Button
                variant="outline"
                onClick={() => router.push('/auth/register')}
                className="w-full h-10"
              >
                ← Account aanmaken
              </Button>
              <Button
                variant="outline"
                onClick={() => router.push('/')}
                className="w-full h-10 mt-2"
              >
                ← Terug naar home
              </Button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
