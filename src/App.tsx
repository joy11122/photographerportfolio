import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from 'next-themes';
import { Hero } from './components/sections/Hero';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { PortfolioGallery } from './components/sections/PortfolioGallery';
import { AboutSection } from './components/sections/AboutSection';
import { ServicesSection } from './components/sections/ServicesSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { ClientsCarousel } from './components/sections/ClientsCarousel';
import { ContactSection } from './components/sections/ContactSection';
import { PricingSection } from './components/sections/PricingSection';
import { BlogSection } from './components/sections/BlogSection';
import { ScrollProgress } from './components/ScrollProgress';
import { CursorFollower } from './components/CursorFollower';
import { Toaster } from '@/components/ui/sonner';

// Page Components
function HomePage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Hero />
      <AboutSection />
      <PortfolioGallery />
      <ServicesSection />
      <TestimonialsSection />
      <ClientsCarousel />
      <ContactSection />
    </motion.div>
  );
}

function PortfolioPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="pt-24"
    >
      <div className="section-padding py-16">
        <div className="container-wide mx-auto">
          <div className="text-center mb-16">
            <span className="text-gold-500 text-sm uppercase tracking-wider">Our Work</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mt-4 mb-6">
              Portfolio Gallery
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Explore our collection of carefully curated photography projects spanning weddings, 
              portraits, commercial work, and editorial features.
            </p>
          </div>
        </div>
      </div>
      <PortfolioGallery showAll />
    </motion.div>
  );
}

function ServicesPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="pt-24"
    >
      <div className="section-padding py-16">
        <div className="container-wide mx-auto">
          <div className="text-center mb-16">
            <span className="text-gold-500 text-sm uppercase tracking-wider">What We Offer</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mt-4 mb-6">
              Our Services
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From intimate portraits to grand celebrations, we offer a range of photography 
              services tailored to capture your unique story.
            </p>
          </div>
        </div>
      </div>
      <ServicesSection detailed />
      <PricingSection />
    </motion.div>
  );
}

function PricingPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="pt-24"
    >
      <div className="section-padding py-16">
        <div className="container-wide mx-auto">
          <div className="text-center mb-16">
            <span className="text-gold-500 text-sm uppercase tracking-wider">Investment</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mt-4 mb-6">
              Pricing Packages
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Transparent pricing for exceptional photography services. 
              Custom packages available upon request.
            </p>
          </div>
        </div>
      </div>
      <PricingSection />
    </motion.div>
  );
}

function BlogPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="pt-24"
    >
      <div className="section-padding py-16">
        <div className="container-wide mx-auto">
          <div className="text-center mb-16">
            <span className="text-gold-500 text-sm uppercase tracking-wider">Insights</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mt-4 mb-6">
              Journal
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Stories, tips, and behind-the-scenes glimpses into our world of photography.
            </p>
          </div>
        </div>
      </div>
      <BlogSection />
    </motion.div>
  );
}

function ContactPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="pt-24"
    >
      <div className="section-padding py-16">
        <div className="container-wide mx-auto">
          <div className="text-center mb-16">
            <span className="text-gold-500 text-sm uppercase tracking-wider">Get in Touch</span>
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl mt-4 mb-6">
              Let's Connect
            </h1>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Ready to create something beautiful together? We'd love to hear about your project.
            </p>
          </div>
        </div>
      </div>
      <ContactSection fullWidth />
    </motion.div>
  );
}

function NotFoundPage() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen flex items-center justify-center section-padding"
    >
      <div className="text-center">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="relative inline-block mb-8"
        >
          <span className="font-display text-[150px] md:text-[200px] leading-none text-gradient-gold opacity-20">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display text-6xl md:text-8xl text-gradient-gold">
              404
            </span>
          </div>
        </motion.div>
        <h2 className="font-display text-2xl md:text-3xl mb-4">
          Page Not Found
        </h2>
        <p className="text-muted-foreground max-w-md mx-auto mb-8">
          The page you're looking for seems to have wandered off frame. 
          Let's get you back to the main gallery.
        </p>
        <a 
          href="/" 
          onClick={(e) => {
            e.preventDefault();
            window.dispatchEvent(new CustomEvent('navigate', { detail: '/' }));
          }}
          className="inline-flex items-center gap-2 px-6 py-3 bg-gold-500 text-white rounded-full hover:bg-gold-600 transition-colors"
        >
          Return Home
        </a>
      </div>
    </motion.div>
  );
}

type Page = 'home' | 'portfolio' | 'services' | 'pricing' | 'blog' | 'contact' | '404';

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [isLoading, setIsLoading] = useState(true);

  // Handle navigation
  useEffect(() => {
    const handleNavigate = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      const path = customEvent.detail;
      
      switch (path) {
        case '/':
        case '/home':
          setCurrentPage('home');
          break;
        case '/portfolio':
          setCurrentPage('portfolio');
          break;
        case '/services':
          setCurrentPage('services');
          break;
        case '/pricing':
          setCurrentPage('pricing');
          break;
        case '/blog':
          setCurrentPage('blog');
          break;
        case '/contact':
          setCurrentPage('contact');
          break;
        default:
          setCurrentPage('404');
      }
      
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('navigate', handleNavigate);
    
    // Check URL on load
    const path = window.location.pathname;
    if (path !== '/') {
      handleNavigate(new CustomEvent('navigate', { detail: path }));
    }
    
    // Simulate initial load
    const timer = setTimeout(() => setIsLoading(false), 500);
    
    return () => {
      window.removeEventListener('navigate', handleNavigate);
      clearTimeout(timer);
    };
  }, []);

  // Update URL when page changes
  useEffect(() => {
    const path = currentPage === 'home' ? '/' : `/${currentPage}`;
    window.history.pushState({}, '', path);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'portfolio':
        return <PortfolioPage />;
      case 'services':
        return <ServicesPage />;
      case 'pricing':
        return <PricingPage />;
      case 'blog':
        return <BlogPage />;
      case 'contact':
        return <ContactPage />;
      case '404':
        return <NotFoundPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
      <div className="min-h-screen bg-background text-foreground">
        {/* Loading Screen */}
        <AnimatePresence>
          {isLoading && (
            <motion.div
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                className="text-center"
              >
                <div className="font-display text-4xl text-gradient-gold mb-4">
                  Lumiere
                </div>
                <div className="w-32 h-0.5 bg-muted overflow-hidden rounded-full">
                  <motion.div
                    className="h-full bg-gold-500"
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ duration: 0.5, ease: 'easeInOut' }}
                  />
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Custom Cursor (desktop only) */}
        <CursorFollower />
        
        {/* Scroll Progress */}
        <ScrollProgress />
        
        {/* Navigation */}
        <Navigation />
        
        {/* Main Content */}
        <main>
          <AnimatePresence mode="wait">
            <motion.div
              key={currentPage}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderPage()}
            </motion.div>
          </AnimatePresence>
        </main>
        
        {/* Footer */}
        <Footer />
        
        {/* Toast notifications */}
        <Toaster position="bottom-right" />
      </div>
    </ThemeProvider>
  );
}

export default App;
