import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ChevronLeft,
    ChevronRight,
    Star,
    Instagram,
    ArrowRight,
    ArrowUpRight,
    Heart,
    Award,
    Truck,
    Leaf,
} from "lucide-react";
import { useCart } from "./CartContext";

import {
    categories,
    bestSellers,
    newArrivals,
    testimonials,
    instagramPosts,
    features,
} from "../data/mockData";

// Map string names to actual Lucide Icon components
const iconMap = {
    Award,
    Truck,
    Leaf,
};

// ============================================
// HERO COMPONENT
// ============================================
const Hero = () => (
    <section className="relative h-[88vh] min-h-[600px] w-full overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
            <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=2000&q=80"
                alt="LUXORA Hero — modern fashion editorial"
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-black/10" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </div>

        {/* Content */}
        <div className="relative h-full mx-auto max-w-[1400px] px-5 lg:px-10 flex flex-col justify-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="max-w-2xl text-white"
            >
                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1, duration: 0.6 }}
                    className="inline-block text-[11px] tracking-[0.3em] font-medium mb-5 border-b border-white/40 pb-2"
                >
                    SPRING / SUMMER 2024
                </motion.span>

                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="font-serif text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.05] tracking-tight"
                >
                    Redefining
                    <br />
                    Modern Fashion
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    className="mt-6 max-w-md text-base md:text-lg text-white/85 leading-relaxed"
                >
                    Premium clothing designed for confidence, comfort, and
                    style. Crafted with intention, made to last.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55, duration: 0.6 }}
                    className="mt-9 flex flex-wrap gap-3"
                >
                    <a
                        href="#best-sellers"
                        className="group inline-flex items-center gap-2 bg-white text-black px-7 py-3.5 text-[12px] font-semibold tracking-[0.15em] hover:bg-black hover:text-white transition-all duration-300"
                    >
                        SHOP COLLECTION
                        <ArrowRight
                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                            strokeWidth={2}
                        />
                    </a>
                    <a
                        href="/categories"
                        className="group inline-flex items-center gap-2 border border-white/70 text-white px-7 py-3.5 text-[12px] font-semibold tracking-[0.15em] hover:bg-white hover:text-black transition-all duration-300 backdrop-blur-sm"
                    >
                        EXPLORE LOOKBOOK
                        <ArrowRight
                            className="h-4 w-4 transition-transform group-hover:translate-x-1"
                            strokeWidth={2}
                        />
                    </a>
                </motion.div>
            </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute bottom-7 left-1/2 -translate-x-1/2 text-white/70 text-[10px] tracking-[0.3em] flex flex-col items-center gap-2"
        >
            <span>SCROLL</span>
            <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{
                    repeat: Infinity,
                    duration: 1.6,
                    ease: "easeInOut",
                }}
                className="w-px h-7 bg-white/50"
            />
        </motion.div>
    </section>
);

// ============================================
// OTHER COMPONENTS
// ============================================
const CategoryGrid = () => (
    <section id="categories" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {categories.map((cat, i) => (
                <motion.div
                    key={cat.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="relative group cursor-pointer overflow-hidden aspect-[3/4]"
                >
                    <img
                        src={cat.img}
                        alt={cat.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors" />
                    <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                        <h3 className="font-serif text-2xl mb-2">
                            {cat.title}
                        </h3>
                        <span className="text-xs tracking-widest flex items-center gap-2 group-hover:gap-3 transition-all">
                            SHOP NOW <ArrowRight size={14} />
                        </span>
                    </div>
                </motion.div>
            ))}
        </div>
    </section>
);

const ProductCard = ({ product, onAddToCart }) => {
    const [isLiked, setIsLiked] = useState(false);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="group"
        >
            <div className="relative overflow-hidden bg-gray-100 aspect-[3/4] mb-3">
                <img
                    src={product.img}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <button
                    onClick={() => setIsLiked(!isLiked)}
                    className="absolute top-3 right-3 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill={isLiked ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={isLiked ? "text-red-500" : "text-gray-600"}
                    >
                        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                    </svg>
                </button>
                <motion.button
                    initial={{ opacity: 0, y: 20 }}
                    whileHover={{ scale: 1.02 }}
                    className="absolute bottom-0 left-0 right-0 bg-white/90 backdrop-blur-sm py-3 text-xs font-medium tracking-wider translate-y-full group-hover:translate-y-0 transition-transform duration-300"
                    onClick={() => onAddToCart(product)}
                >
                    QUICK ADD
                </motion.button>
            </div>
            <h4 className="text-sm font-medium text-gray-900">
                {product.name}
            </h4>
            {product.rating && (
                <div className="flex items-center gap-1 mt-1">
                    <div className="flex text-yellow-500">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={12}
                                fill={
                                    i < Math.floor(product.rating)
                                        ? "currentColor"
                                        : "none"
                                }
                            />
                        ))}
                    </div>
                    <span className="text-xs text-gray-500">
                        ({product.reviews})
                    </span>
                </div>
            )}
            <p className="text-sm font-semibold mt-1">${product.price}.00</p>
        </motion.div>
    );
};

