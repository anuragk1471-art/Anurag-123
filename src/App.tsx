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
  price: number;
  category: string;
  image: string;
  description: string;
  tag?: string;
}

interface CartItem extends Product {
  quantity: number;
}

type View = 'home' | 'catalog' | 'checkout';

// --- Mock Data ---
const PRODUCTS: Product[] = [
  {
    id: 1,
    name: "Silk Evening Gown",
    price: 450,
    category: "Dresses",
    description: "A flowing silk gown perfect for elegant evenings.",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&q=80&w=800",
    tag: "New Arrival"
  },
  {
    id: 2,
    name: "Tailored Wool Blazer",
    price: 320,
    category: "Outerwear",
    description: "Sharp tailoring meets premium wool for a timeless look.",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    name: "Cashmere Turtleneck",
    price: 180,
    category: "Knitwear",
    description: "Ultra-soft cashmere for ultimate comfort and style.",
    image: "https://images.unsplash.com/photo-1556905055-8f358a7a4bb4?auto=format&fit=crop&q=80&w=800",
    tag: "Best Seller"
  },
  {
    id: 4,
    name: "Linen Wide-Leg Trousers",
    price: 140,
    category: "Pants",
    description: "Breathable linen trousers for a relaxed yet polished silhouette.",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 5,
    name: "Essential White Tee",
    price: 45,
    category: "T-shirts",
    description: "The perfect heavyweight cotton t-shirt.",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 6,
    name: "Oversized Graphic Hoodie",
    price: 95,
    category: "Hoodies",
    description: "Comfortable fleece hoodie with minimalist branding.",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 7,
    name: "Classic Denim Jacket",
    price: 120,
    category: "Outerwear",
    description: "Vintage-inspired denim jacket with a modern fit.",
    image: "https://images.unsplash.com/photo-1523205771623-e0faa4d2813d?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 8,
    name: "Relaxed Fit Cargo Pants",
    price: 110,
    category: "Pants",
    description: "Functional and stylish cargo pants for everyday wear.",
    image: "https://images.unsplash.com/photo-1517441551197-06399e5c1e7d?auto=format&fit=crop&q=80&w=800"
  }
];

const FEATURED_PRODUCTS = PRODUCTS.slice(0, 4);

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

