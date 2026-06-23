import React, { useState, useRef } from "react";
import {
    SlidersHorizontal,
    ChevronRight,
    ChevronLeft,
    Heart,
    ShoppingBag,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
// Men's data
import { products as mensProducts, trendingProducts as mensTrending } from "../data/CategoriesData";
// Women's data
import { products as womensProducts, trendingProducts as womensTrending } from "../data/WomenCategoriesData";

// ─── Hero configs ────────────────────────────────────────────────────
const heroConfig = {
    all: {
        image:
            "https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2000&auto=format&fit=crop",
        alt: "All Collections",
        breadcrumb: "All Collections",
        title: "New Season Arrivals",
        subtitle: "Explore the full collection — men's and women's, all in one place.",
    },
    women: {
        image:
            "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?q=80&w=2000&auto=format&fit=crop",
        alt: "Women's Collection",
        breadcrumb: "Women's Collection",
        title: "Women's Collection 2026",
        subtitle: "Timeless pieces designed for effortless elegance.",
    },
    men: {
        image:
            "https://images.unsplash.com/photo-1618886487325-f665032b6352?q=80&w=2000&auto=format&fit=crop",
        alt: "Men's Collection",
        breadcrumb: "Men's Collection",
        title: "Summer Collection 2026",
        subtitle: "Discover elevated essentials crafted for modern lifestyles.",
    },
};

// ─── Hero ────────────────────────────────────────────────────────────
const Hero = ({ filter }) => {
    const cfg = heroConfig[filter];
    return (
        <div className="relative h-[400px] w-full bg-gray-100 overflow-hidden">
            <AnimatePresence mode="wait">
                <motion.img
                    key={cfg.image}
                    src={cfg.image}
                    alt={cfg.alt}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 0.9 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="absolute inset-0 w-full h-full object-cover object-top"
                />
            </AnimatePresence>

            <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent">
                <div className="max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
                    <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                        <span>Home</span>
                        <ChevronRight size={14} />
                        <span>Shop</span>
                        <ChevronRight size={14} />
                        <span className="text-black">{cfg.breadcrumb}</span>
                    </div>
                    <AnimatePresence mode="wait">
                        <motion.h1
                            key={cfg.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="text-5xl md:text-6xl font-serif mb-4"
                        >
                            {cfg.title}
                        </motion.h1>
                    </AnimatePresence>
                    <AnimatePresence mode="wait">
                        <motion.p
                            key={cfg.subtitle}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-gray-600 max-w-sm text-lg"
                        >
                            {cfg.subtitle}
                        </motion.p>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

const ProductCard = ({ product, onAddToCart }) => {
    const navigate = useNavigate();

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4 }}
            onClick={() => navigate(`/product/${product.id}`, { state: { product } })}
            className="group cursor-pointer flex flex-col justify-between h-full"
        >
            <div className="flex flex-col flex-grow">
                <div className="relative aspect-[3/4] bg-gray-100 mb-4 overflow-hidden rounded-sm">
                    <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    {product.tag && (
                        <span
                            className={`absolute top-3 left-3 text-white text-[10px] font-bold px-2 py-1 tracking-wider z-10 ${
                                product.tag === "SALE" ? "bg-red-500" : "bg-black"
                            }`}
                        >
                            {product.tag}
                        </span>
                    )}
                    {product.gender && (
                        <span className="absolute bottom-3 left-3 text-[9px] font-bold px-2 py-0.5 tracking-widest z-10 uppercase bg-white/90 text-gray-800">
                            {product.gender === "women" ? "Women" : "Men"}
                        </span>
                    )}
                    <button
                        aria-label="Add to Wishlist"
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                    >
                        <Heart size={16} />
                    </button>
                </div>

                <div className="flex flex-col flex-grow">
                    <h3 className="text-sm font-medium text-gray-900 mb-1">{product.name}</h3>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm font-semibold text-black">${product.price.toFixed(2)}</span>
                        {product.oldPrice && (
                            <span className="text-sm text-gray-400 line-through">${product.oldPrice.toFixed(2)}</span>
                        )}
                    </div>
                    <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                            <svg key={i} className={`w-3 h-3 ${i < Math.floor(product.rating) ? "text-yellow-400" : "text-gray-300"}`} fill="currentColor" viewBox="0 0 20 20">
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                        <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                    </div>
                    <div className="flex items-center gap-1.5 mb-4">
                        {product.colors?.map((c, i) => (
                            <div key={i} className="w-3.5 h-3.5 rounded-full border border-gray-300" style={{ backgroundColor: c }} />
                        ))}
                    </div>
                </div>
            </div>

            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onAddToCart(product);
                }}
                className="w-full bg-neutral-900 text-white text-xs font-semibold tracking-wider py-2.5 rounded-sm hover:bg-neutral-800 transition-colors flex items-center justify-center gap-2"
            >
                <ShoppingBag size={14} /> QUICK ADD
            </button>
        </motion.div>
    );
};

