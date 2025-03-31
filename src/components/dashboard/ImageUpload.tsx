
import React, { useState, useRef } from "react";
import { Upload, X, Image, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type UploadImage = {
  id: string;
  file: File;
  preview: string;
  visibility: "members" | "public";
  progress: number;
  uploaded: boolean;
};

export const ImageUpload = () => {
  const [images, setImages] = useState<UploadImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (fileList: FileList) => {
    const newImages: UploadImage[] = [];
    
    Array.from(fileList).forEach(file => {
      if (!file.type.startsWith('image/')) {
        toast({
          title: "Ungültiger Dateityp",
          description: `${file.name} ist kein Bild. Bitte wähle nur Bilddateien aus.`,
          variant: "destructive",
        });
        return;
      }
      
      newImages.push({
        id: Math.random().toString(36).substring(2, 9),
        file,
        preview: URL.createObjectURL(file),
        visibility: "members",
        progress: 0,
        uploaded: false,
      });
    });
    
    setImages(prev => [...prev, ...newImages]);
  };

  const removeImage = (id: string) => {
    setImages(prev => {
      const filtered = prev.filter(img => img.id !== id);
      return filtered;
    });
  };

  const updateVisibility = (id: string, visibility: "members" | "public") => {
    setImages(prev =>
      prev.map(img =>
        img.id === id ? { ...img, visibility } : img
      )
    );
  };

  const simulateUpload = () => {
    if (images.length === 0) {
      toast({
        title: "Keine Bilder ausgewählt",
        description: "Bitte wähle mindestens ein Bild zum Hochladen aus.",
        variant: "destructive",
      });
      return;
    }
    
    setIsUploading(true);
    
    let completed = 0;
    const totalImages = images.length;
    
    // Simulate progress for each image
    images.forEach((img, index) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.floor(Math.random() * 10) + 5;
        
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          completed++;
          
          setImages(prev =>
            prev.map(image =>
              image.id === img.id
                ? { ...image, progress: 100, uploaded: true }
                : image
            )
          );
          
          if (completed === totalImages) {
            setTimeout(() => {
              setIsUploading(false);
              toast({
                title: "Upload abgeschlossen",
                description: `${totalImages} Bilder wurden erfolgreich hochgeladen.`,
              });
              
              // Store in sessionStorage (simplified simulation)
              const existingImages = JSON.parse(sessionStorage.getItem("userImages") || "[]");
              const newImagesForStorage = images.map(img => ({
                id: img.id,
                name: img.file.name,
                preview: img.preview,
                visibility: img.visibility,
                uploadDate: new Date().toISOString(),
                albums: [],
              }));
              
              sessionStorage.setItem(
                "userImages", 
                JSON.stringify([...existingImages, ...newImagesForStorage])
              );
              
              // Clear the upload list after successful upload
              setTimeout(() => {
                setImages([]);
              }, 1500);
            }, 500);
          }
        } else {
          setImages(prev =>
            prev.map(image =>
              image.id === img.id ? { ...image, progress } : image
            )
          );
        }
      }, 300 + (index * 50)); // Stagger the uploads
    });
  };

  return (
    <div>
      {/* Drop Zone */}
      <div
        onClick={() => fileInputRef.current?.click()}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
          ${isDragging 
            ? "border-ducati-red bg-ducati-red/5" 
            : "border-ducati-gray-medium/30 hover:border-ducati-red/70 hover:bg-ducati-gray-light/70"
          }
        `}
      >
        <Upload className="mx-auto h-12 w-12 text-ducati-gray-medium mb-4" />
        <h3 className="font-medium text-lg mb-2">Bilder hierher ziehen</h3>
        <p className="text-ducati-gray-dark mb-4">oder klicken zum Auswählen</p>
        <p className="text-sm text-ducati-gray-medium">
          Unterstützte Formate: JPG, PNG, GIF
        </p>
        <input
          type="file"
          ref={fileInputRef}
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Preview Section */}
      {images.length > 0 && (
        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-semibold text-lg">Ausgewählte Bilder ({images.length})</h3>
            <div className="flex space-x-2">
              <Button
                variant="outline"
                disabled={isUploading}
                onClick={() => setImages([])}
              >
                Alle entfernen
              </Button>
              <Button 
                onClick={simulateUpload}
                disabled={isUploading}
              >
                {isUploading ? "Wird hochgeladen..." : "Ausgewählte Bilder hochladen"}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {images.map(img => (
              <div 
                key={img.id} 
                className={`
                  relative rounded-lg overflow-hidden border
                  ${img.uploaded ? "border-green-500" : "border-ducati-gray-light"}
                `}
              >
                <div className="relative aspect-square bg-ducati-gray-light">
                  <img 
                    src={img.preview} 
                    alt={img.file.name} 
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {img.uploaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <CheckCircle className="text-green-500 h-10 w-10" />
                    </div>
                  )}
                </div>
                
                <div className="p-3">
                  <div className="flex justify-between items-start mb-2">
                    <div className="w-4/5 truncate text-sm font-medium">{img.file.name}</div>
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(img.id);
                      }}
                      disabled={isUploading}
                      className="text-ducati-gray-medium hover:text-ducati-red"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                  
                  {/* Visibility Selection */}
                  <RadioGroup 
                    value={img.visibility} 
                    onValueChange={(value: "members" | "public") => updateVisibility(img.id, value)}
                    className="flex gap-4 mt-2"
                    disabled={isUploading}
                  >
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="members" id={`members-${img.id}`} />
                      <Label htmlFor={`members-${img.id}`} className="text-xs cursor-pointer">Nur Mitglieder</Label>
                    </div>
                    <div className="flex items-center space-x-1">
                      <RadioGroupItem value="public" id={`public-${img.id}`} />
                      <Label htmlFor={`public-${img.id}`} className="text-xs cursor-pointer">Öffentlich</Label>
                    </div>
                  </RadioGroup>
                  
                  {/* Progress Bar */}
                  {isUploading && (
                    <div className="mt-3">
                      <Progress value={img.progress} className="h-2" />
                      <div className="text-xs text-right mt-1 text-ducati-gray-medium">
                        {img.progress}%
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
