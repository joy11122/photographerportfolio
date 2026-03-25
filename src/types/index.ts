// Portfolio Types
export interface PortfolioProject {
  id: string;
  title: string;
  category: string;
  categoryName: string;
  image: string;
  images: string[];
  client: string;
  location: string;
  date: string;
  description: string;
  featured: boolean;
  beforeAfter?: {
    before: string;
    after: string;
  };
}

export interface PortfolioCategory {
  id: string;
  name: string;
  count: number;
}

export interface PortfolioData {
  categories: PortfolioCategory[];
  projects: PortfolioProject[];
  stats: {
    yearsExperience: number;
    projectsCompleted: number;
    happyClients: number;
    awardsWon: number;
  };
}

// Testimonial Types
export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
  project: string;
  date: string;
}

export interface Client {
  name: string;
  logo: string;
}

export interface TestimonialsData {
  testimonials: Testimonial[];
  clients: Client[];
}

// Blog Types
export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content?: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
  tags?: string[];
}

// Service Types
export interface Service {
  id: string;
  icon: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  price: string;
  duration: string;
  image: string;
}

// Pricing Types
export interface PricingPackage {
  id: string;
  name: string;
  description: string;
  price: number;
  popular?: boolean;
  features: {
    text: string;
    included: boolean;
  }[];
}

// Navigation Types
export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

// Theme Types
export type Theme = 'light' | 'dark' | 'system';

// Animation Types
export interface AnimationConfig {
  duration?: number;
  delay?: number;
  ease?: number[];
}

// Form Types
export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  service?: string;
  message: string;
}

// Lightbox Types
export interface LightboxImage {
  src: string;
  alt: string;
  caption?: string;
}

// Stats Types
export interface Stat {
  icon: string;
  value: number | string;
  suffix?: string;
  label: string;
}

// Social Link Types
export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

// Timeline Types
export interface TimelineEvent {
  year: string;
  title: string;
  description: string;
}

// Skill Types
export interface Skill {
  name: string;
  level: number;
}