const Navbar = ({ 
  cartCount, 
  onCartClick, 
  setView 
}: { 
  cartCount: number; 
  onCartClick: () => void;
  setView: (view: View) => void;
}) => {
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
          <button onClick={() => setView('catalog')} className="hover:text-brand-accent transition-colors">Shop All</button>
          <button onClick={() => setView('catalog')} className="hover:text-brand-accent transition-colors">Collections</button>
          <a href="#" className="hover:text-brand-accent transition-colors">Journal</a>
        </div>

        {/* Logo */}
        <div className="absolute left-1/2 -translate-x-1/2 text-3xl font-serif tracking-tighter font-bold">
          <button onClick={() => setView('home')}>CLOTHVIL</button>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4 lg:space-x-6">
          <button className="p-2 hover:text-brand-accent transition-colors hidden sm:block">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 hover:text-brand-accent transition-colors hidden sm:block">
            <User className="w-5 h-5" />
          </button>
          <button 
            onClick={onCartClick}
            className="p-2 hover:text-brand-accent transition-colors relative"
          >
            <ShoppingBag className="w-5 h-5" />
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-brand-accent text-white text-[10px] flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
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

const Hero = ({ setView }: { setView: (view: View) => void }) => {
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
            <button 
              onClick={() => setView('catalog')}
              className="bg-white text-brand-ink px-10 py-4 text-xs uppercase tracking-widest font-bold hover:bg-brand-accent hover:text-white transition-all duration-300"
            >
              Shop The Look
            </button>
            <button 
              onClick={() => setView('catalog')}
              className="border border-white/50 backdrop-blur-sm px-10 py-4 text-xs uppercase tracking-widest font-bold hover:bg-white hover:text-brand-ink transition-all duration-300"
            >
              View Collection
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

const ProductCard: React.FC<{ 
  product: Product; 
  onAddToCart: (p: Product) => void 
}> = ({ product, onAddToCart }) => {
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
        <button 
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-sm text-brand-ink py-3 text-[10px] uppercase tracking-widest font-bold opacity-0 translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0"
        >
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
        <p className="text-sm font-serif italic">${product.price}</p>
      </div>
    </motion.div>
  );
};

const FeaturedSection = ({ onAddToCart, setView }: { onAddToCart: (p: Product) => void, setView: (v: View) => void }) => {
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
        <button 
          onClick={() => setView('catalog')}
          className="inline-flex items-center text-xs uppercase tracking-widest font-bold border-b border-brand-ink pb-1 hover:text-brand-accent hover:border-brand-accent transition-all"
        >
          View All Products <ArrowRight className="ml-2 w-4 h-4" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {FEATURED_PRODUCTS.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
};

const CartDrawer = ({ 
  isOpen, 
  onClose, 
  cart, 
  onUpdateQuantity, 
  onRemove,
  onCheckout
}: { 
  isOpen: boolean; 
  onClose: () => void; 
  cart: CartItem[];
  onUpdateQuantity: (id: number, delta: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}) => {
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 z-[100] backdrop-blur-sm"
          />
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed top-0 right-0 h-full w-full max-w-md bg-brand-paper z-[101] shadow-2xl flex flex-col"
          >
            <div className="p-6 border-b border-brand-ink/5 flex items-center justify-between">
              <h2 className="text-xl font-serif">Your Bag ({cart.length})</h2>
              <button onClick={onClose} className="p-2 hover:bg-brand-ink/5 rounded-full transition-colors">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                  <ShoppingBag className="w-12 h-12 text-brand-ink/20" />
                  <p className="text-brand-ink/50">Your bag is currently empty.</p>
                  <button 
                    onClick={onClose}
                    className="text-xs uppercase tracking-widest font-bold border-b border-brand-ink pb-1"
                  >
                    Continue Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div key={item.id} className="flex space-x-4">
                    <div className="w-24 aspect-[3/4] bg-gray-100 overflow-hidden">
                      <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <div className="flex justify-between">
                          <h3 className="text-sm font-medium">{item.name}</h3>
                          <p className="text-sm font-serif">${item.price}</p>
                        </div>
                        <p className="text-[10px] uppercase tracking-widest text-brand-ink/50">{item.category}</p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center border border-brand-ink/10 rounded-full px-2">
                          <button 
                            onClick={() => onUpdateQuantity(item.id, -1)}
                            className="p-1 hover:text-brand-accent"
                          >
                            <ChevronLeft className="w-4 h-4" />
                          </button>
                          <span className="text-xs w-8 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => onUpdateQuantity(item.id, 1)}
                            className="p-1 hover:text-brand-accent"
                          >
                            <ChevronRight className="w-4 h-4" />
                          </button>
                        </div>
                        <button 
                          onClick={() => onRemove(item.id)}
                          className="text-[10px] uppercase tracking-widest font-bold text-red-500 hover:underline"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {cart.length > 0 && (
              <div className="p-6 border-t border-brand-ink/5 space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-brand-ink/60">Subtotal</span>
                  <span className="font-serif font-bold">${total}</span>
                </div>
                <p className="text-[10px] text-brand-ink/40 text-center">
                  Shipping and taxes calculated at checkout.
                </p>
                <button 
                  onClick={onCheckout}
                  className="w-full bg-brand-ink text-white py-4 text-xs uppercase tracking-widest font-bold hover:bg-brand-accent transition-all"
                >
                  Proceed to Checkout
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const Catalog = ({ onAddToCart }: { onAddToCart: (p: Product) => void }) => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const categories = ['All', ...Array.from(new Set(PRODUCTS.map(p => p.category)))];

  const filteredProducts = selectedCategory === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === selectedCategory);

  return (
    <section className="pt-32 pb-24 max-w-7xl mx-auto px-6">
      <div className="mb-16">
        <h1 className="text-5xl font-serif mb-8">The Collection</h1>
        <div className="flex flex-wrap gap-4">
          {categories.map(cat => (
            <button 
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-6 py-2 text-[10px] uppercase tracking-widest font-bold transition-all ${
                selectedCategory === cat 
                ? 'bg-brand-ink text-white' 
                : 'bg-transparent border border-brand-ink/10 hover:border-brand-ink'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-12">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} onAddToCart={onAddToCart} />
        ))}
      </div>
    </section>
  );
};

const Checkout = ({ cart, onComplete }: { cart: CartItem[], onComplete: () => void }) => {
  const [step, setStep] = useState(1);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = 15;
  const total = subtotal + shipping;

  const handleNext = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) setStep(step + 1);
    else onComplete();
  };

  return (
    <section className="pt-32 pb-24 max-w-7xl mx-auto px-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
        <div>
          <div className="flex items-center space-x-4 mb-12">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                  step >= s ? 'bg-brand-ink text-white' : 'bg-brand-ink/5 text-brand-ink/40'
                }`}>
                  {s}
                </div>
                {s < 3 && <div className={`w-12 h-px mx-2 ${step > s ? 'bg-brand-ink' : 'bg-brand-ink/10'}`} />}
              </div>
            ))}
          </div>

          <form onSubmit={handleNext} className="space-y-8">
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-serif">Shipping Information</h2>
                <div className="grid grid-cols-2 gap-4">
                  <input required placeholder="First Name" className="bg-transparent border-b border-brand-ink/20 py-3 focus:outline-none focus:border-brand-accent" />
                  <input required placeholder="Last Name" className="bg-transparent border-b border-brand-ink/20 py-3 focus:outline-none focus:border-brand-accent" />
                </div>
                <input required placeholder="Address" className="w-full bg-transparent border-b border-brand-ink/20 py-3 focus:outline-none focus:border-brand-accent" />
                <div className="grid grid-cols-3 gap-4">
                  <input required placeholder="City" className="bg-transparent border-b border-brand-ink/20 py-3 focus:outline-none focus:border-brand-accent" />
                  <input required placeholder="State" className="bg-transparent border-b border-brand-ink/20 py-3 focus:outline-none focus:border-brand-accent" />
                  <input required placeholder="ZIP Code" className="bg-transparent border-b border-brand-ink/20 py-3 focus:outline-none focus:border-brand-accent" />
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-serif">Payment Method</h2>
                <input required placeholder="Card Number" className="w-full bg-transparent border-b border-brand-ink/20 py-3 focus:outline-none focus:border-brand-accent" />
                <div className="grid grid-cols-2 gap-4">
                  <input required placeholder="Expiry (MM/YY)" className="bg-transparent border-b border-brand-ink/20 py-3 focus:outline-none focus:border-brand-accent" />
                  <input required placeholder="CVV" className="bg-transparent border-b border-brand-ink/20 py-3 focus:outline-none focus:border-brand-accent" />
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-serif">Review Order</h2>
                <p className="text-brand-ink/60">Please review your order details before completing the purchase.</p>
                <div className="bg-brand-ink/5 p-6 rounded-lg space-y-2">
                  <p className="text-sm"><strong>Shipping:</strong> 123 Fashion St, Style City, SC 12345</p>
                  <p className="text-sm"><strong>Payment:</strong> Card ending in **** 4242</p>
                </div>
              </div>
            )}

            <button type="submit" className="w-full bg-brand-ink text-white py-4 text-xs uppercase tracking-widest font-bold hover:bg-brand-accent transition-all">
              {step === 3 ? 'Complete Purchase' : 'Continue to Next Step'}
            </button>
          </form>
        </div>

        <div className="bg-brand-ink/5 p-8 h-fit">
          <h3 className="text-xl font-serif mb-8">Order Summary</h3>
          <div className="space-y-4 mb-8">
            {cart.map(item => (
              <div key={item.id} className="flex justify-between text-sm">
                <span className="text-brand-ink/60">{item.name} x {item.quantity}</span>
                <span className="font-serif">${item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="border-t border-brand-ink/10 pt-4 space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-brand-ink/60">Subtotal</span>
              <span className="font-serif">${subtotal}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-brand-ink/60">Shipping</span>
              <span className="font-serif">${shipping}</span>
            </div>
            <div className="flex justify-between text-lg font-serif font-bold pt-4 border-t border-brand-ink/10">
              <span>Total</span>
              <span>${total}</span>
            </div>
          </div>
        </div>
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
  const [view, setView] = useState<View>('home');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setView('checkout');
    window.scrollTo(0, 0);
  };

  const completeOrder = () => {
    alert('Thank you for your order! This was a mock checkout process.');
    setCart([]);
    setView('home');
    window.scrollTo(0, 0);
  };

  return (
    <div className="min-h-screen">
      <Navbar 
        cartCount={cart.reduce((sum, item) => sum + item.quantity, 0)} 
        onCartClick={() => setIsCartOpen(true)}
        setView={setView}
      />
      
      <CartDrawer 
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onUpdateQuantity={updateQuantity}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />

      <main>
        {view === 'home' && (
          <>
            <Hero setView={setView} />
            <FeaturedSection onAddToCart={addToCart} setView={setView} />
            <CollectionSection />
            <AboutSection />
            <Newsletter />
          </>
        )}
        {view === 'catalog' && (
          <Catalog onAddToCart={addToCart} />
        )}
        {view === 'checkout' && (
          <Checkout cart={cart} onComplete={completeOrder} />
        )}
      </main>
      <Footer />
    </div>
  );
}
