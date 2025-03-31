
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { AlertTriangle, Lock, FileText, Image, CalendarDays, MessageSquare, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Members = () => {
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
      <section className="relative h-[40vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1586323266355-4a3d7bcd8e2a?q=80&w=2574&auto=format&fit=crop')", 
            backgroundPosition: "center" 
          }}
        ></div>
        <div className="container-custom h-full relative z-20 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
            Mitgliederbereich
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Willkommen zurück, {userEmail}
          </p>
        </div>
      </section>
      
      {/* Members Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="bg-ducati-gray-light p-6 rounded-lg mb-8 shadow-sm border border-ducati-gray-medium/20">
            <div className="flex items-center gap-3 text-ducati-black">
              <AlertTriangle className="h-5 w-5 text-yellow-600" />
              <p className="font-medium">
                Dieser Bereich ist noch im Aufbau. Bald findest du hier exklusive Inhalte für Mitglieder.
              </p>
            </div>
          </div>
          
          <h2 className="section-title">Exklusive Inhalte</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden group">
              <div className="h-40 bg-ducati-red flex items-center justify-center">
                <FileText className="h-16 w-16 text-white" />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Technische Dokumente</h3>
                <p className="text-ducati-gray-dark mb-4">
                  Werkstatthandbücher, Schaltpläne und technische Datenblätter.
                </p>
                <a href="#" className="text-ducati-red font-medium inline-flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  Demnächst verfügbar <Lock className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden group">
              <div className="h-40 bg-ducati-black flex items-center justify-center">
                <Image className="h-16 w-16 text-white" />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Exklusive Fotos & Videos</h3>
                <p className="text-ducati-gray-dark mb-4">
                  Hochauflösende Bilder und Videos von Events und Treffen.
                </p>
                <a href="#" className="text-ducati-red font-medium inline-flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  Demnächst verfügbar <Lock className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden group">
              <div className="h-40 bg-ducati-gray-dark flex items-center justify-center">
                <CalendarDays className="h-16 w-16 text-white" />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-2">Event-Kalender</h3>
                <p className="text-ducati-gray-dark mb-4">
                  Kommende Treffen, Ausfahrten und Veranstaltungen.
                </p>
                <a href="#" className="text-ducati-red font-medium inline-flex items-center opacity-0 group-hover:opacity-100 transition-opacity">
                  Demnächst verfügbar <Lock className="ml-1 h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
          
          <h2 className="section-title">Community</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden p-6">
              <div className="flex items-center mb-4">
                <MessageSquare className="h-8 w-8 text-ducati-red mr-3" />
                <h3 className="font-bold text-xl">Forum</h3>
              </div>
              <p className="text-ducati-gray-dark mb-4">
                Tausche dich mit anderen V4S-Besitzern über Technik, Tuning und Erfahrungen aus.
              </p>
              <a href="#" className="text-ducati-red font-medium inline-flex items-center">
                Demnächst verfügbar <Lock className="ml-1 h-4 w-4" />
              </a>
            </div>
            
            <div className="bg-white rounded-lg shadow-md border border-gray-100 overflow-hidden p-6">
              <div className="flex items-center mb-4">
                <Users className="h-8 w-8 text-ducati-red mr-3" />
                <h3 className="font-bold text-xl">Mitgliederliste</h3>
              </div>
              <p className="text-ducati-gray-dark mb-4">
                Finde V4S-Fahrer in deiner Nähe für gemeinsame Ausfahrten.
              </p>
              <a href="#" className="text-ducati-red font-medium inline-flex items-center">
                Demnächst verfügbar <Lock className="ml-1 h-4 w-4" />
              </a>
            </div>
          </div>
          
          <div className="text-center">
            <button 
              onClick={handleLogout}
              className="bg-ducati-black text-white px-6 py-2 rounded font-medium hover:bg-opacity-80 transition-colors"
            >
              Abmelden
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Members;
