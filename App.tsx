
import React, { useState, useMemo } from 'react';
import Navbar from './components/Navbar';
import ProductCard from './components/ProductCard';
import CartDrawer from './components/CartDrawer';
import AiAssistant from './components/AiAssistant';
import { INITIAL_PRODUCTS, CATEGORIES, SHOP_NAME, SHOP_TAGLINE } from './constants';
import { Product, CartItem, Category } from './types';

const App: React.FC = () => {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isAiOpen, setIsAiOpen] = useState(false);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'All') return products;
    return products.filter(p => p.category === activeCategory);
  }, [products, activeCategory]);

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

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
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

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col selection:bg-stone-200 scroll-smooth">
      <Navbar 
        cartCount={cartCount} 
        onOpenCart={() => setIsCartOpen(true)} 
        onOpenAi={() => setIsAiOpen(true)} 
      />

      <main className="flex-grow">
        {/* Cinematic Hero Section */}
        <section className="relative min-h-[95vh] flex flex-col items-center justify-center px-6 overflow-hidden">
          {/* Background Layer with Zoom */}
          <div className="absolute inset-0 z-0">
            <img 
              src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?q=80&w=2832&auto=format&fit=crop" 
              className="w-full h-full object-cover animate-ken-burns opacity-60"
              alt="Background Interior"
            />
            {/* Gradients to blend text */}
            <div className="absolute inset-0 hero-overlay"></div>
            <div className="absolute inset-0 bg-stone-900/5"></div>
          </div>

          <div className="max-w-5xl w-full text-center z-10">
            <span className="reveal-text text-[11px] tracking-[0.5em] uppercase text-stone-500 mb-8 block font-bold">
              EST. MMXXIV • THE CURATED HOME
            </span>
            <h2 className="reveal-text delay-1 text-8xl md:text-[13rem] serif mb-6 leading-[0.8] tracking-tighter text-[#1C1C1C]">
              {SHOP_NAME}
            </h2>
            
            {/* Centered Stacked Tagline and Button */}
            <div className="reveal-text delay-2 flex flex-col items-center justify-center gap-10 mt-12">
              <p className="text-xl md:text-2xl text-[#1C1C1C] max-w-lg italic serif font-light text-center leading-relaxed">
                {SHOP_TAGLINE}
              </p>
              
              <button 
                onClick={() => document.getElementById('collection')?.scrollIntoView({ behavior: 'smooth' })}
                className="group relative text-xs font-bold tracking-[0.4em] uppercase pb-2 transition-all"
              >
                Explore Collection
                <span className="absolute bottom-0 left-0 w-full h-[1.5px] bg-black scale-x-100 group-hover:scale-x-50 transition-transform duration-500"></span>
              </button>
            </div>
          </div>
          
          {/* Scroll Indicator */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 reveal-text delay-3 flex flex-col items-center gap-4">
            <span className="text-[9px] tracking-[0.3em] uppercase font-bold text-stone-400">Scroll</span>
            <div className="w-px h-16 bg-gradient-to-b from-stone-300 to-transparent"></div>
          </div>
        </section>

        {/* Collection Section */}
        <section id="collection" className="max-w-7xl mx-auto w-full px-6 py-32">
          {/* Centered Catalogue & Objects of Desire */}
          <div className="flex flex-col items-center text-center mb-16">
            <div className="mb-12">
              <span className="text-[10px] tracking-[0.4em] uppercase text-stone-400 font-bold block mb-4">Catalogue</span>
              <h3 className="text-5xl md:text-7xl serif italic leading-tight text-[#1C1C1C]">Objects of Desire</h3>
            </div>
            
            {/* Category Buttons: Inline Flex on small, Grid/Block structure on larger screens with unified gap */}
            <div className="flex flex-wrap justify-center gap-12 w-full max-w-4xl">
              {CATEGORIES.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`relative px-2 py-4 text-[11px] tracking-[0.4em] font-bold transition-all duration-500 uppercase whitespace-nowrap ${
                    activeCategory === cat 
                      ? 'text-[#1C1C1C]' 
                      : 'text-stone-400 hover:text-stone-600'
                  }`}
                >
                  {cat}
                  {activeCategory === cat && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-[2px] bg-[#1C1C1C] animate-fade-in"></span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Product Grid - Using gap-12 to match the button section gap */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {filteredProducts.map(product => (
              <ProductCard 
                key={product.id} 
                product={product} 
                onAddToCart={() => addToCart(product)} 
              />
            ))}
          </div>
        </section>

        {/* Section: Reflections (Testimonials) */}
        <section className="bg-[#1C1C1C] text-white py-40 px-6 overflow-hidden relative">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center mb-32 space-y-6">
              <span className="text-[10px] tracking-[0.5em] uppercase text-stone-500 font-bold">Reflections</span>
              <h3 className="text-5xl md:text-6xl serif italic">In the words of our community</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-24">
              {[
                { 
                  quote: "Lumina doesn't just sell furniture; they offer a sense of calm. My living room feels like a gallery of peace now.", 
                  author: "Elena Vance", 
                  title: "Interior Architect" 
                },
                { 
                  quote: "The travertine coffee table is a masterpiece. The weight and texture are unlike anything I've found in mass retail.", 
                  author: "Julian Thorne", 
                  title: "Collector" 
                },
                { 
                  quote: "Minimalism is easy to do, but difficult to do right. Lumina hits that perfect note of warmth and restraint.", 
                  author: "Sasha Grey", 
                  title: "Creative Director" 
                }
              ].map((t, idx) => (
                <div key={idx} className="flex flex-col space-y-8 relative">
                  <span className="absolute -top-10 -left-6 text-9xl font-serif text-white/5 select-none pointer-events-none">"</span>
                  <p className="text-xl md:text-2xl serif italic leading-relaxed text-stone-300 relative z-10">"{t.quote}"</p>
                  <div className="pt-8 border-t border-white/10">
                    <h5 className="text-[11px] font-bold tracking-[0.3em] uppercase">{t.author}</h5>
                    <p className="text-[10px] text-stone-500 uppercase tracking-widest mt-2">{t.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Floating abstract decorative shape */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>
        </section>
      </main>

      {/* Cart Drawer */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cart}
        onRemove={removeFromCart}
        onUpdateQuantity={updateQuantity}
      />

      {/* AI Assistant */}
      <AiAssistant 
        isOpen={isAiOpen} 
        onClose={() => setIsAiOpen(false)} 
        products={products}
      />

      <footer className="bg-white border-t border-stone-100 py-32 px-6 mt-0">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20">
          <div className="md:col-span-2 space-y-8">
            <h4 className="text-3xl serif tracking-[0.2em] uppercase font-bold">{SHOP_NAME}</h4>
            <p className="text-stone-400 text-base max-w-sm leading-relaxed mb-8 italic serif">
              A design studio focused on minimalist aesthetics and high-quality materials. We believe your home should be a reflection of your inner calm.
            </p>
            <div className="flex items-center gap-6">
               <div className="w-12 h-12 border border-stone-100 rounded-full flex items-center justify-center text-stone-400 hover:text-black hover:border-black transition-all cursor-pointer group">
                 <span className="text-[10px] font-bold tracking-widest group-hover:scale-110 transition-transform">IG</span>
               </div>
               <div className="w-12 h-12 border border-stone-100 rounded-full flex items-center justify-center text-stone-400 hover:text-black hover:border-black transition-all cursor-pointer group">
                 <span className="text-[10px] font-bold tracking-widest group-hover:scale-110 transition-transform">PT</span>
               </div>
               <div className="w-12 h-12 border border-stone-100 rounded-full flex items-center justify-center text-stone-400 hover:text-black hover:border-black transition-all cursor-pointer group">
                 <span className="text-[10px] font-bold tracking-widest group-hover:scale-110 transition-transform">X</span>
               </div>
            </div>
          </div>
          <div className="space-y-8">
            <h5 className="text-[11px] font-bold tracking-[0.3em] uppercase text-stone-500">Shop</h5>
            <ul className="text-xs space-y-5 text-stone-600 font-medium">
              <li><a href="#" className="hover:text-black transition-colors tracking-widest">Our Story</a></li>
              <li><a href="#" className="hover:text-black transition-colors tracking-widest">Sustainability</a></li>
              <li><a href="#" className="hover:text-black transition-colors tracking-widest">Journal</a></li>
              <li><a href="#" className="hover:text-black transition-colors tracking-widest">Contact</a></li>
            </ul>
          </div>
          <div className="space-y-8">
            <h5 className="text-[11px] font-bold tracking-[0.3em] uppercase text-stone-500">Service</h5>
            <ul className="text-xs space-y-5 text-stone-600 font-medium">
              <li><a href="#" className="hover:text-black transition-colors tracking-widest">Shipping & Returns</a></li>
              <li><a href="#" className="hover:text-black transition-colors tracking-widest">FAQ</a></li>
              <li><a href="#" className="hover:text-black transition-colors tracking-widest">Gift Cards</a></li>
              <li><a href="#" className="hover:text-black transition-colors tracking-widest">Order Tracking</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-32 flex flex-col md:flex-row justify-between items-center gap-12 border-t border-stone-50 mt-24">
          <p className="text-[10px] tracking-[0.3em] text-stone-400 uppercase font-bold">© 2024 {SHOP_NAME} Boutique. Handcrafted for the thoughtful home.</p>
          <div className="flex gap-12 text-[10px] tracking-[0.3em] font-bold text-stone-400 uppercase">
             <span className="cursor-pointer hover:text-black transition-colors">Terms</span>
             <span className="cursor-pointer hover:text-black transition-colors">Privacy</span>
             <span className="cursor-pointer hover:text-black transition-colors">Cookies</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
