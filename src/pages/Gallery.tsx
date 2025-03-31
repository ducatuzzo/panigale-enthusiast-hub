
import React from "react";
import Layout from "@/components/layout/Layout";
import LightboxGallery from "@/components/gallery/LightboxGallery";

const Gallery = () => {
  // Sample gallery images
  const galleryImages = [
    {
      id: 1,
      src: "https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2670&auto=format&fit=crop",
      alt: "Panigale V4S - Frontansicht",
      category: "studio"
    },
    {
      id: 2,
      src: "https://images.unsplash.com/photo-1591637333472-2a4a117ab20f?q=80&w=2671&auto=format&fit=crop",
      alt: "Panigale V4S - Seitenansicht",
      category: "studio"
    },
    {
      id: 3,
      src: "https://images.unsplash.com/photo-1622185135505-2d795005617d?q=80&w=2574&auto=format&fit=crop",
      alt: "Panigale V4S - Cockpit",
      category: "details"
    },
    {
      id: 4,
      src: "https://images.unsplash.com/photo-1580310614729-ccd69652491d?q=80&w=2670&auto=format&fit=crop",
      alt: "Panigale V4S - Auf der Straße",
      category: "riding"
    },
    {
      id: 5,
      src: "https://images.unsplash.com/photo-1589285871345-146bc9a58c34?q=80&w=2670&auto=format&fit=crop",
      alt: "Panigale V4S - Rückansicht",
      category: "studio"
    },
    {
      id: 6,
      src: "https://images.unsplash.com/photo-1558981285-6f0c94958bb6?q=80&w=2670&auto=format&fit=crop",
      alt: "Panigale V4S - Kurvenfahrt",
      category: "riding"
    },
    {
      id: 7,
      src: "https://images.unsplash.com/photo-1560009571-bbf009ae0bad?q=80&w=2574&auto=format&fit=crop",
      alt: "Panigale V4S - Motor Detail",
      category: "details"
    },
    {
      id: 8,
      src: "https://images.unsplash.com/photo-1611241443322-78b64c9b6721?q=80&w=2670&auto=format&fit=crop",
      alt: "Panigale V4S - Bremsen",
      category: "details"
    },
    {
      id: 9,
      src: "https://images.unsplash.com/photo-1619771914272-e3c1ba17ba4d?q=80&w=2574&auto=format&fit=crop",
      alt: "Panigale V4S - In der Werkstatt",
      category: "lifestyle"
    },
    {
      id: 10,
      src: "https://images.unsplash.com/photo-1599819811279-d5ad9cccf838?q=80&w=2670&auto=format&fit=crop",
      alt: "Panigale V4S - Nachtfahrt",
      category: "riding"
    },
    {
      id: 11,
      src: "https://images.unsplash.com/photo-1614177684386-7c57d768efac?q=80&w=2574&auto=format&fit=crop",
      alt: "Panigale V4S - Helme",
      category: "lifestyle"
    },
    {
      id: 12,
      src: "https://images.unsplash.com/photo-1586323266355-4a3d7bcd8e2a?q=80&w=2574&auto=format&fit=crop",
      alt: "Panigale V4S - Rennstrecke",
      category: "racing"
    }
  ];

  return (
    <Layout>
      {/* Hero Section */}
      <section className="relative h-[40vh] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/20 z-10"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1580310614729-ccd69652491d?q=80&w=2670&auto=format&fit=crop')", 
            backgroundPosition: "center" 
          }}
        ></div>
        <div className="container-custom h-full relative z-20 flex flex-col justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
            Galerie
          </h1>
          <p className="text-xl text-white/90 max-w-2xl mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            Die Schönheit der Ducati Panigale V4S in Bildern
          </p>
        </div>
      </section>
      
      {/* Gallery Section */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="section-title text-center mb-2">Unsere Bildsammlung</h2>
          <p className="text-center text-ducati-gray-dark max-w-3xl mx-auto mb-10">
            Entdecke die Ducati Panigale V4S aus verschiedenen Perspektiven. 
            Klicke auf ein Bild, um es in voller Größe anzuzeigen.
          </p>
          
          <LightboxGallery images={galleryImages} />
        </div>
      </section>
    </Layout>
  );
};

export default Gallery;