// --- REPLACE EXISTING MiniProductCard WITH THIS ---
const MiniProductCard = ({ product, showGender, onAddToCart }) => {
    const navigate = useNavigate();

    return (
        <div
            className="group cursor-pointer min-w-[160px] flex flex-col justify-between"
            onClick={(e) => {
                e.stopPropagation();
                onAddToCart(product); 
                navigate(`/product/${product.id}`, { state: { product } });
            }}
        >
            <div>
                <div className="aspect-[3/4] bg-gray-100 mb-3 overflow-hidden rounded-sm relative">
                    <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    {showGender && product.gender && (
                        <span className="absolute bottom-2 left-2 text-[9px] font-bold px-1.5 py-0.5 tracking-widest bg-white/90 text-gray-800 uppercase z-10">
                            {product.gender === "women" ? "Women" : "Men"}
                        </span>
                    )}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-end justify-center pb-4 opacity-0 group-hover:opacity-100">
                        <span className="bg-white text-black text-[10px] font-semibold tracking-wider px-4 py-2">VIEW DETAILS</span>
                    </div>
                </div>
                <h3 className="text-xs font-medium text-gray-900 truncate">{product.name}</h3>
                <p className="text-xs text-gray-500 mt-1">${product.price.toFixed(2)}</p>
            </div>
        </div>
    );
};

// ─── Promo Banner ────────────────────────────────────────────────────
const PromoBanner = ({ filter }) => {
    const isAll = filter === "all";
    const isWomen = filter === "women";

    return (
        <div className="col-span-full my-8 bg-[#F5F2EF] rounded-sm overflow-hidden flex flex-col md:flex-row relative">
            <div className="md:w-1/2 p-12 flex flex-col justify-center z-10 relative">
                <div className="text-[10px] font-bold tracking-[0.2em] text-red-500 mb-4 uppercase">
                    Limited Time Offer
                </div>
                <h2 className="text-4xl font-serif mb-4 text-black">
                    {isAll
                        ? "Summer Sale"
                        : isWomen
                        ? "Her Summer Sale"
                        : "His Summer Sale"}
                    <br />
                    Up to 30% Off
                </h2>
                <p className="text-gray-600 mb-8 max-w-sm">
                    {isAll
                        ? "Men's & women's styles at even better prices."
                        : isWomen
                        ? "Effortless styles at even better prices."
                        : "Refreshing styles. Better prices."}
                </p>
                <button className="bg-black text-white px-8 py-3 text-sm font-semibold hover:bg-gray-800 transition-colors self-start">
                    SHOP THE SALE
                </button>
            </div>
            <div className="md:w-1/2 relative min-h-[300px]">
                <div className="absolute inset-0 bg-gradient-to-r from-[#F5F2EF] to-transparent z-10 w-1/4" />
                <AnimatePresence mode="wait">
                    <motion.img
                        key={filter + "-promo"}
                        src={
                            isAll
                                ? "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?q=80&w=800&auto=format&fit=crop"
                                : isWomen
                                ? "https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=800&auto=format&fit=crop"
                                : "https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=800&auto=format&fit=crop"
                        }
                        alt="Sale"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.4 }}
                        className="absolute inset-0 w-full h-full object-cover object-center"
                    />
                </AnimatePresence>
            </div>
        </div>
    );
};

