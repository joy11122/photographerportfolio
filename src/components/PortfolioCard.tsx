import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Eye, Heart, ArrowUpRight } from 'lucide-react';

interface PortfolioCardProps {
  id: string;
  title: string;
  category: string;
  categoryName: string;
  image: string;
  client?: string;
  location?: string;
  featured?: boolean;
  onClick?: () => void;
  index?: number;
}

export function PortfolioCard({
  title,
  categoryName,
  image,
  client,
  location,
  featured,
  onClick,
  index = 0,
}: PortfolioCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isLiked, setIsLiked] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Mouse position for 3D tilt effect
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth spring animation for tilt
  const springConfig = { damping: 20, stiffness: 300 };
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [8, -8]), springConfig);
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-8, 8]), springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set((e.clientX - centerX) / rect.width);
    mouseY.set((e.clientY - centerY) / rect.height);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    setIsHovered(false);
  };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className="group relative perspective-1000"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
    >
      <motion.div
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: 'preserve-3d',
        }}
        className="relative overflow-hidden rounded-xl bg-card cursor-pointer"
      >
        {/* Image Container */}
        <div className="relative aspect-[4/5] overflow-hidden">
          <motion.img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
            animate={{
              scale: isHovered ? 1.08 : 1,
            }}
            transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          />
          
          {/* Gradient Overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"
            animate={{
              opacity: isHovered ? 1 : 0.6,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Featured Badge */}
          {featured && (
            <div className="absolute top-4 left-4">
              <span className="px-3 py-1 bg-gold-500 text-white text-xs font-medium rounded-full">
                Featured
              </span>
            </div>
          )}

          {/* Like Button */}
          <button
            onClick={handleLike}
            className="absolute top-4 right-4 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-colors"
            aria-label={isLiked ? 'Unlike' : 'Like'}
          >
            <motion.div
              animate={isLiked ? { scale: [1, 1.3, 1] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Heart 
                className={`w-4 h-4 ${isLiked ? 'fill-red-500 text-red-500' : ''}`} 
              />
            </motion.div>
          </button>

          {/* Content Overlay */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-end p-6"
            initial={false}
            animate={{
              y: isHovered ? 0 : 10,
              opacity: isHovered ? 1 : 0.9,
            }}
            transition={{ duration: 0.3 }}
          >
            {/* Category */}
            <motion.span
              className="text-gold-400 text-xs uppercase tracking-wider mb-2"
              animate={{
                y: isHovered ? 0 : 10,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3, delay: 0.05 }}
            >
              {categoryName}
            </motion.span>

            {/* Title */}
            <h3 className="font-display text-xl md:text-2xl text-white mb-2 leading-tight">
              {title}
            </h3>

            {/* Meta Info */}
            <motion.div
              className="flex items-center gap-4 text-white/70 text-sm"
              animate={{
                y: isHovered ? 0 : 10,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {client && <span>{client}</span>}
              {client && location && <span className="w-1 h-1 rounded-full bg-white/50" />}
              {location && <span>{location}</span>}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              className="flex items-center gap-3 mt-4"
              animate={{
                y: isHovered ? 0 : 20,
                opacity: isHovered ? 1 : 0,
              }}
              transition={{ duration: 0.3, delay: 0.15 }}
            >
              <button className="flex items-center gap-2 px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-gold-400 transition-colors group/btn">
                <Eye className="w-4 h-4" />
                View Project
                <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
              </button>
            </motion.div>
          </motion.div>

          {/* Shine Effect */}
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.1) 45%, rgba(255,255,255,0.2) 50%, rgba(255,255,255,0.1) 55%, transparent 60%)',
              transform: 'translateX(-100%)',
            }}
            animate={isHovered ? {
              transform: 'translateX(100%)',
            } : {
              transform: 'translateX(-100%)',
            }}
            transition={{ duration: 0.8, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>

      {/* Shadow */}
      <motion.div
        className="absolute -inset-2 rounded-xl bg-gold-500/20 blur-xl -z-10"
        animate={{
          opacity: isHovered ? 0.3 : 0,
          scale: isHovered ? 1.05 : 1,
        }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

// Masonry Grid Layout Component
interface MasonryGridProps {
  children: React.ReactNode;
  className?: string;
}

export function MasonryGrid({ children, className = '' }: MasonryGridProps) {
  return (
    <div className={`columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6 ${className}`}>
      {children}
    </div>
  );
}

// Simple Card Variant (without 3D effect)
interface SimplePortfolioCardProps {
  title: string;
  category: string;
  image: string;
  onClick?: () => void;
}

export function SimplePortfolioCard({ title, category, image, onClick }: SimplePortfolioCardProps) {
  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className="group relative overflow-hidden rounded-lg cursor-pointer"
      onClick={onClick}
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="absolute bottom-4 left-4 right-4">
          <span className="text-gold-400 text-xs uppercase tracking-wider">{category}</span>
          <h4 className="font-display text-lg text-white mt-1">{title}</h4>
        </div>
      </div>
    </motion.div>
  );
}

export default PortfolioCard;
