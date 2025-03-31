
import React, { useState, useEffect } from "react";
import { FolderPlus, Pencil, Trash2, AlertTriangle, Image, MoreHorizontal } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Album = {
  id: string;
  name: string;
  createdAt: string;
  imageCount: number;
};

export const AlbumManager = () => {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [newAlbumName, setNewAlbumName] = useState("");
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isRenameDialogOpen, setIsRenameDialogOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState<Album | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const { toast } = useToast();

  // Load albums from sessionStorage on component mount
  useEffect(() => {
    const storedAlbums = sessionStorage.getItem("userAlbums");
    if (storedAlbums) {
      try {
        setAlbums(JSON.parse(storedAlbums));
      } catch (e) {
        console.error("Failed to parse albums from sessionStorage", e);
      }
    }
  }, []);

  // Save albums to sessionStorage whenever they change
  useEffect(() => {
    sessionStorage.setItem("userAlbums", JSON.stringify(albums));
  }, [albums]);

  const handleCreateAlbum = () => {
    if (!newAlbumName.trim()) {
      toast({
        title: "Fehler",
        description: "Bitte gib einen Namen für das Album ein.",
        variant: "destructive",
      });
      return;
    }

    const newAlbum: Album = {
      id: Math.random().toString(36).substring(2, 9),
      name: newAlbumName.trim(),
      createdAt: new Date().toISOString(),
      imageCount: 0,
    };

    setAlbums(prev => [...prev, newAlbum]);
    setNewAlbumName("");
    setIsCreateDialogOpen(false);

    toast({
      title: "Album erstellt",
      description: `Das Album "${newAlbum.name}" wurde erfolgreich erstellt.`,
    });
  };

  const openDeleteDialog = (album: Album) => {
    setSelectedAlbum(album);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteAlbum = () => {
    if (!selectedAlbum) return;

    setAlbums(prev => prev.filter(album => album.id !== selectedAlbum.id));
    setIsDeleteDialogOpen(false);
    
    toast({
      title: "Album gelöscht",
      description: `Das Album "${selectedAlbum.name}" wurde erfolgreich gelöscht.`,
    });
  };

  const openRenameDialog = (album: Album) => {
    setSelectedAlbum(album);
    setRenameValue(album.name);
    setIsRenameDialogOpen(true);
  };

  const handleRenameAlbum = () => {
    if (!selectedAlbum || !renameValue.trim()) return;

    setAlbums(prev =>
      prev.map(album =>
        album.id === selectedAlbum.id
          ? { ...album, name: renameValue.trim() }
          : album
      )
    );
    
    setIsRenameDialogOpen(false);
    
    toast({
      title: "Album umbenannt",
      description: `Das Album wurde erfolgreich in "${renameValue.trim()}" umbenannt.`,
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold">Meine Alben</h3>
        <Button onClick={() => setIsCreateDialogOpen(true)}>
          <FolderPlus className="mr-2 h-4 w-4" />
          Neues Album erstellen
        </Button>
      </div>

      {albums.length === 0 ? (
        <div className="text-center py-12 border-2 border-dashed rounded-lg border-ducati-gray-medium/30">
          <Image className="h-12 w-12 mx-auto text-ducati-gray-medium mb-3" />
          <h4 className="text-lg font-medium mb-2">Keine Alben vorhanden</h4>
          <p className="text-ducati-gray-dark mb-4 max-w-md mx-auto">
            Du hast noch keine Alben erstellt. Erstelle ein neues Album, um deine Bilder zu organisieren.
          </p>
          <Button variant="outline" onClick={() => setIsCreateDialogOpen(true)}>
            <FolderPlus className="mr-2 h-4 w-4" />
            Album erstellen
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {albums.map(album => (
            <div key={album.id} className="border rounded-lg overflow-hidden bg-white hover:shadow-md transition-shadow">
              <div className="h-40 bg-ducati-gray-light flex items-center justify-center">
                {album.imageCount > 0 ? (
                  <div className="text-center">
                    <span className="text-2xl font-semibold">{album.imageCount}</span>
                    <p className="text-sm text-ducati-gray-dark">Bilder</p>
                  </div>
                ) : (
                  <AlertTriangle className="h-10 w-10 text-ducati-gray-medium/50" />
                )}
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h4 className="font-medium text-lg truncate">{album.name}</h4>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => openRenameDialog(album)}>
                        <Pencil className="mr-2 h-4 w-4" />
                        Umbenennen
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => openDeleteDialog(album)}
                        className="text-red-500 focus:text-red-500"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Löschen
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                
                <p className="text-sm text-ducati-gray-medium mt-1">
                  Erstellt am {new Date(album.createdAt).toLocaleDateString('de-DE')}
                </p>
                
                <div className="mt-3 text-sm text-ducati-gray-dark">
                  {album.imageCount === 0 
                    ? "Keine Bilder vorhanden" 
                    : `${album.imageCount} Bild${album.imageCount !== 1 ? 'er' : ''}`
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create Album Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Neues Album erstellen</DialogTitle>
            <DialogDescription>
              Gib einen Namen für dein neues Album ein.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Input
              placeholder="Album-Name"
              value={newAlbumName}
              onChange={(e) => setNewAlbumName(e.target.value)}
              autoFocus
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Abbrechen
            </Button>
            <Button onClick={handleCreateAlbum}>
              Album erstellen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Album Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Album löschen</DialogTitle>
            <DialogDescription>
              Möchtest du das Album "{selectedAlbum?.name}" wirklich löschen? 
              Die Bilder darin werden nicht gelöscht.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Abbrechen
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDeleteAlbum}
            >
              Löschen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Rename Album Dialog */}
      <Dialog open={isRenameDialogOpen} onOpenChange={setIsRenameDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Album umbenennen</DialogTitle>
            <DialogDescription>
              Gib einen neuen Namen für das Album ein.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <Input
              placeholder="Album-Name"
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              autoFocus
            />
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsRenameDialogOpen(false)}>
              Abbrechen
            </Button>
            <Button onClick={handleRenameAlbum}>
              Umbenennen
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
