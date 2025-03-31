
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { useToast } from "@/hooks/use-toast";
import {
  Tabs, TabsContent, TabsList, TabsTrigger,
} from "@/components/ui/tabs";
import { ImageUpload } from "@/components/dashboard/ImageUpload";
import { AlbumManager } from "@/components/dashboard/AlbumManager";
import { ImageGallery } from "@/components/dashboard/ImageGallery";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Check if user is logged in
    const loggedIn = sessionStorage.getItem("isLoggedIn") === "true";
    const email = sessionStorage.getItem("userEmail") || "";
    
    setIsAuthenticated(loggedIn);
    setUserEmail(email);
    setLoading(false);
    
    if (!loggedIn) {
      toast({
        title: "Zugriff verweigert",
        description: "Bitte melde dich an, um auf den Mitgliederbereich zuzugreifen.",
        variant: "destructive",
      });
      navigate("/login");
    }
  }, [navigate, toast]);

  const handleLogout = () => {
    sessionStorage.removeItem("isLoggedIn");
    sessionStorage.removeItem("userEmail");
    
    toast({
      title: "Abgemeldet",
      description: "Du wurdest erfolgreich abgemeldet.",
    });
    
    navigate("/login");
  };

  if (loading) {
    return (
      <Layout>
        <div className="min-h-[50vh] flex items-center justify-center">
          <div className="animate-pulse text-ducati-gray-medium">Laden...</div>
        </div>
      </Layout>
    );
  }

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[30vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1586323266355-4a3d7bcd8e2a?q=80&w=2574&auto=format&fit=crop')", 
            backgroundPosition: "center" 
          }}
        ></div>
        <div className="container mx-auto px-4 h-full relative z-20 flex flex-col justify-center">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 animate-fade-in">
                Mitgliederbereich
              </h1>
              <p className="text-lg text-white/90 max-w-2xl animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Willkommen zurück, {userEmail}
              </p>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline"
              className="bg-ducati-black/40 text-white border-white/30 hover:bg-ducati-black/60"
            >
              <LogOut className="mr-2 h-4 w-4" />
              Abmelden
            </Button>
          </div>
        </div>
      </section>
      
      {/* Dashboard Content */}
      <section className="py-8 bg-ducati-gray-light">
        <div className="container mx-auto px-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-6">
              <h2 className="text-2xl font-semibold mb-2 text-ducati-black">Deine Bilder-Verwaltung</h2>
              <p className="text-ducati-gray-dark">
                Verwalte hier deine Bilder und Alben. Lade neue Bilder hoch oder organisiere deine bestehenden Aufnahmen.
              </p>
            </div>
            
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="w-full mb-6 bg-ducati-gray-light">
                <TabsTrigger value="upload" className="flex-1">Bilder-Upload</TabsTrigger>
                <TabsTrigger value="albums" className="flex-1">Meine Alben</TabsTrigger>
                <TabsTrigger value="images" className="flex-1">Meine Bilder</TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="mt-0">
                <ImageUpload />
              </TabsContent>
              
              <TabsContent value="albums" className="mt-0">
                <AlbumManager />
              </TabsContent>
              
              <TabsContent value="images" className="mt-0">
                <ImageGallery />
              </TabsContent>
            </Tabs>
            
            <div className="mt-8 p-4 bg-ducati-gray-light/50 rounded-md border border-ducati-gray-light text-sm text-ducati-gray-dark">
              <strong>Hinweis:</strong> Diese Implementierung simuliert die Bild-Upload-, Speicher- und Klassifizierungsfunktionen im Browser. 
              Ein tatsächlicher Bild-Upload, die dauerhafte Speicherung, Klassifizierung und Album-Verwaltung würde eine serverseitige Logik (Backend) 
              und eine Datenbank erfordern. Bilder werden aktuell nur temporär im Browser-Speicher abgelegt und gehen beim Aktualisieren der Seite verloren.
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Dashboard;
