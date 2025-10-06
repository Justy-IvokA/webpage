'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, Share2, Heart, ZoomIn, ZoomOut, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { Section, SectionHeader } from '@/components/shared/section';
import { ProgressIndicator } from '@/components/shared/progress-indicator';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { pageMetadata } from '@/lib/metadata';

// Export metadata for this page

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  title: string;
  description: string;
  category: string;
  likes: number;
}

const galleryImages: GalleryImage[] = [
  {
    id: '1',
    src: '/gallery/project1.jpg',
    alt: 'Proyecto Moderno 1',
    title: 'Diseño de Interfaz Innovadora',
    description: 'Una interfaz de usuario revolucionaria que combina estética minimalista con funcionalidad intuitiva.',
    category: 'Diseño UI/UX',
    likes: 234
  },
  {
    id: '2',
    src: '/gallery/project2.jpg',
    alt: 'Proyecto Moderno 2',
    title: 'Aplicación Móvil Progresiva',
    description: 'Desarrollo de una PWA que ofrece experiencia nativa en cualquier dispositivo.',
    category: 'Desarrollo Mobile',
    likes: 189
  },
  {
    id: '3',
    src: '/gallery/project3.jpg',
    alt: 'Proyecto Moderno 3',
    title: 'Dashboard Analítico',
    description: 'Panel de control interactivo con visualizaciones de datos en tiempo real.',
    category: 'Data Visualization',
    likes: 156
  },
  {
    id: '4',
    src: '/gallery/project4.jpg',
    alt: 'Proyecto Moderno 4',
    title: 'Plataforma E-commerce',
    description: 'Tienda online con experiencia de compra fluida y diseño responsivo.',
    category: 'E-commerce',
    likes: 298
  },
  {
    id: '5',
    src: '/gallery/project5.jpg',
    alt: 'Proyecto Moderno 5',
    title: 'Sitio Web Corporativo',
    description: 'Presencia digital elegante para una empresa líder en su sector.',
    category: 'Web Design',
    likes: 167
  },
  {
    id: '6',
    src: '/gallery/project6.jpg',
    alt: 'Proyecto Moderno 6',
    title: 'Aplicación de Gestión',
    description: 'Sistema integral para la gestión de proyectos y equipos.',
    category: 'Productividad',
    likes: 203
  }
];

