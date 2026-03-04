/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  ShoppingBag, 
  Menu, 
  X, 
  ArrowRight, 
  Instagram, 
  Twitter, 
  Facebook,
  Search,
  User,
  ChevronRight,
  ChevronLeft,
  Heart
} from 'lucide-react';

// --- Types ---
interface Product {
  id: number;
  name: string;
  price: string;
  category: string;
  image: string;
  tag?: string;
}

// --- Mock Data ---
const FEATURED_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Silk Evening Gown",
    price: "$450",
    category: "Dresses",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
    tag: "New Arrival"
  },
  {
    id: 2,
    name: "Tailored Wool Blazer",
    price: "$320",
    category: "Outerwear",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: "Cashmere Turtleneck",
    price: "$180",
    category: "Knitwear",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a4bb4?auto=format&fit=crop&q=80&w=800",
    tag: "Best Seller"
  },
  {
    id: 4,
    name: "Linen Wide-Leg Trousers",
    price: "$140",
    category: "Bottoms",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800"
  }
];

const COLLECTIONS = [
  {
    title: "Spring/Summer '24",
    description: "Lightweight fabrics and ethereal silhouettes for the warmer months.",
    image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=1200"
  },
  {
    title: "The Minimalist Series",
    description: "Essential pieces designed for versatility and longevity.",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?auto=format&fit=crop&q=80&w=1200"
  }
];

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'glass-nav py-4' : 'bg-transparent py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 -ml-2"
          onClick={() => setIsMenuOpen(true)}
        >
          <Menu className="w-6 h-6" />
        </button>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center space-x-8 text-xs uppercase tracking-widest font-medium">
          <a href="#" className="hover:text-brand-accent transition-colors">Shop All</a>
          <a href="#" className="hover:text-brand-accent transition-colors">Collections</a>
          <a href="#" className="hover:text-brand-accent transition-colors">Journal</a>
        </div>

        {/* Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 text-3xl font-serif tracking-tighter font-bold">
          <a href="/">CLOTHVIL</a>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4 lg:space-x-6">
          <button className="p-2 hover:text-brand-accent transition-colors hidden sm:block">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 hover:text-brand-accent transition-colors hidden sm:block">
            <User className="w-5 h-5" />
          </button>
          <button className="p-2 hover:text-brand-accent transition-colors relative">
            <ShoppingBag className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-brand-accent rounded-full"></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 bg-brand-paper z-[60] p-8 flex flex-col"
          >
            <div className="flex justify-end">
              <button onClick={() => setIsMenuOpen(false)} className="p-2">
                <X className="w-8 h-8" />
              </button>
            </div>
            <div className="flex-1 flex flex-col justify-center space-y-8 text-4xl font-serif">
              <a href="#" onClick={() => setIsMenuOpen(false)}>Shop All</a>
              <a href="#" onClick={() => setIsMenuOpen(false)}>Collections</a>
              <a href="#" onClick={() => setIsMenuOpen(false)}>Journal</a>
              <a href="#" onClick={() => setIsMenuOpen(false)}>About Us</a>
            </div>
            <div className="pt-8 border-t border-brand-ink/10 flex space-x-6">
              <Instagram className="w-6 h-6" />
              <Twitter className="w-6 h-6" />
              <Facebook className="w-6 h-6" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <motion.div 
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
        className="absolute inset-0"
      >
        <img 
          src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=2000" 
          alt="Hero Fashion" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/20"></div>
      </motion.div>

      <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-end pb-24 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <span className="text-xs uppercase tracking-[0.3em] font-semibold mb-4 block">Summer Collection 2024</span>
          <h1 className="text-6xl md:text-8xl lg:text-9xl font-serif leading-none mb-8">
            Ethereal <br />
            <span className="italic">Elegance</span>
          </h1>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
            <button className="bg-white text-brand-ink px-10 py-4 text-xs uppercase tracking-widest font-bold hover:bg-brand-accent hover:text-white transition-all duration-300">
              Shop The Look
            </button>
            <button className="border border-white/50 backdrop-blur-sm px-10 py-4 text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-brand-ink transition-all duration-300">
              View Collection
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ProductCard: React.FC<{ product: Product }> = ({ product }) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className="group cursor-pointer"
    >
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        {product.tag && (
          <span className="absolute top-4 left-4 bg-white text-brand-ink px-3 py-1 text-[10px] uppercase tracking-widest font-bold">
            {product.tag}
          </span>
        )}
        <button className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm text-brand-ink py-3 text-[10px] uppercase tracking-widest font-bold opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
          Add to Bag
        </button>
        <button className="absolute top-4 right-4 p-2 bg-white/50 backdrop-blur-sm rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100">
          <Heart className="w-4 h-4" />
        </button>
      </div>
      <div className="flex justify-between items-start">
        <div>
          <p className="text-[10px] uppercase tracking-widest text-brand-ink/50 mb-1">{product.category}</p>
          <h3 className="text-sm font-medium">{product.name}</h3>
        </div>
        <p className="text-sm font-serif italic">{product.price}</p>
      </div>
    </motion.div>
  );
};

const FeaturedSection = () => {
  return (
    <section className="py-24 max-w-7xl mx-auto px-6">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 space-y-4 md:space-y-0">
        <div className="max-w-xl">
          <h2 className="text-4xl md:text-5xl mb-6">Curated Essentials</h2>
          <p className="text-brand-ink/60 leading-relaxed">
            Discover our latest arrivals, where timeless design meets modern craftsmanship. 
            Each piece is meticulously crafted to elevate your daily wardrobe.
          </p>
        </div>
        <a href="#" className="inline-flex items-center text-xs uppercase tracking-widest font-bold border-b border-brand-ink pb-1 hover:text-brand-accent hover:border-brand-accent transition-all">
          View All Products <ArrowRight className="ml-2 w-4 h-4" />
        </a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {FEATURED_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

const CollectionSection = () => {
  return (
    <section className="py-24 bg-brand-ink text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {COLLECTIONS.map((collection, idx) => (
            <div key={idx} className="group relative overflow-hidden aspect-[16/10]">
              <img 
                src={collection.image} 
                alt={collection.title} 
                className="w-full h-full object-cover opacity-60 transition-transform duration-1000 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 p-12 flex flex-col justify-end">
                <h3 className="text-4xl font-serif mb-4">{collection.title}</h3>
                <p className="text-white/70 max-w-md mb-8">{collection.description}</p>
                <button className="w-fit border-b border-white pb-1 text-xs uppercase tracking-widest font-bold hover:text-brand-accent hover:border-brand-accent transition-all">
                  Explore Collection
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const AboutSection = () => {
  return (
    <section className="py-32 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
        <div className="relative">
          <div className="aspect-[4/5] overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?auto=format&fit=crop&q=80&w=800" 
              alt="Brand Story" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-12 -right-12 w-64 h-80 hidden md:block border-8 border-brand-paper overflow-hidden">
            <img 
              src="https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&q=80&w=400" 
              alt="Detail" 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        <div className="space-y-8">
          <span className="text-xs uppercase tracking-[0.3em] font-semibold text-brand-accent">Our Philosophy</span>
          <h2 className="text-5xl md:text-6xl leading-tight">Crafting a legacy of <span className="italic">conscious</span> luxury.</h2>
          <p className="text-brand-ink/70 leading-relaxed text-lg">
            At Clothvil, we believe that fashion should be as enduring as the memories you create in it. 
            Our journey began with a simple vision: to create garments that transcend seasons and trends, 
            focusing on exceptional quality, ethical production, and timeless aesthetics.
          </p>
          <p className="text-brand-ink/70 leading-relaxed">
            Every thread is chosen with purpose, every silhouette designed for comfort, and every collection 
            tells a story of craftsmanship and dedication to the art of dressing well.
          </p>
          <button className="bg-brand-ink text-white px-12 py-5 text-xs uppercase tracking-widest font-bold hover:bg-brand-accent transition-all duration-300">
            Read Our Story
          </button>
        </div>
      </div>
    </section>
  );
};

const Newsletter = () => {
  return (
    <section className="py-24 border-t border-brand-ink/5">
      <div className="max-w-3xl mx-auto px-6 text-center">
        <h2 className="text-4xl mb-6">Join The Circle</h2>
        <p className="text-brand-ink/60 mb-10">
          Subscribe to receive early access to new collections, exclusive events, and curated editorial content.
        </p>
        <form className="flex flex-col sm:flex-row gap-4">
          <input 
            type="email" 
            placeholder="Enter your email address" 
            className="flex-1 bg-transparent border-b border-brand-ink/20 py-4 px-2 focus:outline-none focus:border-brand-accent transition-colors"
          />
          <button className="bg-brand-ink text-white px-10 py-4 text-xs uppercase tracking-widest font-bold hover:bg-brand-accent transition-all">
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-paper pt-24 pb-12 border-t border-brand-ink/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-24">
          <div className="col-span-1 lg:col-span-1">
            <h3 className="text-2xl font-serif font-bold mb-8">CLOTHVIL</h3>
            <p className="text-brand-ink/60 text-sm leading-relaxed mb-8">
              Redefining modern luxury through conscious design and timeless craftsmanship.
            </p>
            <div className="flex space-x-6">
              <Instagram className="w-5 h-5 hover:text-brand-accent cursor-pointer transition-colors" />
              <Twitter className="w-5 h-5 hover:text-brand-accent cursor-pointer transition-colors" />
              <Facebook className="w-5 h-5 hover:text-brand-accent cursor-pointer transition-colors" />
            </div>
          </div>
          
          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-8">Shop</h4>
            <ul className="space-y-4 text-sm text-brand-ink/60">
              <li><a href="#" className="hover:text-brand-ink transition-colors">New Arrivals</a></li>
              <li><a href="#" className="hover:text-brand-ink transition-colors">Best Sellers</a></li>
              <li><a href="#" className="hover:text-brand-ink transition-colors">Collections</a></li>
              <li><a href="#" className="hover:text-brand-ink transition-colors">Accessories</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-8">Support</h4>
            <ul className="space-y-4 text-sm text-brand-ink/60">
              <li><a href="#" className="hover:text-brand-ink transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-brand-ink transition-colors">Size Guide</a></li>
              <li><a href="#" className="hover:text-brand-ink transition-colors">Contact Us</a></li>
              <li><a href="#" className="hover:text-brand-ink transition-colors">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs uppercase tracking-widest font-bold mb-8">Legal</h4>
            <ul className="space-y-4 text-sm text-brand-ink/60">
              <li><a href="#" className="hover:text-brand-ink transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-brand-ink transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-brand-ink transition-colors">Cookie Policy</a></li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-brand-ink/5 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-[10px] uppercase tracking-widest text-brand-ink/40">
            &copy; 2024 Clothvil. All rights reserved.
          </p>
          <div className="flex space-x-8 text-[10px] uppercase tracking-widest text-brand-ink/40">
            <span>Designed with Intention</span>
            <span>Crafted for Longevity</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <FeaturedSection />
        <CollectionSection />
        <AboutSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
}
