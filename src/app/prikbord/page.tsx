'use client';

import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Upload, X, Maximize2, Minimize2 } from 'lucide-react';

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
  const [isLoading, setIsLoading] = useState(false);
  const whiteboardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log('useEffect triggered');
    loadMemes();
  }, []);

  const loadMemes = async () => {
    try {
      console.log('Loading memes...');
      const response = await fetch('/api/prikbord');
      const result = await response.json();
      
      if (result.success) {
        const memes: StickyNote[] = result.data.map((row: any) => ({
          id: row.id,
          x: row.position_x,
          y: row.position_y,
          imageUrl: row.image_url,
          title: row.title,
          userId: row.user_id
        }));
        setStickyNotes(memes);
      }
    } catch (error) {
      console.error('Error loading memes:', error);
    }
  };

  const addStickyNote = async (imageUrl: string, title?: string) => {
    try {
      const response = await fetch('/api/prikbord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl,
          title: title || 'Uploaded Meme',
          x: Math.random() * 400 + 50,
          y: Math.random() * 300 + 50,
          userId: session?.user?.id || 2
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

  if (isLoading) {
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
              <>
                <div className="flex items-center gap-2">
                  <Input
                    type="url"
                    placeholder="Voeg URL toe..."
                    value={uploadUrl}
                    onChange={(e) => setUploadUrl(e.target.value)}
                    className="w-64"
                  />
                  <Button
                    onClick={handleUrlUpload}
                    variant="outline"
                    size="sm"
                  >
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
              onClick={() => {
                if (!document.fullscreenElement) {
                  document.documentElement.requestFullscreen();
                  setIsFullscreen(true);
                } else {
                  document.exitFullscreen();
                  setIsFullscreen(false);
                }
              }}
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
      >
        {stickyNotes.map((note) => (
          <div
            key={note.id}
            className="absolute cursor-move"
            style={{
              left: note.x,
              top: note.y,
              transform: isDragging === note.id ? 'scale(1.05)' : 'scale(1)',
              transition: isDragging === note.id ? 'none' : 'transform 0.2s ease'
            }}
          >
            <div className="relative w-48 h-48">
              <img
                src={note.imageUrl}
                alt={note.title}
                className="w-full h-full object-contain hover:opacity-90 transition-opacity duration-200"
                draggable={false}
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedImage(note.imageUrl);
                }}
              />
              {session?.user?.role === 'admin' && (
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add remove functionality here
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
          onClick={() => setSelectedImage(null)}
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
              onClick={() => setSelectedImage(null)}
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