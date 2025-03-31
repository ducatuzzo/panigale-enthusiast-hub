
import React, { useState, useEffect } from "react";
import { Trash2, FolderPlus, Lock, Globe, CheckCircle2, Eye, Filter } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

type Image = {
  id: string;
  name: string;
  preview: string;
  visibility: "members" | "public";
  uploadDate: string;
  albums: string[];
};

type Album = {
  id: string;
  name: string;
  createdAt: string;
  imageCount: number;
};

export const ImageGallery = () => {
  const [images, setImages] = useState<Image[]>([]);
  const [albums, setAlbums] = useState<Album[]>([]);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [currentAlbumFilter, setCurrentAlbumFilter] = useState<string>("all");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isAlbumDialogOpen, setIsAlbumDialogOpen] = useState(false);
  const [isVisibilityOpen, setIsVisibilityOpen] = useState(false);
  const [selectedVisibility, setSelectedVisibility] = useState<"members" | "public">("members");
  const [targetAlbumId, setTargetAlbumId] = useState<string>("");
  const { toast } = useToast();

  // Load images and albums from sessionStorage on component mount
  useEffect(() => {
    const storedImages = sessionStorage.getItem("userImages");
    const storedAlbums = sessionStorage.getItem("userAlbums");
    
    if (storedImages) {
      try {
        setImages(JSON.parse(storedImages));
      } catch (e) {
        console.error("Failed to parse images from sessionStorage", e);
      }
    }
    
    if (storedAlbums) {
      try {
        setAlbums(JSON.parse(storedAlbums));
      } catch (e) {
        console.error("Failed to parse albums from sessionStorage", e);
      }
    }
  }, []);

  // Save images to sessionStorage whenever they change
  useEffect(() => {
    sessionStorage.setItem("userImages", JSON.stringify(images));
  }, [images]);

  // Update album image counts when images change
  useEffect(() => {
    if (albums.length > 0) {
      const updatedAlbums = albums.map(album => {
        const count = images.filter(img => img.albums.includes(album.id)).length;
        return { ...album, imageCount: count };
      });
      
      setAlbums(updatedAlbums);
      sessionStorage.setItem("userAlbums", JSON.stringify(updatedAlbums));
    }
  }, [images, albums]);

  const filteredImages = currentAlbumFilter === "all" 
    ? images 
    : images.filter(img => img.albums.includes(currentAlbumFilter));

  const toggleImageSelection = (id: string) => {
    setSelectedImages(prev => 
      prev.includes(id)
        ? prev.filter(imgId => imgId !== id)
        : [...prev, id]
    );
  };

  const selectAllImages = () => {
    if (selectedImages.length === filteredImages.length) {
      setSelectedImages([]);
    } else {
      setSelectedImages(filteredImages.map(img => img.id));
    }
  };

  const handleDeleteImages = () => {
    setImages(prev => prev.filter(img => !selectedImages.includes(img.id)));
    setSelectedImages([]);
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Bilder gelöscht",
      description: `${selectedImages.length} Bild${selectedImages.length !== 1 ? 'er wurden' : ' wurde'} erfolgreich gelöscht.`,
    });
  };

  const handleAddToAlbum = () => {
    if (!targetAlbumId) {
      toast({
        title: "Fehler",
        description: "Bitte wähle ein Album aus.",
        variant: "destructive",
      });
      return;
    }

    setImages(prev => 
      prev.map(img => 
        selectedImages.includes(img.id)
          ? {
              ...img,
              albums: img.albums.includes(targetAlbumId)
                ? img.albums
                : [...img.albums, targetAlbumId]
            }
          : img
      )
    );

    setIsAlbumDialogOpen(false);
    setTargetAlbumId("");
    
    toast({
      title: "Bilder zum Album hinzugefügt",
      description: `${selectedImages.length} Bild${selectedImages.length !== 1 ? 'er wurden' : ' wurde'} erfolgreich zum Album hinzugefügt.`,
    });
  };

  const handleChangeVisibility = () => {
    setImages(prev => 
      prev.map(img => 
        selectedImages.includes(img.id)
          ? { ...img, visibility: selectedVisibility }
          : img
      )
    );

    setIsVisibilityOpen(false);
    
    toast({
      title: "Sichtbarkeit geändert",
      description: `Die Sichtbarkeit von ${selectedImages.length} Bild${selectedImages.length !== 1 ? 'ern wurde' : ' wurde'} geändert.`,
    });
  };

  return (
    <div>
      {/* Header with Filters and Actions */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div className="flex items-center">
          <h3 className="text-xl font-semibold mr-4">Meine Bilder</h3>
          <Select 
            value={currentAlbumFilter} 
            onValueChange={setCurrentAlbumFilter}
          >
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Alle Bilder" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Bilder</SelectItem>
              {albums.map(album => (
                <SelectItem key={album.id} value={album.id}>
                  {album.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        {selectedImages.length > 0 && (
          <div className="flex flex-wrap gap-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsVisibilityOpen(true)}
            >
              <Filter className="mr-2 h-4 w-4" />
              Sichtbarkeit ändern
            </Button>
            
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsAlbumDialogOpen(true)}
              disabled={albums.length === 0}
            >
              <FolderPlus className="mr-2 h-4 w-4" />
              Zu Album hinzufügen
            </Button>
            
            <Button 
              variant="destructive" 
              size="sm"
              onClick={() => setIsDeleteDialogOpen(true)}
            >
              <Trash2 className="mr-2 h-4 w-4" />
              Löschen
            </Button>
          </div>
        )}
      </div>

      {/* Image Count and Select All */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-ducati-gray-dark">
          {filteredImages.length} Bild{filteredImages.length !== 1 ? 'er' : ''} gefunden
        </div>
        
        {filteredImages.length > 0 && (
          <Button variant="ghost" size="sm" onClick={selectAllImages}>
            {selectedImages.length === filteredImages.length 
              ? "Alle abwählen" 
              : "Alle auswählen"
            }
          </Button>
        )}
      </div>

      {/* Images Grid */}
      {filteredImages.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg border-ducati-gray-medium/30">
          <Eye className="h-12 w-12 mx-auto text-ducati-gray-medium mb-3" />
          <h4 className="text-lg font-medium mb-2">Keine Bilder gefunden</h4>
          <p className="text-ducati-gray-dark mb-4 max-w-md mx-auto">
            {currentAlbumFilter === "all"
              ? "Du hast noch keine Bilder hochgeladen. Gehe zum Tab 'Bilder-Upload' um Bilder hochzuladen."
              : "In diesem Album befinden sich keine Bilder. Füge Bilder zu diesem Album hinzu."
            }
          </p>
          {currentAlbumFilter === "all" && (
            <Button variant="outline" onClick={() => document.querySelector('[value="upload"]')?.dispatchEvent(new Event('click'))}>
              Zu Bilder-Upload
            </Button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filteredImages.map(img => (
            <div 
              key={img.id} 
              className={`
                relative border rounded overflow-hidden cursor-pointer transition-all
                ${selectedImages.includes(img.id) 
                  ? "ring-2 ring-ducati-red shadow-lg" 
                  : "hover:shadow-md"
                }
              `}
              onClick={() => toggleImageSelection(img.id)}
            >
              <div className="relative aspect-square">
                <img 
                  src={img.preview} 
                  alt={img.name} 
                  className="absolute inset-0 w-full h-full object-cover"
                />
                
                {/* Visibility Badge */}
                <div className={`
                  absolute top-2 right-2 p-1 rounded 
                  ${img.visibility === "public" 
                    ? "bg-green-500" 
                    : "bg-ducati-black/70"
                  }
                `}>
                  {img.visibility === "public" ? (
                    <Globe className="h-3 w-3 text-white" />
                  ) : (
                    <Lock className="h-3 w-3 text-white" />
                  )}
                </div>
                
                {/* Selection Indicator */}
                {selectedImages.includes(img.id) && (
                  <div className="absolute inset-0 bg-ducati-black/30 flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-white" />
                  </div>
                )}
              </div>
              
              <div className="p-2 bg-white">
                <div className="truncate text-xs font-medium">{img.name}</div>
                <div className="text-xs text-ducati-gray-medium mt-1">
                  {new Date(img.uploadDate).toLocaleDateString('de-DE')}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Bilder löschen</DialogTitle>
            <DialogDescription>
              Möchtest du wirklich {selectedImages.length} Bild{selectedImages.length !== 1 ? 'er' : ''} löschen? 
              Diese Aktion kann nicht rückgängig gemacht werden.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Abbrechen
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteImages}
            >
              Löschen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Add to Album Dialog */}
      <Dialog open={isAlbumDialogOpen} onOpenChange={setIsAlbumDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Zu Album hinzufügen</DialogTitle>
            <DialogDescription>
              Wähle ein Album aus, um {selectedImages.length} Bild{selectedImages.length !== 1 ? 'er' : ''} hinzuzufügen.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Select value={targetAlbumId} onValueChange={setTargetAlbumId}>
              <SelectTrigger>
                <SelectValue placeholder="Album auswählen" />
              </SelectTrigger>
              <SelectContent>
                {albums.map(album => (
                  <SelectItem key={album.id} value={album.id}>
                    {album.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAlbumDialogOpen(false)}>
              Abbrechen
            </Button>
            <Button onClick={handleAddToAlbum}>
              Hinzufügen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Visibility Change Popover */}
      <Popover open={isVisibilityOpen} onOpenChange={setIsVisibilityOpen}>
        <PopoverTrigger asChild>
          <div className="hidden">Trigger</div>
        </PopoverTrigger>
        <PopoverContent className="w-80">
          <div className="space-y-4">
            <h4 className="font-medium">Sichtbarkeit ändern</h4>
            <p className="text-sm text-ducati-gray-dark">
              Wähle die Sichtbarkeit für {selectedImages.length} ausgewählte Bild{selectedImages.length !== 1 ? 'er' : ''}.
            </p>
            
            <RadioGroup 
              value={selectedVisibility} 
              onValueChange={(value: "members" | "public") => setSelectedVisibility(value)}
              className="space-y-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="members" id="visibility-members" />
                <Label htmlFor="visibility-members" className="font-normal cursor-pointer">
                  Nur für Mitglieder sichtbar
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="public" id="visibility-public" />
                <Label htmlFor="visibility-public" className="font-normal cursor-pointer">
                  Öffentlich in Galerie anzeigen
                </Label>
              </div>
            </RadioGroup>
            
            <div className="flex justify-end space-x-2 pt-2">
              <Button variant="outline" size="sm" onClick={() => setIsVisibilityOpen(false)}>
                Abbrechen
              </Button>
              <Button size="sm" onClick={handleChangeVisibility}>
                Ändern
              </Button>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
