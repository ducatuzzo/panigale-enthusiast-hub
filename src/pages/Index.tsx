
import React from "react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { ChevronRight, Zap, Gauge, Weight, Camera } from "lucide-react";

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1591637333472-2a4a117ab20f?q=80&w=2671&auto=format&fit=crop')", 
            backgroundPosition: "center 25%" 
          }}
        ></div>
        <div className="container-custom h-full relative z-20 flex flex-col justify-center">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 animate-fade-in">
            Die Essenz der <span className="text-ducati-red">Geschwindigkeit</span>
          </h1>
          <p className="text-xl md:text-2xl text-white/90 max-w-2xl mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Willkommen in der Welt der Ducati Panigale V4S - 
            wo Leistung auf Präzision trifft.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
            <Link to="/gallery" className="btn-primary">
              Galerie entdecken
            </Link>
            <Link to="/about" className="bg-white text-ducati-black px-6 py-2 rounded font-medium hover:bg-opacity-90 transition-all">
              Mehr erfahren
            </Link>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 z-20 flex justify-center animate-bounce">
          <ChevronRight className="h-10 w-10 text-white rotate-90" />
        </div>
      </section>
      
      {/* Motorcycle Overview */}
      <section className="section-padding bg-ducati-gray-light">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">Die Panigale V4S</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2670&auto=format&fit=crop" 
                alt="Ducati Panigale V4S" 
                className="rounded-lg shadow-lg w-full h-auto"
              />
            </div>
            
            <div>
              <h3 className="section-subtitle">Technische Meisterleistung</h3>
              <p className="mb-6 text-ducati-gray-dark">
                Die Ducati Panigale V4S verkörpert italienische Ingenieurskunst in ihrer reinsten Form. 
                Mit dem von der MotoGP inspirierten V4-Motor bietet sie eine unvergleichliche Performance auf der Straße und der Rennstrecke.
              </p>
              
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="bg-white p-4 rounded-lg shadow flex items-center">
                  <Zap className="h-8 w-8 text-ducati-red mr-3" />
                  <div>
                    <h4 className="font-semibold">Leistung</h4>
                    <p className="text-ducati-gray-dark">214 PS</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow flex items-center">
                  <Gauge className="h-8 w-8 text-ducati-red mr-3" />
                  <div>
                    <h4 className="font-semibold">Hubraum</h4>
                    <p className="text-ducati-gray-dark">1.103 cm³</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow flex items-center">
                  <Weight className="h-8 w-8 text-ducati-red mr-3" />
                  <div>
                    <h4 className="font-semibold">Gewicht</h4>
                    <p className="text-ducati-gray-dark">195 kg</p>
                  </div>
                </div>
                
                <div className="bg-white p-4 rounded-lg shadow flex items-center">
                  <div className="h-8 w-8 text-ducati-red mr-3 flex items-center justify-center">
                    Nm
                  </div>
                  <div>
                    <h4 className="font-semibold">Drehmoment</h4>
                    <p className="text-ducati-gray-dark">124 Nm</p>
                  </div>
                </div>
              </div>
              
              <Link to="/about" className="btn-primary inline-flex items-center">
                Alle Details <ChevronRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Gallery Preview */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="section-title text-center">Galerie Vorschau</h2>
          <p className="text-center text-ducati-gray-dark max-w-3xl mx-auto mb-10">
            Entdecken Sie die Schönheit und Kraft der Ducati Panigale V4S durch unsere kuratierte Fotosammlung.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="overflow-hidden rounded-lg shadow-md group relative">
              <img 
                src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2670&auto=format&fit=crop" 
                alt="Ducati Panigale V4S Front View" 
                className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <h3 className="text-white font-semibold">Frontansicht</h3>
              </div>
            </div>
            
            <div className="overflow-hidden rounded-lg shadow-md group relative">
              <img 
                src="https://images.unsplash.com/photo-1591637333472-2a4a117ab20f?q=80&w=2671&auto=format&fit=crop" 
                alt="Ducati Panigale V4S Side View" 
                className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <h3 className="text-white font-semibold">Seitenansicht</h3>
              </div>
            </div>
            
            <div className="overflow-hidden rounded-lg shadow-md group relative">
              <img 
                src="https://images.unsplash.com/photo-1622185135505-2d795005617d?q=80&w=2574&auto=format&fit=crop" 
                alt="Ducati Panigale V4S Detail" 
                className="w-full h-64 object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <h3 className="text-white font-semibold">Details</h3>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <Link to="/gallery" className="btn-primary inline-flex items-center">
              <Camera className="mr-2 h-5 w-5" />
              Komplette Galerie ansehen
            </Link>
          </div>
        </div>
      </section>
      
      {/* Members Teaser */}
      <section className="section-padding bg-ducati-black text-white">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Werde Teil unserer Community</h2>
              <p className="mb-6 text-gray-300">
                Exklusive Inhalte, Events und der Austausch mit anderen Panigale V4S Enthusiasten warten auf dich. 
                Registriere dich noch heute und erlebe das volle Potenzial von V4S.CH.
              </p>
              <Link to="/login" className="bg-ducati-red hover:bg-ducati-red/90 text-white px-6 py-2 rounded inline-block transition-colors">
                Jetzt anmelden
              </Link>
            </div>
            
            <div className="bg-ducati-gray-dark/20 p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Als Mitglied erhältst du Zugang zu:</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-ducati-red mr-2 mt-0.5" />
                  <span>Exklusive Fotogalerien & Videos</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-ducati-red mr-2 mt-0.5" />
                  <span>Technische Dokumentationen</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-ducati-red mr-2 mt-0.5" />
                  <span>Community-Forum & Diskussionen</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-ducati-red mr-2 mt-0.5" />
                  <span>Informationen zu Events & Treffen</span>
                </li>
                <li className="flex items-start">
                  <ChevronRight className="h-5 w-5 text-ducati-red mr-2 mt-0.5" />
                  <span>Austausch mit Gleichgesinnten</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