// ─── Main Categories Component ───────────────────────────────────────
function Categories() {
    const { addToCart } = useCart();
    const [filter, setFilter] = useState("all");
    const trendingRef = useRef(null);

    // Tag each product with its gender for the "all" view
    const taggedWomens = womensProducts.map((p) => ({ ...p, gender: "women" }));
    const taggedMens = mensProducts.map((p) => ({ ...p, gender: "men" }));
    const taggedWomensTrending = womensTrending.map((p) => ({
        ...p,
        gender: "women",
    }));
    const taggedMensTrending = mensTrending.map((p) => ({
        ...p,
        gender: "men",
    }));

    // Interleave: woman, man, woman, man... for a natural mixed feel
    const interleavedProducts = [];
    const maxLen = Math.max(taggedWomens.length, taggedMens.length);
    for (let i = 0; i < maxLen; i++) {
        if (i < taggedWomens.length) interleavedProducts.push(taggedWomens[i]);
        if (i < taggedMens.length) interleavedProducts.push(taggedMens[i]);
    }

    const interleavedTrending = [];
    const maxTrend = Math.max(
        taggedWomensTrending.length,
        taggedMensTrending.length
    );
    for (let i = 0; i < maxTrend; i++) {
        if (i < taggedWomensTrending.length)
            interleavedTrending.push(taggedWomensTrending[i]);
        if (i < taggedMensTrending.length)
            interleavedTrending.push(taggedMensTrending[i]);
    }

    // Resolve active lists
    const activeProducts =
        filter === "all"
            ? interleavedProducts
            : filter === "women"
            ? taggedWomens
            : taggedMens;

    const activeTrending =
        filter === "all"
            ? interleavedTrending
            : filter === "women"
            ? taggedWomensTrending
            : taggedMensTrending;

    const showGenderBadge = filter === "all";

    // Scroll trending slider
    const scrollTrending = (direction) => {
        if (!trendingRef.current) return;
        const amount = direction === "left" ? -340 : 340;
        trendingRef.current.scrollBy({ left: amount, behavior: "smooth" });
    };

    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            <style>{`
                .scrollbar-hide::-webkit-scrollbar { display: none; }
                .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
            `}</style>

            {/* Dynamic Hero */}
            <Hero filter={filter} />

            <main className="max-w-7xl mx-auto px-4 py-8">
                {/* ── Filter Tabs ────────────────────────────────────── */}
                <div className="flex gap-0 border-b border-gray-200 mb-8">
                    {[
                        { key: "all", label: "ALL" },
                        { key: "women", label: "WOMEN" },
                        { key: "men", label: "MEN" },
                    ].map((tab) => (
                        <button
                            key={tab.key}
                            onClick={() => setFilter(tab.key)}
                            className={`relative px-8 py-3 text-sm font-semibold tracking-wider transition-colors ${
                                filter === tab.key
                                    ? "text-black"
                                    : "text-gray-400 hover:text-gray-700"
                            }`}
                        >
                            {tab.label}
                            {filter === tab.key && (
                                <motion.span
                                    layoutId="filterTab"
                                    className="absolute bottom-0 left-0 right-0 h-[2px] bg-black"
                                    transition={{
                                        type: "spring",
                                        stiffness: 400,
                                        damping: 30,
                                    }}
                                />
                            )}
                        </button>
                    ))}
                </div>

                {/* ── Active filter pill (only when not "all") ──────── */}
                <AnimatePresence>
                    {filter !== "all" && (
                        <motion.div
                            initial={{ opacity: 0, y: -8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -8 }}
                            className="flex items-center gap-2 mb-6"
                        >
                            <span className="inline-flex items-center gap-1.5 bg-gray-100 text-xs font-semibold tracking-wider text-gray-700 px-3 py-1.5 rounded-full">
                                {filter === "women" ? "WOMEN" : "MEN"}
                                <button
                                    onClick={() => setFilter("all")}
                                    className="ml-1 text-gray-400 hover:text-black transition-colors"
                                    aria-label="Clear filter"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="14"
                                        height="14"
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    >
                                        <line x1="18" y1="6" x2="6" y2="18" />
                                        <line x1="6" y1="6" x2="18" y2="18" />
                                    </svg>
                                </button>
                            </span>
                            <span className="text-xs text-gray-400">
                                {activeProducts.length} products
                            </span>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* ── Toolbar ────────────────────────────────────────── */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200">
                    <button className="lg:hidden flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-sm">
                        <SlidersHorizontal size={16} /> Filters
                    </button>
                    <div className="text-sm text-gray-500 hidden md:block">
                        Showing 1–{activeProducts.length} of{" "}
                        {filter === "all" ? "480" : "240"} Products
                    </div>
                    <div className="flex items-center gap-4 ml-auto">
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-500">
                                Sort by:
                            </span>
                            <select className="border border-gray-300 text-sm py-1.5 px-3 rounded-sm focus:outline-none focus:border-black bg-white cursor-pointer">
                                <option>Featured</option>
                                <option>New Arrivals</option>
                                <option>Price: Low to High</option>
                                <option>Price: High to Low</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* ── Product Grid ───────────────────────────────────── */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={filter}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -12 }}
                        transition={{ duration: 0.35 }}
                        className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12"
                    >
                        {activeProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                                onAddToCart={addToCart}
                            />
                        ))}
                        <PromoBanner filter={filter} />
                    </motion.div>
                </AnimatePresence>

                {/* ── Load More ──────────────────────────────────────── */}
                <div className="mt-16 flex justify-center">
                    <button className="border border-black text-black px-8 py-3 text-sm font-semibold hover:bg-black hover:text-white transition-colors">
                        LOAD MORE
                    </button>
                </div>

                {/* ── Trending Now ───────────────────────────────────── */}
                <div className="mt-24">
                    <div className="flex justify-between items-end mb-6">
                        <div>
                            <h2 className="text-2xl font-serif font-semibold">
                                Trending Now
                            </h2>
                            <p className="text-xs text-gray-400 mt-1 tracking-wider uppercase">
                                {filter === "all"
                                    ? "Men's & Women's Picks"
                                    : filter === "women"
                                    ? "Women's Picks"
                                    : "Men's Picks"}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold uppercase tracking-wider mr-2 text-gray-400">
                                Click to Quick Add
                            </span>
                            <button
                                aria-label="Scroll Left"
                                onClick={() => scrollTrending("left")}
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:border-black transition-colors"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                aria-label="Scroll Right"
                                onClick={() => scrollTrending("right")}
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:border-black transition-colors"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>

                    <AnimatePresence mode="wait">
                        <motion.div
                            key={filter + "-trending"}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            ref={trendingRef}
                            className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x"
                        >
                            {activeTrending.map((product) => (
                                <div key={product.id} className="snap-start">
                                    <MiniProductCard
                                        product={product}
                                        showGender={showGenderBadge}
                                        onAddToCart={addToCart}
                                    />
                                </div>
                            ))}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* ── Newsletter ─────────────────────────────────────── */}
                <div className="mt-24 py-16 border-t border-b border-gray-200 text-center">
                    <h2 className="text-3xl font-serif mb-4">
                        Join The Luxora Club
                    </h2>
                    <p className="text-gray-500 mb-8 max-w-md mx-auto">
                        Get exclusive access to new arrivals, special offers,
                        and style inspiration.
                    </p>
                    <form
                        className="flex flex-col sm:flex-row max-w-md mx-auto gap-2"
                        onSubmit={(e) => e.preventDefault()}
                    >
                        <input
                            type="email"
                            placeholder="Enter your email address"
                            className="flex-1 border border-gray-300 px-4 py-3 text-sm focus:outline-none focus:border-black rounded-sm"
                            required
                        />
                        <button
                            type="submit"
                            className="bg-black text-white px-8 py-3 text-sm font-semibold hover:bg-gray-800 transition-colors rounded-sm"
                        >
                            SUBSCRIBE
                        </button>
                    </form>
                </div>
            </main>
        </div>
    );
}

export default Categories;

