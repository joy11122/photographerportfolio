import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Play, Pause, Camera, Award, Users, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeroSlide {
  id: number;
  image: string;
  video?: string;
  title: string;
  subtitle: string;
  location: string;
}

interface Stat {
  icon: React.ElementType;
  value: number;
  suffix: string;
  label: string;
}

const slides: HeroSlide[] = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1920&q=80',
    title: 'Capturing Moments',
    subtitle: 'That Last Forever',
    location: 'Tuscany, Italy',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&q=80',
    title: 'Where Art',
    subtitle: 'Meets Emotion',
    location: 'Milan, Italy',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=1920&q=80',
    title: 'Timeless',
    subtitle: 'Elegance',
    location: 'Malibu, California',
  },
];

const stats: Stat[] = [
  { icon: Camera, value: 487, suffix: '+', label: 'Projects' },
  { icon: Users, value: 356, suffix: '+', label: 'Happy Clients' },
  { icon: Award, value: 23, suffix: '', label: 'Awards' },
  { icon: Heart, value: 12, suffix: 'Y', label: 'Experience' },
];

function AnimatedCounter({ value, suffix, isVisible }: { value: number; suffix: string; isVisible: boolean }) {
  const [count, setCount] = useState(0);
  const countRef = useRef(0);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    if (!isVisible) return;
    
    const duration = 2000;
    const startTime = performance.now();
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const currentValue = Math.floor(easeOutQuart * value);
      
      if (currentValue !== countRef.current) {
        countRef.current = currentValue;
        setCount(currentValue);
      }
      
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };
    
    rafRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [value, isVisible]);

  return (
    <span className="tabular-nums">
      {count}{suffix}
    </span>
  );
}

export function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });
  
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Auto-advance slides
  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    
    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  // Initial load animation
  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Stats intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const goToSlide = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const toggleAutoPlay = useCallback(() => {
    setIsAutoPlaying((prev) => !prev);
  }, []);

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* Background Images with Parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.43, 0.13, 0.23, 0.96] }}
            className="absolute inset-0"
          >
            <div 
              className="absolute inset-0 bg-cover bg-center bg-no-repeat"
              style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
            />
            {/* Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/70" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-transparent" />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Content */}
      <motion.div 
        className="relative z-10 h-full flex flex-col justify-center section-padding"
        style={{ opacity }}
      >
        <div className="container-wide mx-auto">
          <div className="max-w-3xl">
            {/* Location Badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`loc-${currentSlide}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="mb-6"
              >
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white/90 text-sm">
                  <span className="w-2 h-2 bg-gold-400 rounded-full animate-pulse" />
                  {slides[currentSlide].location}
                </span>
              </motion.div>
            </AnimatePresence>

            {/* Main Title */}
            <AnimatePresence mode="wait">
              <motion.div
                key={`title-${currentSlide}`}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -40 }}
                transition={{ duration: 0.7, delay: 0.1 }}
              >
                <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-white leading-[0.9] mb-2">
                  {slides[currentSlide].title}
                </h1>
                <h2 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gradient-gold leading-[0.9] italic">
                  {slides[currentSlide].subtitle}
                </h2>
              </motion.div>
            </AnimatePresence>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-8 text-lg md:text-xl text-white/80 max-w-xl leading-relaxed"
            >
              Award-winning photography that captures the essence of your most precious moments. 
              Based in New York, available worldwide.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Button 
                size="lg" 
                className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-6 text-base font-medium group"
              >
                View Portfolio
                <ChevronRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10 px-8 py-6 text-base backdrop-blur-sm"
              >
                Book a Session
              </Button>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Slide Controls */}
      <motion.div 
        className="absolute bottom-32 left-0 right-0 z-20 section-padding"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
      >
        <div className="container-wide mx-auto flex items-center justify-between">
          {/* Slide Indicators */}
          <div className="flex items-center gap-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`group relative h-1 rounded-full overflow-hidden transition-all duration-300 ${
                  index === currentSlide ? 'w-12 bg-gold-500' : 'w-6 bg-white/30 hover:bg-white/50'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              >
                {index === currentSlide && isAutoPlaying && (
                  <motion.div
                    className="absolute inset-0 bg-white/30"
                    initial={{ scaleX: 0, originX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 6, ease: 'linear' }}
                    key={`progress-${currentSlide}`}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleAutoPlay}
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
              aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isAutoPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </button>
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 transition-colors"
              aria-label="Next slide"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </motion.div>

      {/* Stats Bar */}
      <motion.div
        ref={statsRef}
        className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: isLoaded ? 1 : 0, y: isLoaded ? 0 : 40 }}
        transition={{ duration: 0.6, delay: 1 }}
      >
        <div className="section-padding py-8">
          <div className="container-wide mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: statsVisible ? 1 : 0, y: statsVisible ? 0 : 20 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="text-center md:text-left"
                >
                  <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                    <div className="p-2 rounded-lg bg-gold-500/20">
                      <stat.icon className="w-5 h-5 text-gold-400" />
                    </div>
                    <span className="text-3xl md:text-4xl font-display font-bold text-white">
                      <AnimatedCounter 
                        value={stat.value} 
                        suffix={stat.suffix} 
                        isVisible={statsVisible} 
                      />
                    </span>
                  </div>
                  <p className="text-white/60 text-sm uppercase tracking-wider">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: isLoaded ? 1 : 0 }}
        transition={{ duration: 0.6, delay: 1.2 }}
      >
        <motion.div
          className="flex flex-col items-center gap-2 text-white/50"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/50 to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
}

export default Hero;
