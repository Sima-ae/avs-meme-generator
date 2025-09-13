'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Upload, X, Maximize2, Minimize2, Plus } from 'lucide-react';

interface StickyNote {
  id: string;
  x: number;
  y: number;
  imageUrl: string;
  title?: string;
}

export default function PrikbordPage() {
  const [stickyNotes, setStickyNotes] = useState<StickyNote[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [uploadUrl, setUploadUrl] = useState('');
  const [isDragging, setIsDragging] = useState<string | null>(null);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const whiteboardRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load saved notes from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('prikbord-notes');
    if (saved) {
      setStickyNotes(JSON.parse(saved));
    }
  }, []);

  // Save notes to localStorage
  useEffect(() => {
    localStorage.setItem('prikbord-notes', JSON.stringify(stickyNotes));
  }, [stickyNotes]);

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen();
      setIsFullscreen(false);
    }
  };

  const addStickyNote = (imageUrl: string, title?: string) => {
    const newNote: StickyNote = {
      id: Date.now().toString(),
      x: Math.random() * 300 + 50, // Random position
      y: Math.random() * 200 + 50,
      imageUrl,
      title: title || 'Meme Kaart'
    };
    setStickyNotes(prev => [...prev, newNote]);
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

  const removeStickyNote = (id: string) => {
    setStickyNotes(prev => prev.filter(note => note.id !== id));
  };

  const handleMouseDown = (e: React.MouseEvent, id: string) => {
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

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && whiteboardRef.current) {
      const rect = whiteboardRef.current.getBoundingClientRect();
      const newX = e.clientX - rect.left - dragOffset.x;
      const newY = e.clientY - rect.top - dragOffset.y;
      
      setStickyNotes(prev => prev.map(note => 
        note.id === isDragging 
          ? { ...note, x: Math.max(0, Math.min(newX, rect.width - 200)), y: Math.max(0, Math.min(newY, rect.height - 200)) }
          : note
      ));
    }
  };

  const handleMouseUp = () => {
    setIsDragging(null);
  };

  const handleImageClick = (imageUrl: string) => {
    setSelectedImage(imageUrl);
  };

  const closeImagePopup = () => {
    setSelectedImage(null);
  };

  return (
    <div className={`min-h-screen bg-gray-100 transition-all duration-300 ${isFullscreen ? 'fixed inset-0 z-50' : ''}`}>
      {/* Header */}
      <div className="bg-white shadow-sm border-b p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-800">Welkom op ons prikbord</h1>
          <div className="flex items-center gap-4">
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
            className="absolute cursor-move select-none"
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
                className="w-full h-full object-contain cursor-pointer hover:opacity-90 transition-opacity duration-200"
                draggable={false}
                onClick={(e) => {
                  e.stopPropagation();
                  handleImageClick(note.imageUrl);
                }}
              />
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
            </div>
          </div>
        ))}

        {/* Empty state */}
        {stickyNotes.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-6xl mb-4">📌</div>
              <h3 className="text-xl font-semibold mb-2">Nog geen mems geplaatst</h3>
              <p className="text-sm">Upload jouw gegeneerde meme om te beginnen!</p>
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
