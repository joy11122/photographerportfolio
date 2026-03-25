import { useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Check, X, Calculator, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';

interface Package {
  id: string;
  name: string;
  description: string;
  price: number;
  popular?: boolean;
  features: { text: string; included: boolean }[];
}

const packages: Package[] = [
  {
    id: 'essential',
    name: 'Essential',
    description: 'Perfect for intimate gatherings and small events',
    price: 2500,
    features: [
      { text: '4 hours of coverage', included: true },
      { text: '1 professional photographer', included: true },
      { text: 'Online gallery', included: true },
      { text: '50 edited photos', included: true },
      { text: 'Engagement session', included: false },
      { text: 'Second photographer', included: false },
      { text: 'Wedding album', included: false },
      { text: 'Video highlights', included: false },
    ],
  },
  {
    id: 'premium',
    name: 'Premium',
    description: 'Our most popular choice for complete coverage',
    price: 4500,
    popular: true,
    features: [
      { text: '8 hours of coverage', included: true },
      { text: '2 professional photographers', included: true },
      { text: 'Online gallery', included: true },
      { text: '200 edited photos', included: true },
      { text: 'Engagement session', included: true },
      { text: 'Second photographer', included: true },
      { text: 'Premium wedding album', included: false },
      { text: 'Video highlights', included: false },
    ],
  },
  {
    id: 'luxury',
    name: 'Luxury',
    description: 'The ultimate photography experience',
    price: 7500,
    features: [
      { text: 'Full day coverage (12+ hours)', included: true },
      { text: '2 professional photographers', included: true },
      { text: 'Online gallery', included: true },
      { text: 'Unlimited edited photos', included: true },
      { text: 'Engagement session', included: true },
      { text: 'Second photographer', included: true },
      { text: 'Luxury wedding album', included: true },
      { text: 'Cinematic video highlights', included: true },
    ],
  },
];

export function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });
  
  // Calculator state
  const [hours, setHours] = useState(6);
  const [photographers, setPhotographers] = useState(1);
  const [engagementSession, setEngagementSession] = useState(false);
  const [album, setAlbum] = useState(false);
  const [video, setVideo] = useState(false);

  const calculatePrice = () => {
    let base = 500;
    base += hours * 300;
    base += (photographers - 1) * 800;
    if (engagementSession) base += 500;
    if (album) base += 800;
    if (video) base += 1200;
    return base;
  };

  return (
    <section ref={sectionRef} className="section-padding py-24 lg:py-32 bg-muted/30">
      <div className="container-wide mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold-500 text-sm uppercase tracking-wider">Investment</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mt-4 mb-6">
            Pricing <span className="text-gradient-gold">Packages</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing for exceptional photography services. 
            Choose a package or build your own with our custom calculator.
          </p>
        </motion.div>

        {/* Packages Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {packages.map((pkg, index) => (
            <motion.div
              key={pkg.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className={`relative bg-card rounded-2xl p-8 border ${
                pkg.popular 
                  ? 'border-gold-500 shadow-gold' 
                  : 'border-border hover:border-gold-500/30'
              } transition-all`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-4 py-1 bg-gold-500 text-white text-sm font-medium rounded-full">
                    <Sparkles className="w-4 h-4" />
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className="font-display text-2xl mb-2">{pkg.name}</h3>
                <p className="text-muted-foreground text-sm">{pkg.description}</p>
              </div>

              <div className="text-center mb-8">
                <span className="font-display text-5xl font-bold text-gold-500">
                  ${pkg.price.toLocaleString()}
                </span>
              </div>

              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-3 text-sm">
                    {feature.included ? (
                      <Check className="w-5 h-5 text-gold-500 flex-shrink-0" />
                    ) : (
                      <X className="w-5 h-5 text-muted-foreground/50 flex-shrink-0" />
                    )}
                    <span className={feature.included ? '' : 'text-muted-foreground/50'}>
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full ${
                  pkg.popular 
                    ? 'bg-gold-500 hover:bg-gold-600 text-white' 
                    : 'bg-muted hover:bg-muted/80'
                }`}
                onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: '/contact' }))}
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Custom Calculator */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-card rounded-2xl p-8 border border-border">
            <div className="flex items-center gap-3 mb-8">
              <div className="p-3 rounded-lg bg-gold-500/10">
                <Calculator className="w-6 h-6 text-gold-500" />
              </div>
              <div>
                <h3 className="font-display text-2xl">Custom Package Calculator</h3>
                <p className="text-muted-foreground text-sm">Build your perfect package</p>
              </div>
            </div>

            <div className="space-y-8">
              {/* Hours Slider */}
              <div>
                <div className="flex justify-between mb-3">
                  <Label>Coverage Hours</Label>
                  <span className="font-medium">{hours} hours</span>
                </div>
                <Slider
                  value={[hours]}
                  onValueChange={(value) => setHours(value[0])}
                  min={2}
                  max={12}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Photographers Slider */}
              <div>
                <div className="flex justify-between mb-3">
                  <Label>Photographers</Label>
                  <span className="font-medium">{photographers}</span>
                </div>
                <Slider
                  value={[photographers]}
                  onValueChange={(value) => setPhotographers(value[0])}
                  min={1}
                  max={3}
                  step={1}
                  className="w-full"
                />
              </div>

              {/* Add-ons */}
              <div className="grid sm:grid-cols-3 gap-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                  <Label htmlFor="engagement" className="cursor-pointer">Engagement Session</Label>
                  <Switch
                    id="engagement"
                    checked={engagementSession}
                    onCheckedChange={setEngagementSession}
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                  <Label htmlFor="album" className="cursor-pointer">Wedding Album</Label>
                  <Switch
                    id="album"
                    checked={album}
                    onCheckedChange={setAlbum}
                  />
                </div>
                <div className="flex items-center justify-between p-4 rounded-lg bg-muted">
                  <Label htmlFor="video" className="cursor-pointer">Video Highlights</Label>
                  <Switch
                    id="video"
                    checked={video}
                    onCheckedChange={setVideo}
                  />
                </div>
              </div>

              {/* Total */}
              <div className="flex items-center justify-between p-6 rounded-xl bg-gold-500/10 border border-gold-500/20">
                <div>
                  <span className="text-muted-foreground">Estimated Total</span>
                  <div className="font-display text-3xl text-gold-500">
                    ${calculatePrice().toLocaleString()}
                  </div>
                </div>
                <Button
                  className="bg-gold-500 hover:bg-gold-600 text-white"
                  onClick={() => window.dispatchEvent(new CustomEvent('navigate', { detail: '/contact' }))}
                >
                  Request Quote
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-muted-foreground text-sm mt-8"
        >
          All packages include a pre-event consultation, professional editing, and high-resolution digital files. 
          Travel fees may apply for destinations outside the New York area.
        </motion.p>
      </div>
    </section>
  );
}

export default PricingSection;
