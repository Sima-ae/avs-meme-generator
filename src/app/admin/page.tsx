'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Users, Image, Trash2, LogOut, ArrowLeft } from 'lucide-react';

interface User {
  id: number;
  email: string;
  name: string;
  role: string;
  created_at: string;
  last_login: string;
  is_active: boolean;
}

interface PrikbordMeme {
  id: number;
  user_id: number;
  image_url: string;
  title: string;
  position_x: number;
  position_y: number;
  created_at: string;
  user_name: string;
}

export default function AdminDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<User[]>([]);
  const [memes, setMemes] = useState<PrikbordMeme[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === 'loading') return;
    
    if (!session || session.user.role !== 'admin') {
      router.push('/auth/signin');
      return;
    }

    fetchData();
  }, [session, status, router]);

  const fetchData = async () => {
    try {
      // Fetch users
      const usersResponse = await fetch('/api/admin/users');
      const usersResult = await usersResponse.json();
      if (usersResult.success) {
        setUsers(usersResult.data);
      }

      // Fetch memes
      const memesResponse = await fetch('/api/admin/memes');
      const memesResult = await memesResponse.json();
      if (memesResult.success) {
        setMemes(memesResult.data);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (userId: number) => {
    if (!confirm('Weet je zeker dat je deze gebruiker wilt verwijderen?')) return;
    
    try {
      const response = await fetch(`/api/admin/users?id=${userId}`, {
        method: 'DELETE'
      });
      const result = await response.json();
      
      if (result.success) {
        setUsers(users.filter(user => user.id !== userId));
      } else {
        console.error('Error deleting user:', result.error);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const deleteMeme = async (memeId: number) => {
    if (!confirm('Weet je zeker dat je deze meme wilt verwijderen?')) return;
    
    try {
      const response = await fetch(`/api/admin/memes?id=${memeId}`, {
        method: 'DELETE'
      });
      const result = await response.json();
      
      if (result.success) {
        setMemes(memes.filter(meme => meme.id !== memeId));
      } else {
        console.error('Error deleting meme:', result.error);
      }
    } catch (error) {
      console.error('Error deleting meme:', error);
    }
  };

  const toggleUserStatus = async (userId: number, isActive: boolean) => {
    try {
      const response = await fetch('/api/admin/users', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
          isActive: !isActive
        })
      });
      const result = await response.json();
      
      if (result.success) {
        setUsers(users.map(user => 
          user.id === userId ? { ...user, is_active: !isActive } : user
        ));
      } else {
        console.error('Error updating user status:', result.error);
      }
    } catch (error) {
      console.error('Error updating user status:', error);
    }
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Laden...</div>
      </div>
    );
  }

  if (!session || session.user.role !== 'admin') {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Admin Dashboard</h1>
          <div className="flex items-center gap-4">
            <Button
              onClick={() => router.push('/prikbord')}
              variant="outline"
              size="sm"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Naar Prikbord
            </Button>
            <Button
              onClick={() => router.push('/api/auth/signout')}
              variant="outline"
              size="sm"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Uitloggen
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Users Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Gebruikers ({users.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {users.map((user) => (
                  <motion.div
                    key={user.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-gray-600">{user.email}</div>
                      <div className="text-xs text-gray-500">
                        {user.role} • {user.is_active ? 'Actief' : 'Inactief'}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => toggleUserStatus(user.id, user.is_active)}
                      >
                        {user.is_active ? 'Deactiveren' : 'Activeren'}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => deleteUser(user.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Memes Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="w-5 h-5" />
                Prikbord Memes ({memes.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {memes.map((meme) => (
                  <motion.div
                    key={meme.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={meme.image_url}
                        alt={meme.title}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <div className="font-medium">{meme.title || 'Geen titel'}</div>
                        <div className="text-sm text-gray-600">
                          Door: {meme.user_name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(meme.created_at).toLocaleDateString('nl-NL')}
                        </div>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => deleteMeme(meme.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
