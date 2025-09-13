'use client';

import { useState, useRef, useEffect } from 'react';
import { useSession } from 'next-auth/react';
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
  const [stickyNotes, setStickyNotes] = useState<StickyNote[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [uploadUrl, setUploadUrl] = useState('');
  const [isDragging, setIsDragging] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const whiteboardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load memes from database on mount
  useEffect(() => {
    loadMemesFromDatabase();
  }, []);

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
        
        console.log('Loaded memes:', memes);
        setStickyNotes(memes);
      } else {
        console.error('Error loading memes:', result.error);
      }
    } catch (error) {
      console.error('Error loading memes:', error);
    }
  };

  const addStickyNote = async (imageUrl: string, title?: string) => {
    try {
      console.log('Adding sticky note:', { imageUrl, title });
      const response = await fetch('/api/prikbord', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          imageUrl,
          title: title || 'Uploaded Meme',
          x: Math.round(Math.random() * 400 + 50),
          y: Math.round(Math.random() * 300 + 50),
          userId: session?.user?.id || 2
        })
      });
      
      const result = await response.json();
      console.log('Add response:', result);
      
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
        console.log('Sticky note added successfully');
      } else {
        console.error('Error adding meme:', result.error);
      }
    } catch (error) {
      console.error('Error adding meme:', error);
    }
  };

  const handleUrlUpload = () => {
    if (uploadUrl.trim()) {
      console.log('Uploading URL:', uploadUrl);
      addStickyNote(uploadUrl.trim());
      setUploadUrl('');
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('File selected:', file.name);
      const reader = new FileReader();
      reader.onload = (e) => {
        const imageUrl = e.target?.result as string;
        console.log('File read, uploading...');
        addStickyNote(imageUrl, file.name);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeStickyNote = async (id: number) => {
    if (!session?.user?.id || session.user.role !== 'admin') return;
    
    try {
      console.log('Removing sticky note:', id);
      const response = await fetch(`/api/prikbord?id=${id}`, {
        method: 'DELETE'
      });
      
      const result = await response.json();
      console.log('Remove response:', result);
      
      if (result.success) {
        setStickyNotes(prev => prev.filter(note => note.id !== id));
        console.log('Sticky note removed successfully');
      } else {
        console.error('Error removing meme:', result.error);
      }
    } catch (error) {
      console.error('Error removing meme:', error);
    }
  };

  const handleMouseDown = (e: React.MouseEvent, id: number) => {
    if (!session?.user?.id || session.user.role !== 'admin') return;
    
    e.preventDefault();
    const note = stickyNotes.find(n => n.id === id);
    if (note) {
      setIsDragging(id);
      setDragOffset({
        x: e.clientX - note.x,
        y: e.clientY - note.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging === null) return;
    
    const note = stickyNotes.find(n => n.id === isDragging);
    if (note) {
      setStickyNotes(prev => prev.map(n => 
        n.id === isDragging 
          ? { ...n, x: e.clientX - dragOffset.x, y: e.clientY - dragOffset.y }
          : n
      ));
    }
  };

  const handleMouseUp = async () => {
    if (isDragging === null) return;
    
    const note = stickyNotes.find(n => n.id === isDragging);
    if (note) {
      try {
        console.log('Updating position for note:', isDragging, { x: note.x, y: note.y });
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
        console.log('Position update response:', result);
        
        if (!result.success) {
          console.error('Error updating position:', result.error);
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

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

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
      >
        {stickyNotes.length === 0 ? (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-lg font-medium">Geen memes gevonden</div>
              <div className="text-sm mt-2">
                {session?.user?.role === 'admin' 
                  ? 'Upload een meme om te beginnen' 
                  : 'Er zijn nog geen memes geüpload'
                }
              </div>
            </div>
          </div>
        ) : (
          stickyNotes.map((note) => (
            <div
              key={note.id}
              className="absolute cursor-move"
              style={{
                left: note.x,
                top: note.y,
                transform: isDragging === note.id ? 'scale(1.05)' : 'scale(1)',
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
          ))
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