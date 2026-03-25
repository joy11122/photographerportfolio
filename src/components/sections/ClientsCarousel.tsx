import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import testimonialsData from '@/data/testimonials.json';

const { clients } = testimonialsData;

export function ClientsCarousel() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  // Double the clients array for seamless loop
  const doubledClients = [...clients, ...clients];

  return (
    <section ref={sectionRef} className="section-padding py-16 bg-muted/30 overflow-hidden">
      <div className="container-wide mx-auto mb-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="text-gold-500 text-sm uppercase tracking-wider">Trusted By</span>
          <h3 className="font-display text-2xl md:text-3xl mt-2">
            Brands We've Worked With
          </h3>
        </motion.div>
      </div>

      {/* Carousel */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="relative"
      >
        {/* Gradient Masks */}
        <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-background to-transparent z-10" />

        {/* Scrolling Track */}
        <div className="flex animate-scroll hover:pause-animation">
          {doubledClients.map((client, index) => (
            <div
              key={`${client.name}-${index}`}
              className="flex-shrink-0 mx-8 md:mx-12"
            >
              <div className="flex items-center justify-center h-16 px-8 rounded-lg bg-card border border-border/50 hover:border-gold-500/30 transition-colors">
                <span className="font-display text-xl md:text-2xl text-muted-foreground hover:text-foreground transition-colors whitespace-nowrap">
                  {client.logo}
                </span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="container-wide mx-auto mt-16"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="font-display text-3xl md:text-4xl text-gold-500">50+</div>
            <div className="text-sm text-muted-foreground mt-1">Brand Partners</div>
          </div>
          <div>
            <div className="font-display text-3xl md:text-4xl text-gold-500">12</div>
            <div className="text-sm text-muted-foreground mt-1">Magazine Features</div>
          </div>
          <div>
            <div className="font-display text-3xl md:text-4xl text-gold-500">8</div>
            <div className="text-sm text-muted-foreground mt-1">Industry Awards</div>
          </div>
          <div>
            <div className="font-display text-3xl md:text-4xl text-gold-500">100%</div>
            <div className="text-sm text-muted-foreground mt-1">Client Satisfaction</div>
          </div>
        </div>
      </motion.div>

      {/* CSS for infinite scroll animation */}
      <style>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-scroll:hover,
        .pause-animation {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}

export default ClientsCarousel;
