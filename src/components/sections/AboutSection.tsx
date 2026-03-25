import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Award, Camera, Globe, Users } from 'lucide-react';

const milestones = [
  {
    year: '2012',
    title: 'The Beginning',
    description: 'Started as a passion project, shooting local events and portraits.',
  },
  {
    year: '2015',
    title: 'First Major Award',
    description: 'Won the International Photography Awards for Wedding Photography.',
  },
  {
    year: '2018',
    title: 'Studio Expansion',
    description: 'Opened our flagship studio in New York City.',
  },
  {
    year: '2021',
    title: 'Global Recognition',
    description: 'Featured in Vogue, Harper\'s Bazaar, and international exhibitions.',
  },
  {
    year: '2024',
    title: '500+ Projects',
    description: 'Celebrated 500+ successful projects and countless happy clients.',
  },
];

const skills = [
  { name: 'Wedding Photography', level: 98 },
  { name: 'Portrait & Editorial', level: 95 },
  { name: 'Commercial Work', level: 92 },
  { name: 'Post-Processing', level: 96 },
  { name: 'Creative Direction', level: 90 },
];

const stats = [
  { icon: Camera, value: '12+', label: 'Years Experience' },
  { icon: Users, value: '500+', label: 'Projects Completed' },
  { icon: Award, value: '23', label: 'Industry Awards' },
  { icon: Globe, value: '30+', label: 'Countries Visited' },
];

export function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section ref={sectionRef} className="section-padding py-24 lg:py-32">
      <div className="container-wide mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-gold-500 text-sm uppercase tracking-wider">About Us</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mt-4 mb-6">
            The Story Behind <span className="text-gradient-gold">The Lens</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto text-lg">
            For over a decade, we've been capturing life's most precious moments with 
            artistry, passion, and an unwavering commitment to excellence.
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center mb-24">
          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1554048612-b6a482bc67e5?w=800&q=80"
                alt="Photographer at work"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>
            
            {/* Floating Stats Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="absolute -bottom-8 -right-8 bg-card border border-border rounded-xl p-6 shadow-xl"
            >
              <div className="text-4xl font-display font-bold text-gold-500">12+</div>
              <div className="text-sm text-muted-foreground">Years of Excellence</div>
            </motion.div>

            {/* Decorative Element */}
            <div className="absolute -top-4 -left-4 w-24 h-24 border-2 border-gold-500/30 rounded-xl -z-10" />
          </motion.div>

          {/* Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <h3 className="font-display text-3xl md:text-4xl mb-6">
              Capturing Moments That <span className="italic text-gold-500">Last Forever</span>
            </h3>
            <div className="space-y-4 text-muted-foreground leading-relaxed">
              <p>
                What started as a childhood fascination with light and shadow has evolved into 
                a lifelong pursuit of visual storytelling. Every photograph we create is a 
                testament to our belief that the most beautiful moments are often the most fleeting.
              </p>
              <p>
                Our approach combines technical mastery with artistic intuition. We don't just 
                take pictures—we craft visual narratives that evoke emotion, preserve memories, 
                and stand the test of time.
              </p>
              <p>
                From intimate portraits to grand celebrations, from commercial campaigns to 
                editorial features, we bring the same level of dedication and creativity to 
                every project we undertake.
              </p>
            </div>

            {/* Skills */}
            <div className="mt-10 space-y-4">
              {skills.map((skill, index) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                >
                  <div className="flex justify-between mb-2">
                    <span className="text-sm font-medium">{skill.name}</span>
                    <span className="text-sm text-muted-foreground">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-gold-500 to-gold-400 rounded-full"
                      initial={{ width: 0 }}
                      animate={isInView ? { width: `${skill.level}%` } : {}}
                      transition={{ duration: 1, delay: 0.8 + index * 0.1, ease: 'easeOut' }}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mb-24"
        >
          <h3 className="font-display text-2xl md:text-3xl text-center mb-12">
            Our Journey
          </h3>
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border hidden md:block" />
            
            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={milestone.year}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  className={`relative flex flex-col md:flex-row items-center gap-6 md:gap-12 ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 text-center ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                    <span className="text-gold-500 font-display text-xl">{milestone.year}</span>
                    <h4 className="font-display text-lg mt-1">{milestone.title}</h4>
                    <p className="text-muted-foreground text-sm mt-1">{milestone.description}</p>
                  </div>
                  
                  {/* Dot */}
                  <div className="relative z-10 w-4 h-4 rounded-full bg-gold-500 border-4 border-background hidden md:block" />
                  
                  {/* Spacer */}
                  <div className="flex-1 hidden md:block" />
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-8"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 1.4 + index * 0.1 }}
              className="text-center p-6 rounded-xl bg-muted/50"
            >
              <stat.icon className="w-8 h-8 text-gold-500 mx-auto mb-4" />
              <div className="font-display text-3xl md:text-4xl font-bold">{stat.value}</div>
              <div className="text-muted-foreground text-sm mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default AboutSection;
