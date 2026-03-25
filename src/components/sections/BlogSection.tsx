import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { Clock, ArrowRight, Calendar, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  featured?: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: '1',
    title: 'The Art of Capturing Authentic Emotions in Wedding Photography',
    excerpt: 'Discover the techniques and approaches that help us capture genuine, heartfelt moments during your special day. From building rapport with couples to anticipating key moments.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80',
    category: 'Wedding Tips',
    author: 'Sarah Mitchell',
    date: 'Mar 15, 2024',
    readTime: '5 min read',
    featured: true,
  },
  {
    id: '2',
    title: '5 Essential Poses for Flattering Portrait Photography',
    excerpt: 'Learn the fundamental poses that work for every body type and help your subjects look their absolute best in front of the camera.',
    image: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=800&q=80',
    category: 'Portrait Tips',
    author: 'James Chen',
    date: 'Mar 10, 2024',
    readTime: '4 min read',
  },
  {
    id: '3',
    title: 'Behind the Scenes: Our Tuscany Wedding Shoot',
    excerpt: 'Join us on a journey through one of our most memorable destination weddings, from planning to the final shots.',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?w=800&q=80',
    category: 'Behind the Scenes',
    author: 'Emma Rodriguez',
    date: 'Mar 5, 2024',
    readTime: '8 min read',
  },
  {
    id: '4',
    title: 'Lighting Techniques for Dramatic Commercial Photography',
    excerpt: 'Master the art of lighting to create stunning product and brand imagery that captivates your audience.',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&q=80',
    category: 'Commercial',
    author: 'Michael Park',
    date: 'Feb 28, 2024',
    readTime: '6 min read',
  },
  {
    id: '5',
    title: 'The Complete Guide to Choosing Your Wedding Photographer',
    excerpt: 'Everything you need to know about finding and selecting the perfect photographer for your big day.',
    image: 'https://images.unsplash.com/photo-1510076857177-7470076d4098?w=800&q=80',
    category: 'Wedding Tips',
    author: 'Sarah Mitchell',
    date: 'Feb 20, 2024',
    readTime: '7 min read',
  },
  {
    id: '6',
    title: 'Editorial Photography: From Concept to Publication',
    excerpt: 'A deep dive into the creative process behind magazine-worthy fashion and editorial shoots.',
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=80',
    category: 'Editorial',
    author: 'Lisa Wong',
    date: 'Feb 15, 2024',
    readTime: '5 min read',
  },
];

export function BlogSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const featuredPost = blogPosts.find(post => post.featured);
  const regularPosts = blogPosts.filter(post => !post.featured);

  return (
    <section ref={sectionRef} className="section-padding py-24 lg:py-32">
      <div className="container-wide mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-gold-500 text-sm uppercase tracking-wider">Journal</span>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl mt-4 mb-6">
            Latest <span className="text-gradient-gold">Stories</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Insights, tips, and behind-the-scenes glimpses into our world of photography.
          </p>
        </motion.div>

        {/* Featured Post */}
        {featuredPost && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-12"
          >
            <article className="group relative bg-card rounded-2xl overflow-hidden border border-border hover:border-gold-500/30 transition-all">
              <div className="grid lg:grid-cols-2">
                <div className="relative aspect-[16/10] lg:aspect-auto overflow-hidden">
                  <img
                    src={featuredPost.image}
                    alt={featuredPost.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-card/50 hidden lg:block" />
                </div>
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <Badge className="w-fit mb-4 bg-gold-500/10 text-gold-500 hover:bg-gold-500/20">
                    Featured
                  </Badge>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {featuredPost.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {featuredPost.readTime}
                    </span>
                  </div>
                  <h3 className="font-display text-2xl md:text-3xl mb-4 group-hover:text-gold-500 transition-colors">
                    {featuredPost.title}
                  </h3>
                  <p className="text-muted-foreground mb-6 line-clamp-3">
                    {featuredPost.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{featuredPost.author}</span>
                    </div>
                    <Button variant="ghost" className="group/btn text-gold-500 hover:text-gold-600">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </div>
              </div>
            </article>
          </motion.div>
        )}

        {/* Posts Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {regularPosts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
              className="group bg-card rounded-xl overflow-hidden border border-border hover:border-gold-500/30 transition-all"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <Badge variant="secondary" className="text-xs">
                    {post.category}
                  </Badge>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-3">
                  <span>{post.date}</span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {post.readTime}
                  </span>
                </div>
                <h3 className="font-display text-xl mb-3 group-hover:text-gold-500 transition-colors line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-muted-foreground text-sm line-clamp-2 mb-4">
                  {post.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">{post.author}</span>
                  <Button variant="ghost" size="sm" className="text-gold-500 hover:text-gold-600">
                    Read
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </Button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Button
            variant="outline"
            size="lg"
            className="border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-white"
          >
            View All Articles
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

export default BlogSection;