const BestSellers = ({ onAddToCart }) => (
    <section id="best-sellers" className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="flex justify-between items-end mb-8">
            <h2 className="text-sm font-medium tracking-widest">
                BEST SELLERS
            </h2>
            <div className="flex items-center gap-4">
                <a
                    href="#"
                    className="text-xs tracking-widest hover:text-[#c4a882] transition-colors"
                >
                    VIEW ALL
                </a>
                <div className="flex gap-2">
                    <button className="p-1 hover:text-[#c4a882]">
                        <ChevronLeft size={18} />
                    </button>
                    <button className="p-1 hover:text-[#c4a882]">
                        <ChevronRight size={18} />
                    </button>
                </div>
            </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {bestSellers.map((product) => (
                <ProductCard
                    key={product.id}
                    product={product}
                    onAddToCart={onAddToCart}
                />
            ))}
        </div>
    </section>
);

const NewArrivals = () => {
    const scrollRef = useRef(null);

    const scroll = (dir) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: dir * 300, behavior: "smooth" });
        }
    };

    return (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
            <div className="flex justify-between items-end mb-8">
                <h2 className="text-sm font-medium tracking-widest">
                    NEW ARRIVALS
                </h2>
                <div className="flex items-center gap-4">
                    <a
                        href="#"
                        className="text-xs tracking-widest hover:text-[#c4a882] transition-colors"
                    >
                        VIEW ALL
                    </a>
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll(-1)}
                            className="p-1 hover:text-[#c4a882]"
                        >
                            <ChevronLeft size={18} />
                        </button>
                        <button
                            onClick={() => scroll(1)}
                            className="p-1 hover:text-[#c4a882]"
                        >
                            <ChevronRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto hide-scrollbar pb-4"
            >
                {newArrivals.map((product) => (
                    <div key={product.id} className="flex-shrink-0 w-[200px]">
                        <div className="relative overflow-hidden bg-gray-100 aspect-[3/4] mb-3">
                            <img
                                src={product.img}
                                alt={product.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <h4 className="text-sm font-medium">{product.name}</h4>
                        <p className="text-sm font-semibold mt-1">
                            ${product.price}.00
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
};

const TrendingBanner = () => (
    <section className="relative h-[500px] overflow-hidden">
        <img
            src="https://images.unsplash.com/photo-1485230405346-71acb9518d9c?w=1600&h=800&fit=crop"
            alt="Trending"
            className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
        <div className="absolute inset-0 flex items-center justify-end">
            <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="max-w-md mr-8 sm:mr-16 lg:mr-32 text-white text-right"
            >
                <span className="text-xs tracking-widest text-[#c4a882] mb-2 block">
                    SUMMER 2024
                </span>
                <h2 className="font-serif text-4xl sm:text-5xl mb-4">
                    The Trending
                    <br />
                    Collection
                </h2>
                <p className="text-white/80 mb-6 text-sm leading-relaxed">
                    Elevated essentials for sun-soaked days
                    <br />
                    and effortless nights.
                </p>
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[#1a1a1a] text-white px-8 py-3 text-xs font-medium tracking-wider hover:bg-gray-800 transition-colors"
                >
                    SHOP THE COLLECTION
                </motion.button>
            </motion.div>
        </div>
    </section>
);

const BrandStory = () => {
    return (
        <section className="py-20 lg:py-28 bg-[#f6f4ef]">
            <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
                <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                    {/* Text */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.6 }}
                    >
                        <span className="text-[11px] tracking-[0.3em] text-black/50 font-medium">
                            OUR STORY
                        </span>
                        <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium mt-4 leading-tight tracking-tight">
                            Crafted for Quality.
                            <br />
                            Designed for Life.
                        </h2>
                        <p className="mt-6 text-base text-black/70 leading-relaxed max-w-lg">
                            At LUXORA, we believe great style begins with
                            thoughtful design, premium materials, and ethical
                            craftsmanship. We create timeless pieces that
                            elevate your everyday — garments made to be lived
                            in, loved, and passed on.
                        </p>

                        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-5">
                            {features.map((f, i) => {
                                const IconComponent = iconMap[f.icon];
                                return (
                                    <motion.div
                                        key={f.title}
                                        initial={{ opacity: 0, y: 20 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.1 + i * 0.1 }}
                                        className="flex flex-col gap-2"
                                    >
                                        {IconComponent && (
                                            <IconComponent
                                                className="h-6 w-6 text-black/80"
                                                strokeWidth={1.3}
                                            />
                                        )}
                                        <h4 className="text-[13px] font-semibold tracking-wide">
                                            {f.title}
                                        </h4>
                                        <p className="text-[12px] text-black/55 leading-snug">
                                            {f.text}
                                        </p>
                                    </motion.div>
                                );
                            })}
                        </div>

                        <a
                            href="#"
                            className="group inline-flex items-center gap-2 mt-10 text-[12px] tracking-[0.15em] font-semibold border-b border-black pb-1 hover:gap-3 transition-all"
                        >
                            LEARN MORE
                            <ArrowRight className="h-4 w-4" strokeWidth={2} />
                        </a>
                    </motion.div>

                    {/* Image */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.97 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true, margin: "-80px" }}
                        transition={{ duration: 0.7 }}
                        className="relative aspect-[4/5] overflow-hidden"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=1200&q=80"
                            alt="LUXORA atelier — craftsmanship in detail"
                            className="w-full h-full object-cover"
                            loading="lazy"
                        />
                        <div className="absolute bottom-5 left-5 right-5 bg-white/95 backdrop-blur px-5 py-4 flex items-center justify-between">
                            <div>
                                <p className="font-serif text-2xl font-semibold">
                                    15+
                                </p>
                                <p className="text-[11px] tracking-[0.2em] text-black/55">
                                    YEARS OF CRAFT
                                </p>
                            </div>
                            <div className="h-10 w-px bg-black/10" />
                            <div>
                                <p className="font-serif text-2xl font-semibold">
                                    40k+
                                </p>
                                <p className="text-[11px] tracking-[0.2em] text-black/55">
                                    HAPPY CUSTOMERS
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const Testimonials = () => {
    const [current, setCurrent] = useState(0);

    const next = () => setCurrent((prev) => (prev + 1) % testimonials.length);
    const prev = () =>
        setCurrent(
            (prev) => (prev - 1 + testimonials.length) % testimonials.length
        );

    return (
        <section className="bg-[#f5f0eb] py-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <span className="text-xs tracking-widest text-gray-500 mb-8 block">
                    WHAT OUR CUSTOMERS SAY
                </span>
                <div className="relative">
                    <div className="flex items-center justify-between">
                        <button
                            onClick={prev}
                            className="p-2 hover:text-[#c4a882] transition-colors"
                        >
                            <ChevronLeft size={24} />
                        </button>
                        <div className="overflow-hidden max-w-4xl mx-auto">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={current}
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -50 }}
                                    className="grid md:grid-cols-3 gap-8"
                                >
                                    {testimonials.map((t) => (
                                        <div
                                            key={t.id}
                                            className="bg-white p-6 shadow-sm"
                                        >
                                            <div className="flex items-center gap-3 mb-4">
                                                <img
                                                    src={t.img}
                                                    alt={t.name}
                                                    className="w-12 h-12 rounded-full object-cover"
                                                />
                                                <div>
                                                    <h4 className="text-sm font-medium">
                                                        {t.name}
                                                    </h4>
                                                    <div className="flex text-yellow-500">
                                                        {[
                                                            ...Array(t.rating),
                                                        ].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                size={12}
                                                                fill="currentColor"
                                                            />
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                            <p className="text-sm text-gray-600 italic">
                                                "{t.text}"
                                            </p>
                                        </div>
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                        </div>
                        <button
                            onClick={next}
                            className="p-2 hover:text-[#c4a882] transition-colors"
                        >
                            <ChevronRight size={24} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

const InstagramFeed = () => {
    return (
        <section className="py-20 lg:py-24 bg-white border-t border-black/5">
            <div className="mx-auto max-w-[1400px] px-5 lg:px-10">
                <div className="text-center mb-10">
                    <span className="text-[11px] tracking-[0.3em] text-black/50 font-medium">
                        @LUXORA
                    </span>
                    <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-medium mt-3 tracking-tight">
                        Follow Us on Instagram
                    </h2>
                    <a
                        href="#"
                        className="inline-flex items-center gap-1.5 text-[12px] tracking-[0.15em] font-medium text-black/70 hover:text-black mt-4 group"
                    >
                        <Instagram className="h-4 w-4" strokeWidth={1.5} />
                        VIEW INSTAGRAM
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                    </a>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-3">
                    {instagramPosts.map((post, i) => (
                        <motion.a
                            key={post.id}
                            href="#"
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-30px" }}
                            transition={{
                                duration: 0.4,
                                delay: (i % 6) * 0.05,
                            }}
                            className="group relative aspect-square overflow-hidden bg-neutral-100"
                        >
                            <img
                                src={post.image}
                                alt={`LUXORA Instagram post ${post.id}`}
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-1 text-white">
                                    <Heart className="h-5 w-5 fill-white" />
                                    <span className="text-[11px] font-medium">
                                        {post.likes}
                                    </span>
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Newsletter = () => (
    <section className="py-20 text-center">
        <div className="max-w-xl mx-auto px-4">
            <span className="text-xs tracking-widest text-gray-500 mb-2 block">
                JOIN THE LUXORA CLUB
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl mb-4">
                Be the first to know
            </h2>
            <p className="text-gray-600 text-sm mb-8">
                Get exclusive access to new arrivals, special offers, and style
                inspiration.
            </p>
            <form
                className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                onSubmit={(e) => e.preventDefault()}
            >
                <input
                    type="email"
                    placeholder="Enter your email address"
                    className="flex-1 px-4 py-3 border border-gray-300 text-sm focus:outline-none focus:border-[#1a1a1a] transition-colors"
                />
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="bg-[#1a1a1a] text-white px-8 py-3 text-xs font-medium tracking-wider hover:bg-gray-800 transition-colors"
                >
                    SUBSCRIBE
                </motion.button>
            </form>
            <p className="text-[10px] text-gray-400 mt-4">
                By subscribing, you agree to our Privacy Policy.
            </p>
        </div>
    </section>
);

// ============================================
// MAIN COMPONENT
// ============================================
function Main() {
    const { addToCart } = useCart();
    return (
        <div className="min-h-screen bg-white font-sans">
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600;700&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

            <Hero />
            <CategoryGrid />
            <BestSellers onAddToCart={addToCart} />
            <NewArrivals />
            <TrendingBanner />
            <BrandStory />
            <Testimonials />
            <InstagramFeed />
            <Newsletter />
        </div>
    );
}

export default Main;
