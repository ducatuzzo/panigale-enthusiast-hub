
import React, { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  category: string;
}

interface LightboxGalleryProps {
  images: GalleryImage[];
}

const LightboxGallery: React.FC<LightboxGalleryProps> = ({ images }) => {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const categories = ["all", ...Array.from(new Set(images.map(img => img.category)))];
  
  const filteredImages = activeCategory === "all" 
    ? images 
    : images.filter(img => img.category === activeCategory);

  const openLightbox = (image: GalleryImage) => {
    document.body.style.overflow = "hidden";
    setSelectedImage(image);
  };

  const closeLightbox = () => {
    document.body.style.overflow = "auto";
    setSelectedImage(null);
  };

  const navigateImage = (direction: "prev" | "next") => {
    if (!selectedImage) return;
    
    const currentIndex = filteredImages.findIndex(img => img.id === selectedImage.id);
    let newIndex;
    
    if (direction === "prev") {
      newIndex = currentIndex > 0 ? currentIndex - 1 : filteredImages.length - 1;
    } else {
      newIndex = currentIndex < filteredImages.length - 1 ? currentIndex + 1 : 0;
    }
    
    setSelectedImage(filteredImages[newIndex]);
  };

  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
        {categories.map(category => (
          <button 
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 rounded-full text-sm md:text-base transition-colors ${
              activeCategory === category 
                ? "bg-ducati-red text-white" 
                : "bg-ducati-gray-light text-ducati-gray-dark hover:bg-ducati-gray-medium hover:text-white"
            }`}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image) => (
          <div 
            key={image.id}
            className="overflow-hidden rounded-lg shadow-md cursor-pointer group"
            onClick={() => openLightbox(image)}
          >
            <div className="aspect-w-3 aspect-h-2 relative">
              <img 
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
                <p className="text-white font-medium">{image.alt}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <button 
            className="absolute top-4 right-4 text-white hover:text-ducati-red transition-colors z-10"
            onClick={closeLightbox}
          >
            <X className="h-8 w-8" />
          </button>
          
          <button 
            className="absolute left-4 md:left-8 text-white hover:text-ducati-red transition-colors z-10"
            onClick={() => navigateImage("prev")}
          >
            <ChevronLeft className="h-10 w-10" />
          </button>
          
          <div className="max-w-5xl max-h-[80vh] p-4">
            <img 
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="max-h-full max-w-full object-contain mx-auto"
            />
            <div className="absolute bottom-4 left-0 right-0 text-center text-white">
              <p className="font-medium text-lg">{selectedImage.alt}</p>
            </div>
          </div>
          
          <button 
            className="absolute right-4 md:right-8 text-white hover:text-ducati-red transition-colors z-10"
            onClick={() => navigateImage("next")}
          >
            <ChevronRight className="h-10 w-10" />
          </button>
        </div>
      )}
    </div>
  );
};

export default LightboxGallery;