const categories = ['Todas', ...Array.from(new Set(galleryImages.map(img => img.category)))];

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState('Todas');
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);
  const [likedImages, setLikedImages] = useState<Set<string>>(new Set());
  const [zoomLevel, setZoomLevel] = useState(1);

  const filteredImages = selectedCategory === 'Todas' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === selectedCategory);

  const handleShare = async (image: GalleryImage) => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: image.title,
          text: image.description,
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Enlace copiado al portapapeles');
    }
  };

  const handleDownload = (image: GalleryImage) => {
    // In a real app, this would trigger an actual download
    const link = document.createElement('a');
    link.href = image.src;
    link.download = `${image.title.toLowerCase().replace(/\s+/g, '-')}.jpg`;
    link.click();
  };

  const handleLike = (imageId: string) => {
    const newLikedImages = new Set(likedImages);
    if (newLikedImages.has(imageId)) {
      newLikedImages.delete(imageId);
    } else {
      newLikedImages.add(imageId);
    }
    setLikedImages(newLikedImages);
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setZoomLevel(prev => {
      const newZoom = direction === 'in' ? prev + 0.25 : prev - 0.25;
      return Math.max(0.5, Math.min(3, newZoom));
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <ProgressIndicator position="top" showPercentage={false} />
      <Navbar />

      {/* Hero Section */}
      <Section className="pt-32 pb-16">
        <div className="text-center max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              <span className="block">Nuestra</span>
              <span className="block bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent">
                Galería
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8">
              Explora nuestra colección de proyectos destacados y diseños innovadores
            </p>
          </motion.div>
        </div>
      </Section>

      {/* Category Filter */}
      <Section>
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <motion.div
              key={category}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                variant={selectedCategory === category ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? 'bg-brand-primary hover:bg-brand-primary/90' : ''}
              >
                {category}
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Carousel */}
        <div className="max-w-6xl mx-auto">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {filteredImages.map((image, index) => (
                <CarouselItem key={image.id} className="md:basis-1/2 lg:basis-1/3">
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="p-2"
                  >
                    <Card className="overflow-hidden group cursor-pointer hover:shadow-lg transition-shadow">
                      <CardContent className="p-0">
                        <div className="relative aspect-[4/3] overflow-hidden">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            onClick={() => setSelectedImage(image)}
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                            <motion.div
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 0, scale: 0.8 }}
                              whileHover={{ opacity: 1, scale: 1 }}
                              className="flex gap-2"
                            >
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setSelectedImage(image);
                                }}
                              >
                                <ZoomIn className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="secondary"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleLike(image.id);
                                }}
                              >
                                <Heart className={`h-4 w-4 ${likedImages.has(image.id) ? 'fill-red-500 text-red-500' : ''}`} />
                              </Button>
                            </motion.div>
                          </div>
                        </div>
                        
                        <div className="p-4">
                          <div className="flex items-start justify-between mb-2">
                            <h3 className="font-semibold text-lg">{image.title}</h3>
                            <span className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
                              {image.category}
                            </span>
                          </div>
                          <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
                            {image.description}
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Heart className={`h-4 w-4 ${likedImages.has(image.id) ? 'fill-red-500 text-red-500' : ''}`} />
                              <span>{image.likes + (likedImages.has(image.id) ? 1 : 0)}</span>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleShare(image)}
                              >
                                <Share2 className="h-4 w-4" />
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => handleDownload(image)}
                              >
                                <Download className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </Section>

      {/* Image Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
            onClick={() => {
              setSelectedImage(null);
              setZoomLevel(1);
            }}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-6xl max-h-[90vh] w-full"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
                onClick={() => {
                  setSelectedImage(null);
                  setZoomLevel(1);
                }}
              >
                ✕
              </Button>

              {/* Image */}
              <div className="relative overflow-hidden rounded-lg">
                <Image
                  src={selectedImage.src}
                  alt={selectedImage.alt}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain"
                  style={{ transform: `scale(${zoomLevel})` }}
                />
              </div>

              {/* Controls */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleZoom('out')}
                  disabled={zoomLevel <= 0.5}
                >
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="text-white text-sm flex items-center px-2">
                  {Math.round(zoomLevel * 100)}%
                </span>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => handleZoom('in')}
                  disabled={zoomLevel >= 3}
                >
                  <ZoomIn className="h-4 w-4" />
                </Button>
              </div>

              {/* Info Panel */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-sm rounded-lg p-4 text-white">
                <h3 className="text-xl font-semibold mb-2">{selectedImage.title}</h3>
                <p className="text-sm opacity-90 mb-3">{selectedImage.description}</p>
                <div className="flex items-center justify-between">
                  <span className="text-sm bg-white/20 px-2 py-1 rounded">
                    {selectedImage.category}
                  </span>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleLike(selectedImage.id)}
                      className="text-white hover:bg-white/20"
                    >
                      <Heart className={`h-4 w-4 ${likedImages.has(selectedImage.id) ? 'fill-red-500 text-red-500' : ''}`} />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleShare(selectedImage)}
                      className="text-white hover:bg-white/20"
                    >
                      <Share2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleDownload(selectedImage)}
                      className="text-white hover:bg-white/20"
                    >
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* CTA Section */}
      <Section background="gradient">
        <div className="text-center">
          <SectionHeader
            title="¿Te Gusta Lo Que Ves?"
            subtitle="Trabajemos Juntos"
            description="Si te inspira nuestro trabajo, imagine lo que podemos crear para ti."
            align="center"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Button
              size="lg"
              className="bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-primary/90 hover:to-brand-secondary/90 text-white text-lg px-8 py-4"
              onClick={() => {
                window.location.href = '/registro';
              }}
            >
              Iniciar Proyecto
            </Button>
            
            <Button
              variant="outline"
              size="lg"
              className="border-foreground text-foreground hover:bg-foreground hover:text-background text-lg px-8 py-4"
              onClick={() => {
                window.location.href = '/manifiesto';
              }}
            >
              Conocer Más
            </Button>
          </motion.div>
        </div>
      </Section>

      <Footer />
    </div>
  );
}