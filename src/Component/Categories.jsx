import React from "react";
import {
    SlidersHorizontal,
    ChevronRight,
    ChevronLeft,
    Heart,
    ShoppingBag,
} from "lucide-react";
import { motion } from "framer-motion";
import { useCart } from "./CartContext";

// Mock data integration
import { products, trendingProducts } from "../data/CategoriesData";

const Hero = () => (
    <div className="relative h-[400px] w-full bg-gray-100 overflow-hidden">
        <img
            src="https://images.unsplash.com/photo-1618886487325-f665032b6352?q=80&w=2000&auto=format&fit=crop"
            alt="Summer Collection"
            className="absolute inset-0 w-full h-full object-cover object-top opacity-90"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/50 to-transparent">
            <div className="max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
                <div className="text-sm text-gray-500 mb-4 flex items-center gap-2">
                    <span>Home</span>
                    <ChevronRight size={14} />
                    <span>Shop</span>
                    <ChevronRight size={14} />
                    <span className="text-black">Men's Collection</span>
                </div>
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-5xl md:text-6xl font-serif mb-4"
                >
                    Summer Collection 2026
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.1 }}
                    className="text-gray-600 max-w-sm text-lg"
                >
                    Discover elevated essentials crafted for modern lifestyles.
                </motion.p>
            </div>
        </div>
    </div>
);

// Connected Product Card with Dynamic Cart Integration
const ProductCard = ({ product, onAddToCart }) => (
    <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
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
                    <span className="absolute top-3 left-3 bg-red-500 text-white text-[10px] font-bold px-2 py-1 tracking-wider z-10">
                        {product.tag}
                    </span>
                )}
                <button
                    aria-label="Add to Wishlist"
                    className="absolute top-3 right-3 w-8 h-8 bg-white rounded-full flex items-center justify-center text-gray-400 hover:text-red-500 shadow-sm opacity-0 group-hover:opacity-100 transition-all duration-300 z-10"
                >
                    <Heart size={16} />
                </button>
            </div>

            <div className="flex flex-col flex-grow">
                <h3 className="text-sm font-medium text-gray-900 mb-1">
                    {product.name}
                </h3>
                <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-semibold text-black">
                        ${product.price.toFixed(2)}
                    </span>
                    {product.oldPrice && (
                        <span className="text-sm text-gray-400 line-through">
                            ${product.oldPrice.toFixed(2)}
                        </span>
                    )}
                </div>
                <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                        <svg
                            key={i}
                            className={`w-3 h-3 ${
                                i < Math.floor(product.rating)
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                            }`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                        >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                    ))}
                    <span className="text-xs text-gray-500 ml-1">
                        ({product.reviews})
                    </span>
                </div>
                <div className="flex items-center gap-1.5 mb-4">
                    {product.colors?.map((c, i) => (
                        <div
                            key={i}
                            className="w-3.5 h-3.5 rounded-full border border-gray-300"
                            style={{ backgroundColor: c }}
                        />
                    ))}
                </div>
            </div>
        </div>

        {/* Dynamic CTA Integration */}
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

const MiniProductCard = ({ product, onAddToCart }) => (
    <div
        className="group cursor-pointer min-w-[160px] flex flex-col justify-between"
        onClick={() => onAddToCart(product)}
    >
        <div>
            <div className="aspect-[3/4] bg-gray-100 mb-3 overflow-hidden rounded-sm relative">
                <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
            </div>
            <h3 className="text-xs font-medium text-gray-900 truncate">
                {product.name}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
                ${product.price.toFixed(2)}
            </p>
        </div>
    </div>
);

const PromoBanner = () => (
    <div className="col-span-full my-8 bg-[#F5F2EF] rounded-sm overflow-hidden flex flex-col md:flex-row relative">
        <div className="md:w-1/2 p-12 flex flex-col justify-center z-10 relative">
            <div className="text-[10px] font-bold tracking-[0.2em] text-red-500 mb-4 uppercase">
                Limited Time Offer
            </div>
            <h2 className="text-4xl font-serif mb-4 text-black">
                Summer Sale
                <br />
                Up to 30% Off
            </h2>
            <p className="text-gray-600 mb-8 max-w-sm">
                Refreshing styles. Better prices.
            </p>
            <button className="bg-black text-white px-8 py-3 text-sm font-semibold hover:bg-gray-800 transition-colors self-start">
                SHOP THE SALE
            </button>
        </div>
        <div className="md:w-1/2 relative min-h-[300px]">
            <div className="absolute inset-0 bg-gradient-to-r from-[#F5F2EF] to-transparent z-10 w-1/4"></div>
            <img
                src="https://images.unsplash.com/photo-1516257984-b1b4d707412e?q=80&w=800&auto=format&fit=crop"
                alt="Sale"
                className="absolute inset-0 w-full h-full object-cover object-center"
            />
        </div>
    </div>
);

// Destructured onAddToCart Prop coming from App.jsx
function Categories() {
    const { addToCart } = useCart();
    return (
        <div className="min-h-screen bg-white font-sans text-gray-900">
            <style>{`
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

            <Hero />

            <main className="max-w-7xl mx-auto px-4 py-8">
                <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-gray-200">
                    <button className="lg:hidden flex items-center gap-2 px-4 py-2 bg-black text-white text-sm font-medium rounded-sm">
                        <SlidersHorizontal size={16} /> Filters
                    </button>
                    <div className="text-sm text-gray-500 hidden md:block">
                        Showing 1–12 of 240 Products
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

                {/* Grid linking live global system handler */}
                <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-12">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                            onAddToCart={addToCart}
                        />
                    ))}
                    <PromoBanner />
                </div>

                <div className="mt-16 flex justify-center">
                    <button className="border border-black text-black px-8 py-3 text-sm font-semibold hover:bg-black hover:text-white transition-colors">
                        LOAD MORE
                    </button>
                </div>

                {/* Trending Slider Connected dynamically */}
                <div className="mt-24">
                    <div className="flex justify-between items-end mb-6">
                        <h2 className="text-2xl font-serif font-semibold">
                            Trending Now
                        </h2>
                        <div className="flex items-center gap-2">
                            <span className="text-xs font-semibold uppercase tracking-wider mr-2">
                                Click Item to Quick Add
                            </span>
                            <button
                                aria-label="Scroll Left"
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:border-black transition-colors"
                            >
                                <ChevronLeft size={16} />
                            </button>
                            <button
                                aria-label="Scroll Right"
                                className="w-8 h-8 flex items-center justify-center border border-gray-300 rounded-full hover:border-black transition-colors"
                            >
                                <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                    <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-hide snap-x">
                        {trendingProducts.map((product) => (
                            <div key={product.id} className="snap-start">
                                <MiniProductCard
                                    product={product}
                                    onAddToCart={addToCart}
                                />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Newsletter layout */}
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
