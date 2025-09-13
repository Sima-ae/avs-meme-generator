'use client';

import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Upload, X, Maximize2, Minimize2, Plus, LogIn } from 'lucide-react';

interface StickyNote {
  id: number;
  x: number;
  y: number;
  imageUrl: string;
  title?: string;
  userId: number;
}

export default function PrikbordPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stickyNotes, setStickyNotes] = useState<StickyNote[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [uploadUrl, setUploadUrl] = useState('');
  const [isDragging, setIsDragging] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const whiteboardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load memes from database
  useEffect(() => {
    if (status === 'loading') return;
    
    console.log('Loading memes from database, status:', status);
    loadMemesFromDatabase();
  }, [status]);

  const loadMemesFromDatabase = async () => {
    try {
      console.log('Fetching memes from /api/prikbord...');
      const response = await fetch('/api/prikbord');
      const result = await response.json();
      
      console.log('API response:', result);
      
      if (result.success) {
        const memes: StickyNote[] = result.data.map((row: any) => ({
          id: row.id,
          x: row.position_x,
          y: row.position_y,
          imageUrl: row.image_url,
          title: row.title,
          userId: row.user_id
        }));
        
        console.log('Mapped memes:', memes);
        setStickyNotes(memes);
      } else {
        console.error('Error loading memes:', result.error);
      }
    } catch (error) {
      console.error('Error loading memes:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const addStickyNote = async (imageUrl: string, title?: string) => {
    if (!session?.user?.id) {
      router.push('/auth/signin');
      return;
    }

    try {
      const response = await fetch('/api/prikbord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl,
          title: title || 'Meme Kaart',
          userId: parseInt(session.user.id)
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        const newNote: StickyNote = {
          id: result.data.id,
          x: result.data.position_x,
          y: result.data.position_y,
          imageUrl: result.data.image_url,
          title: result.data.title,
          userId: result.data.user_id
        };
        
        setStickyNotes(prev => [...prev, newNote]);
      } else {
        console.error('Error adding meme:', result.error);
      }
    } catch (error) {
      console.error('Error adding meme:', error);
    }
  };

  const handleUrlUpload = () => {
    if (uploadUrl.trim()) {
      addStickyNote(uploadUrl.trim());
      setUploadUrl('');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        addStickyNote(imageUrl, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeStickyNote = async (id: number) => {
    if (!session?.user?.id || session.user.role !== 'admin') return;
    
    try {
      const response = await fetch(`/api/prikbord?id=${id}`, {
        method: 'DELETE'
      });
      
      const result = await response.json();
      
      if (result.success) {
        setStickyNotes(prev => prev.filter(note => note.id !== id));
      } else {
        console.error('Error removing meme:', result.error);
      }
    } catch (error) {
      console.error('Error removing meme:', error);
    }
  };

  const handleMouseDown = (e: React.MouseEvent, id: number) => {
    // Only allow dragging for admin users
    if (!session?.user?.id || session.user.role !== 'admin') return;
    
    e.preventDefault();
    setIsDragging(id);
    const rect = whiteboardRef.current?.getBoundingClientRect();
    if (rect) {
      const note = stickyNotes.find(n => n.id === id);
      if (note) {
        setDragOffset({
          x: e.clientX - rect.left - note.x,
          y: e.clientY - rect.top - note.y
        });
      }
    }
  };

  const handleMouseMove = async (e: React.MouseEvent) => {
    if (isDragging && whiteboardRef.current) {
      const rect = whiteboardRef.current.getBoundingClientRect();
      const newX = e.clientX - rect.left - dragOffset.x;
      const newY = e.clientY - rect.top - dragOffset.y;
      
      const constrainedX = Math.max(0, Math.min(newX, rect.width - 200));
      const constrainedY = Math.max(0, Math.min(newY, rect.height - 200));
      
      setStickyNotes(prev => prev.map(note => 
        note.id === isDragging 
          ? { ...note, x: constrainedX, y: constrainedY }
          : note
      ));
    }
  };

  const handleMouseUp = async () => {
    if (isDragging && session?.user?.id && session.user.role === 'admin') {
      // Save position to database
      try {
        const note = stickyNotes.find(n => n.id === isDragging);
        if (note) {
          const response = await fetch('/api/prikbord', {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              id: isDragging,
              x: note.x,
              y: note.y
            })
          });
          
          const result = await response.json();
          
          if (!result.success) {
            console.error('Error updating position:', result.error);
          }
        }
      } catch (error) {
        console.error('Error updating position:', error);
      }
    }
    setIsDragging(null);
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeImagePopup = () => {
    setSelectedImage(null);
  };

  if (status === 'loading' || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Laden...</div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gray-100 transition-all duration-300 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Prikbord - Memes</h1>
          <div className="flex items-center gap-4">
            {session?.user?.role === 'admin' && (
              <Button
                onClick={() => router.push('/admin')}
                variant="outline"
                size="sm"
              >
                Admin Dashboard
              </Button>
            )}
            {session && (
              <>
                <div className="flex items-center gap-2">
                  <Input
                    placeholder="Voer afbeelding URL in..."
                    value={uploadUrl}
                    onChange={(e) => setUploadUrl(e.target.value)}
                    className="w-64"
                    onKeyPress={(e) => e.key === 'Enter' && handleUrlUpload()}
                  />
                  <Button onClick={handleUrlUpload} size="sm">
                    <Plus className="w-4 h-4 mr-1" />
                    URL Toevoegen
                  </Button>
                </div>
                <Button
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  size="sm"
                >
                  <Upload className="w-4 h-4 mr-1" />
                  PNG Uploaden
                </Button>
              </>
            )}
            <Button
              onClick={toggleFullscreen}
              variant="outline"
              size="sm"
            >
              {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Whiteboard */}
      <div
        ref={whiteboardRef}
        className="relative w-full h-[calc(100vh-80px)] bg-white overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)
            `,
            backgroundSize: '20px 20px'
          }} />
        </div>

        {/* Meme Images */}
        {stickyNotes.map((note) => (
          <div
            key={note.id}
            className={`absolute select-none ${
              session?.user?.role === 'admin' ? 'cursor-move' : 'cursor-pointer'
            }`}
            style={{
              left: note.x,
              top: note.y,
              transform: isDragging === note.id ? 'rotate(2deg)' : 'rotate(-1deg)',
              transition: isDragging === note.id ? 'none' : 'transform 0.2s ease'
            }}
            onMouseDown={(e) => handleMouseDown(e, note.id)}
          >
            <div className="relative w-48 h-48">
              <img
                src={note.imageUrl}
                alt={note.title}
                className="w-full h-full object-contain hover:opacity-90 transition-opacity duration-200"
                draggable={false}
                onClick={(e) => {
                  e.stopPropagation();
                  handleImageClick(note.imageUrl);
                }}
              />
              {session?.user?.role === 'admin' && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeStickyNote(note.id);
                  }}
                  size="sm"
                  variant="destructive"
                  className="absolute -top-2 -right-2 w-6 h-6 p-0 rounded-full shadow-lg"
                >
                  <X className="w-3 h-3" />
                </Button>
              )}
            </div>
          </div>
        ))}

        {/* Empty state */}
        {stickyNotes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-6xl mb-4">📌</div>
              <h3 className="text-xl font-semibold mb-2">Nog geen memes geplaatst</h3>
              <p className="text-sm">
                {session 
                  ? 'Upload jouw gegeneerde meme om te beginnen!' 
                  : 'Log in om memes toe te voegen aan het prikbord!'
                }
              </p>
              {!session && (
                <div className="mt-4">
                  <Button
                    onClick={() => router.push('/auth/signin')}
                    size="sm"
                    style={{ backgroundColor: '#30302e' }}
                  >
                    <LogIn className="w-4 h-4 mr-2" />
                    Inloggen
                  </Button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        onChange={handleFileUpload}
        className="hidden"
      />

      {/* Full-size Image Popup */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={closeImagePopup}
        >
          <div 
            className="relative max-w-4xl max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={selectedImage}
              alt="Full size meme"
              className="max-w-full max-h-full object-contain"
            />
            <Button
              onClick={closeImagePopup}
              size="sm"
              variant="destructive"
              className="absolute -top-2 -right-2 w-8 h-8 p-0 rounded-full shadow-lg"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
