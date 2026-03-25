import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { 
  Heart, User, Building2, Sparkles, Camera, 
  ArrowRight, Check, Clock, Package 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';

interface Service {
  id: string;
  icon: React.ElementType;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  price: string;
  duration: string;
  image: string;
}

const services: Service[] = [
  {
    id: 'wedding',
    icon: Heart,
    title: 'Wedding Photography',
    subtitle: 'Capturing Your Special Day',
    description: 'From intimate ceremonies to grand celebrations, we document every precious moment of your wedding day with artistry and emotion. Our approach combines candid storytelling with elegant portraiture.',
    features: [
      'Full day coverage (8-12 hours)',
      'Two professional photographers',
      'Engagement session included',
      'Online gallery with high-res downloads',
      'Custom wedding album design',
      'Sneak peek within 48 hours',
    ],
    price: 'Starting at $4,500',
    duration: '8-12 hours',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
  },
  {
    id: 'portrait',
    icon: User,
    title: 'Portrait Sessions',
    subtitle: 'Your Story, Beautifully Told',
    description: 'Professional portraits that capture your essence. Whether for personal branding, family memories, or artistic expression, we create images that truly represent you.',
    features: [
      'Studio or on-location shoot',
      'Professional hair & makeup available',
      'Wardrobe consultation',
      'Multiple outfit changes',
      'Retouched digital images',
      'Print packages available',
    ],
    price: 'Starting at $650',
    duration: '1-2 hours',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
  },
  {
    id: 'commercial',
    icon: Building2,
    title: 'Commercial Photography',
    subtitle: 'Elevate Your Brand',
    description: 'High-impact visual content for businesses. From product photography to corporate headshots, we help brands tell their story through compelling imagery.',
    features: [
      'Product photography',
      'Corporate headshots',
      'Brand storytelling',
      'Lifestyle imagery',
      'Quick turnaround times',
      'Usage rights included',
    ],
    price: 'Custom quotes',
    duration: 'Varies by project',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
  },
  {
    id: 'editorial',
    icon: Sparkles,
    title: 'Editorial & Fashion',
    subtitle: 'Magazine-Quality Imagery',
    description: 'Creative photography for magazines, lookbooks, and fashion campaigns. We bring artistic vision and technical excellence to every editorial project.',
    features: [
      'Concept development',
      'Location scouting',
      'Creative direction',
      'Post-production mastery',
      'Publication-ready files',
      'Team coordination',
    ],
    price: 'Custom quotes',
    duration: 'Half to full day',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
  },
];

interface ServicesSectionProps {
  detailed?: boolean;
}

export function ServicesSection({ detailed = false }: ServicesSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section ref={sectionRef} className="section-padding py-24 lg:py-32">
      <div className="container-wide mx-auto">
        {/* Header */}
        {!detailed && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <span className="text-gold-500 text-sm uppercase tracking-wider">Services</span>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mt-4 mb-6">
              What We <span className="text-gradient-gold">Offer</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From intimate portraits to grand celebrations, we offer a comprehensive 
              range of photography services tailored to your unique needs.
            </p>
          </motion.div>
        )}

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-gold-500/30 transition-all duration-500"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />
                
                {/* Icon Badge */}
                <div className="absolute top-4 left-4 p-3 rounded-xl bg-gold-500/90 backdrop-blur-sm">
                  <service.icon className="w-6 h-6 text-white" />
                </div>
              </div>

              {/* Content */}
              <div className="p-6 pt-0 -mt-8 relative">
                <span className="text-gold-500 text-sm">{service.subtitle}</span>
                <h3 className="font-display text-2xl mt-1 mb-3">{service.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  {service.description}
                </p>

                {/* Quick Info */}
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-6">
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {service.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Package className="w-4 h-4" />
                    {service.price}
                  </span>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                  <Button
                    variant="outline"
                    className="flex-1 border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-white"
                    onClick={() => setSelectedService(service)}
                  >
                    Learn More
                  </Button>
                  <Button
                    className="flex-1 bg-gold-500 hover:bg-gold-600 text-white"
                    onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: '/contact' }))}
                  >
                    Book Now
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        {!detailed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 text-center"
          >
            <p className="text-muted-foreground mb-4">
              Looking for something specific? We also offer custom packages.
            </p>
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: '/contact' }))}
            >
              <Camera className="w-4 h-4 mr-2" />
              Discuss Your Project
            </Button>
          </motion.div>
        )}
      </div>

      {/* Service Detail Dialog */}
      <Dialog open={!!selectedService} onOpenChange={() => setSelectedService(null)}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          {selectedService && (
            <>
              <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden rounded-t-lg">
                <img
                  src={selectedService.image}
                  alt={selectedService.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                <div className="absolute bottom-4 left-6">
                  <div className="p-2 rounded-lg bg-gold-500 inline-block mb-2">
                    <selectedService.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="font-display text-2xl">{selectedService.title}</h3>
                </div>
              </div>
              
              <DialogHeader>
                <DialogTitle className="sr-only">{selectedService.title}</DialogTitle>
                <DialogDescription className="sr-only">
                  Details about {selectedService.title} service
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6">
                <p className="text-muted-foreground leading-relaxed">
                  {selectedService.description}
                </p>

                <div>
                  <h4 className="font-medium mb-3">What's Included</h4>
                  <ul className="space-y-2">
                    {selectedService.features.map((feature, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm">
                        <Check className="w-4 h-4 text-gold-500 mt-0.5 flex-shrink-0" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div>
                    <span className="text-sm text-muted-foreground">Starting at</span>
                    <div className="font-display text-xl text-gold-500">{selectedService.price}</div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm text-muted-foreground">Duration</span>
                    <div className="font-medium">{selectedService.duration}</div>
                  </div>
                </div>

                <Button 
                  className="w-full bg-gold-500 hover:bg-gold-600 text-white"
                  onClick={() => {
                    setSelectedService(null);
                    window.dispatchEvent(new CustomEvent('navigate', { detail: '/contact' }));
                  }}
                >
                  Book This Package
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}

export default ServicesSection;
