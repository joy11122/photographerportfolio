import { useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { PortfolioCard } from '../PortfolioCard';
import { LightboxModal } from '../LightboxModal';
import portfolioData from '@/data/portfolio.json';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PortfolioGalleryProps {
  showAll?: boolean;
}

export function PortfolioGallery({ showAll = false }: PortfolioGalleryProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const { categories, projects } = portfolioData;

  const filteredProjects = activeCategory === 'all' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  const displayProjects = showAll ? filteredProjects : filteredProjects.slice(0, 8);

  const handleProjectClick = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  const lightboxImages = displayProjects.map(p => ({
    src: p.image,
    alt: p.title,
    caption: `${p.title} - ${p.client} (${p.location})`,
  }));

  return (
    <section ref={sectionRef} className="section-padding py-24 lg:py-32 bg-muted/30">
      <div className="container-wide mx-auto">
        {/* Header */}
        {!showAll && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-gold-500 text-sm uppercase tracking-wider">Portfolio</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mt-4 mb-6">
              Featured <span className="text-gradient-gold">Work</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A curated selection of our finest photography projects across weddings, 
              portraits, commercial work, and editorial features.
            </p>
          </motion.div>
        )}

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                activeCategory === category.id
                  ? 'bg-gold-500 text-white shadow-gold'
                  : 'bg-background text-foreground hover:bg-muted border border-border'
              }`}
            >
              {category.name}
              <span className={`ml-2 text-xs ${
                activeCategory === category.id ? 'text-white/70' : 'text-muted-foreground'
              }`}>
                ({category.count})
              </span>
            </button>
          ))}
        </motion.div>

        {/* Projects Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {displayProjects.map((project, index) => (
              <PortfolioCard
                key={project.id}
                id={project.id}
                title={project.title}
                category={project.category}
                categoryName={project.categoryName}
                image={project.image}
                client={project.client}
                location={project.location}
                featured={project.featured}
                index={index}
                onClick={() => handleProjectClick(index)}
              />
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View All Button */}
        {!showAll && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-16"
          >
            <Button
              size="lg"
              variant="outline"
              className="border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-white group"
              onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: '/portfolio' }))}
            >
              View All Projects
              <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        )}
      </div>

      {/* Lightbox */}
      <LightboxModal
        images={lightboxImages}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </section>
  );
}

export default PortfolioGallery;
