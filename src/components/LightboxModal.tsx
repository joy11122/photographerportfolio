import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, 
  Download, Share2, Info, Grid3X3
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
}

interface LightboxModalProps {
  images: LightboxImage[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
  onNavigate?: (index: number) => void;
}

export function LightboxModal({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
  onNavigate,
}: LightboxModalProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [isZoomed, setIsZoomed] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showThumbnails, setShowThumbnails] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const currentImage = images[currentIndex];

  // Reset state when opening
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setIsZoomed(false);
      setShowInfo(false);
      setShowThumbnails(false);
      setIsLoading(true);
    }
  }, [isOpen, initialIndex]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          onClose();
          break;
        case 'ArrowLeft':
          goToPrevious();
          break;
        case 'ArrowRight':
          goToNext();
          break;
        case ' ':
          e.preventDefault();
          toggleZoom();
          break;
        case 'i':
          setShowInfo((prev) => !prev);
          break;
        case 't':
          setShowThumbnails((prev) => !prev);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, currentIndex, images.length]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const goToNext = useCallback(() => {
    setIsLoading(true);
    setIsZoomed(false);
    const newIndex = (currentIndex + 1) % images.length;
    setCurrentIndex(newIndex);
    onNavigate?.(newIndex);
  }, [currentIndex, images.length, onNavigate]);

  const goToPrevious = useCallback(() => {
    setIsLoading(true);
    setIsZoomed(false);
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    setCurrentIndex(newIndex);
    onNavigate?.(newIndex);
  }, [currentIndex, images.length, onNavigate]);

  const goToIndex = useCallback((index: number) => {
    setIsLoading(true);
    setIsZoomed(false);
    setCurrentIndex(index);
    onNavigate?.(index);
  }, [onNavigate]);

  const toggleZoom = useCallback(() => {
    setIsZoomed((prev) => !prev);
  }, []);

  const handleImageLoad = useCallback(() => {
    setIsLoading(false);
  }, []);

  if (!isOpen || !currentImage) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center gap-4">
              <span className="text-white/80 text-sm">
                {currentIndex + 1} / {images.length}
              </span>
              {currentImage.caption && (
                <span className="text-white/60 text-sm hidden sm:block truncate max-w-xs">
                  {currentImage.caption}
                </span>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white/80 hover:text-white hover:bg-white/10"
                onClick={() => setShowInfo(!showInfo)}
                aria-label="Toggle info"
              >
                <Info className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/80 hover:text-white hover:bg-white/10"
                onClick={() => setShowThumbnails(!showThumbnails)}
                aria-label="Toggle thumbnails"
              >
                <Grid3X3 className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/80 hover:text-white hover:bg-white/10"
                onClick={toggleZoom}
                aria-label={isZoomed ? 'Zoom out' : 'Zoom in'}
              >
                {isZoomed ? <ZoomOut className="w-5 h-5" /> : <ZoomIn className="w-5 h-5" />}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="text-white/80 hover:text-white hover:bg-white/10"
                onClick={onClose}
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </Button>
            </div>
          </motion.div>

          {/* Main Image Area */}
          <div 
            className="relative h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Navigation Arrows */}
            {images.length > 1 && (
              <>
                <button
                  onClick={goToPrevious}
                  className="absolute left-4 z-10 p-3 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  onClick={goToNext}
                  className="absolute right-4 z-10 p-3 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Image */}
            <motion.div
              className="relative max-w-[90vw] max-h-[85vh] overflow-hidden"
              initial={false}
              animate={{
                scale: isZoomed ? 1.5 : 1,
              }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-8 h-8 border-2 border-gold-500 border-t-transparent rounded-full animate-spin" />
                </div>
              )}
              <img
                src={currentImage.src}
                alt={currentImage.alt}
                className="max-w-full max-h-[85vh] object-contain"
                onLoad={handleImageLoad}
                draggable={false}
              />
            </motion.div>

            {/* Image Counter Dots */}
            {images.length > 1 && (
              <div className="absolute bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentIndex 
                        ? 'bg-gold-500 w-6' 
                        : 'bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Go to image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Info Panel */}
          <AnimatePresence>
            {showInfo && currentImage.caption && (
              <motion.div
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                className="absolute right-0 top-16 bottom-0 w-80 bg-black/90 backdrop-blur-md border-l border-white/10 p-6 overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="font-display text-xl text-white mb-4">Image Details</h3>
                <div className="space-y-4">
                  <div>
                    <span className="text-white/50 text-sm">Caption</span>
                    <p className="text-white mt-1">{currentImage.caption}</p>
                  </div>
                  <div>
                    <span className="text-white/50 text-sm">File Name</span>
                    <p className="text-white/80 mt-1 font-mono text-sm">
                      {currentImage.src.split('/').pop()?.split('?')[0]}
                    </p>
                  </div>
                  <div>
                    <span className="text-white/50 text-sm">Dimensions</span>
                    <p className="text-white/80 mt-1">Original size</p>
                  </div>
                </div>
                <div className="mt-8 flex gap-2">
                  <Button variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
                    <Download className="w-4 h-4 mr-2" />
                    Download
                  </Button>
                  <Button variant="outline" className="flex-1 border-white/20 text-white hover:bg-white/10">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Thumbnails Panel */}
          <AnimatePresence>
            {showThumbnails && (
              <motion.div
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 100 }}
                className="absolute bottom-0 left-0 right-0 bg-black/90 backdrop-blur-md border-t border-white/10 p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
                  {images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => goToIndex(index)}
                      className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                        index === currentIndex 
                          ? 'ring-2 ring-gold-500 ring-offset-2 ring-offset-black' 
                          : 'opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={image.src}
                        alt={image.alt}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Keyboard Shortcuts Hint */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute bottom-4 left-4 text-white/40 text-xs hidden lg:block"
          >
            <div className="flex items-center gap-4">
              <span><kbd className="px-2 py-1 bg-white/10 rounded">←</kbd> <kbd className="px-2 py-1 bg-white/10 rounded">→</kbd> Navigate</span>
              <span><kbd className="px-2 py-1 bg-white/10 rounded">Space</kbd> Zoom</span>
              <span><kbd className="px-2 py-1 bg-white/10 rounded">I</kbd> Info</span>
              <span><kbd className="px-2 py-1 bg-white/10 rounded">T</kbd> Thumbnails</span>
              <span><kbd className="px-2 py-1 bg-white/10 rounded">Esc</kbd> Close</span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// Hook for using lightbox
export function useLightbox() {
  const [isOpen, setIsOpen] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const open = useCallback((index: number = 0) => {
    setCurrentIndex(index);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
  }, []);

  return {
    isOpen,
    currentIndex,
    open,
    close,
  };
}

export default LightboxModal;
