import { 
  Camera, Instagram, Twitter, Facebook, Linkedin, 
  Mail, Phone, MapPin, ArrowUpRight, Heart 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const footerLinks = {
  navigation: [
    { label: 'Home', href: '/' },
    { label: 'Portfolio', href: '/portfolio' },
    { label: 'Services', href: '/services' },
    { label: 'Pricing', href: '/pricing' },
    { label: 'Journal', href: '/blog' },
    { label: 'Contact', href: '/contact' },
  ],
  services: [
    { label: 'Wedding Photography', href: '/services' },
    { label: 'Portrait Sessions', href: '/services' },
    { label: 'Commercial Work', href: '/services' },
    { label: 'Editorial Features', href: '/services' },
    { label: 'Event Coverage', href: '/services' },
  ],
  social: [
    { label: 'Instagram', href: '#', icon: Instagram },
    { label: 'Twitter', href: '#', icon: Twitter },
    { label: 'Facebook', href: '#', icon: Facebook },
    { label: 'LinkedIn', href: '#', icon: Linkedin },
  ],
};

export function Footer() {
  const handleNavigate = (href: string) => {
    window.dispatchEvent(new CustomEvent('navigate', { detail: href }));
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
  };

  return (
    <footer className="bg-charcoal-950 text-white">
      {/* Main Footer */}
      <div className="section-padding py-20">
        <div className="container-wide mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
            {/* Brand Column */}
            <div className="lg:col-span-4">
              <a 
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavigate('/');
                }}
                className="inline-flex items-center gap-3 mb-6"
              >
                <Camera className="w-8 h-8 text-gold-500" />
                <span className="font-display text-2xl">Lumiere</span>
              </a>
              <p className="text-white/60 mb-6 max-w-sm leading-relaxed">
                Award-winning photography studio capturing life's most precious moments 
                with artistry and passion. Based in New York, available worldwide.
              </p>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <a 
                  href="mailto:hello@lumiere.studio" 
                  className="flex items-center gap-3 text-white/60 hover:text-gold-500 transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  hello@lumiere.studio
                </a>
                <a 
                  href="tel:+15551234567" 
                  className="flex items-center gap-3 text-white/60 hover:text-gold-500 transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +1 (555) 123-4567
                </a>
                <div className="flex items-center gap-3 text-white/60">
                  <MapPin className="w-4 h-4" />
                  123 Studio Lane, New York, NY 10001
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="lg:col-span-2">
              <h4 className="font-display text-lg mb-6">Navigation</h4>
              <ul className="space-y-3">
                {footerLinks.navigation.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigate(link.href);
                      }}
                      className="text-white/60 hover:text-gold-500 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services Links */}
            <div className="lg:col-span-3">
              <h4 className="font-display text-lg mb-6">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavigate(link.href);
                      }}
                      className="text-white/60 hover:text-gold-500 transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Newsletter */}
            <div className="lg:col-span-3">
              <h4 className="font-display text-lg mb-6">Stay Inspired</h4>
              <p className="text-white/60 mb-4">
                Subscribe to our newsletter for photography tips, behind-the-scenes content, 
                and exclusive offers.
              </p>
              <form onSubmit={handleSubscribe} className="space-y-3">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="bg-white/10 border-white/20 text-white placeholder:text-white/40 focus:border-gold-500"
                />
                <Button 
                  type="submit"
                  className="w-full bg-gold-500 hover:bg-gold-600 text-white"
                >
                  Subscribe
                  <ArrowUpRight className="w-4 h-4 ml-2" />
                </Button>
              </form>

              {/* Social Links */}
              <div className="mt-8">
                <h5 className="text-sm text-white/40 uppercase tracking-wider mb-4">Follow Us</h5>
                <div className="flex items-center gap-3">
                  {footerLinks.social.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      className="p-3 rounded-full bg-white/10 text-white/60 hover:bg-gold-500 hover:text-white transition-all"
                      aria-label={social.label}
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="section-padding py-6">
          <div className="container-wide mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-white/40 text-sm text-center md:text-left">
              © {new Date().getFullYear()} Lumiere Photography. All rights reserved.
            </p>
            <p className="text-white/40 text-sm flex items-center gap-1">
              Crafted with <Heart className="w-4 h-4 text-red-500 fill-red-500" /> in New York
            </p>
            <div className="flex items-center gap-6 text-sm">
              <a href="#" className="text-white/40 hover:text-white transition-colors">
                Privacy Policy
              </a>
              <a href="#" className="text-white/40 hover:text-white transition-colors">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
