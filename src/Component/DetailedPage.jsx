import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Minus, Plus, ChevronDown, ChevronUp, ShoppingBag, Check } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

// Import real product data to use for the "You may also like" section
import { products as mensProducts } from "../data/CategoriesData";
import { products as womensProducts } from "../data/WomenCategoriesData";

export default function DetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const passedProduct = location.state?.product;

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [openAccordion, setOpenAccordion] = useState(null);
  const [isAdded, setIsAdded] = useState(false);


  const product = passedProduct || {
    id: 1,
    name: "Oversized Wool Blend Coat",
    category: "Outerwear / Fall Collection",
    price: 245.00,
    image: null,
    customizable: true,
    description:
      "Crafted from a premium wool blend, this oversized coat offers a relaxed silhouette without compromising on structure. Designed with dropped shoulders and a notched lapel, it is the definitive piece for transitional dressing.",
    details: [
      { title: "Composition & Care", content: "70% Virgin Wool, 30% Polyamide. Dry clean only." },
      { title: "Sizing & Fit", content: "Designed for an intentional oversized fit. Model is 178cm wearing size M." },
      { title: "Shipping & Returns", content: "Complimentary standard shipping. Easy 14-day returns." }
    ]
  };

  const sizes = ["XS", "S", "M", "L", "XL"];


  const related = useMemo(() => {
    const allProducts = [...womensProducts, ...mensProducts];
    const filtered = allProducts.filter(p => p.id !== product.id);
    return filtered.slice(0, 4);
  }, [product.id]);

  const priceDisplay = useMemo(() => {
    return `$${(product.price * quantity).toFixed(2)}`;
  }, [quantity, product.price]);

  const handleQuantity = (type) => {
    if (type === "inc") setQuantity((prev) => prev + 1);
    if (type === "dec") setQuantity((prev) => Math.max(1, prev - 1));
  };

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      selectedSize: selectedSize,
      quantity: quantity
    });
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
  };

  const whatsappLink = `https://wa.me/916398802517?text=${encodeURIComponent(
    `Hello, I am interested in the ${product.name}. Size: ${selectedSize}. Quantity: ${quantity}.`
  )}`;

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans antialiased pb-24 lg:pb-0">
      {/* Minimalist Header */}
      <div className="flex justify-between items-center px-6 md:px-12 py-6 border-b border-neutral-100 sticky top-0 bg-white/90 backdrop-blur-md z-40">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors duration-300 text-sm tracking-wide uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <h1 className="text-sm tracking-[0.2em] uppercase font-light text-neutral-600">
          Luxora
        </h1>
        <div className="w-10" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Dynamic Image Area */}
          <div className="flex flex-col gap-4">
            <div className="aspect-[3/4] w-full bg-neutral-100 rounded-sm overflow-hidden relative">
              <AnimatePresence mode="wait">
                {product.image ? (
                  <motion.img
                    key={product.image}
                    src={product.image}
                    alt={product.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="absolute inset-0 w-full h-full object-cover object-center"
                  />
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 bg-gradient-to-b from-neutral-200 to-neutral-50 flex items-center justify-center"
                  >
                    <span className="text-neutral-400 text-xs tracking-[0.3em] uppercase">Lookbook Front</span>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            className="flex flex-col justify-center"
          >
            <p className="text-xs tracking-[0.2em] uppercase text-neutral-400 mb-4">
              {product.gender ? (product.gender === 'women' ? "Women's Collection" : "Men's Collection") : product.category}
            </p>

            <h2 className="text-4xl md:text-5xl font-serif font-light text-neutral-900 leading-tight">
              {product.name}
            </h2>

            <div className="text-xl font-light mt-6 tracking-wide">
              {priceDisplay}
              {product.oldPrice && (
                <span className="ml-3 text-base text-neutral-400 line-through">
                  ${(product.oldPrice * quantity).toFixed(2)}
                </span>
              )}
            </div>

            <div className="mt-8">
              <p className="text-neutral-600 leading-relaxed font-light text-[15px]">
                {product.description}
              </p>
            </div>

            {/* Colors */}
            {product.colors && (
              <div className="mt-8">
                <label className="block text-xs tracking-[0.15em] uppercase text-neutral-500 mb-4">Color</label>
                <div className="flex gap-3">
                  {product.colors.map((c, i) => (
                    <div key={i} className="w-6 h-6 rounded-full border-2 border-neutral-200 hover:border-neutral-900 transition-colors cursor-pointer" style={{ backgroundColor: c }} />
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-xs tracking-[0.15em] uppercase text-neutral-500">Select Size</label>
                <button className="text-xs underline text-neutral-400 hover:text-neutral-900 transition-colors">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 border flex items-center justify-center text-sm transition-all duration-300 ${selectedSize === size
                        ? "bg-neutral-900 text-white border-neutral-900"
                        : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-900"
                      }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="mt-8">
              <label className="block text-xs tracking-[0.15em] uppercase text-neutral-500 mb-4">Quantity</label>
              <div className="flex items-center border border-neutral-200 w-max">
                <button onClick={() => handleQuantity("dec")} className="p-4 hover:bg-neutral-50 transition-colors">
                  <Minus className="w-4 h-4 text-neutral-700" />
                </button>
                <span className="w-12 text-center text-sm font-light">{quantity}</span>
                <button onClick={() => handleQuantity("inc")} className="p-4 hover:bg-neutral-50 transition-colors">
                  <Plus className="w-4 h-4 text-neutral-700" />
                </button>
              </div>
            </div>

            {/* CTA Buttons (Desktop) */}
            <div className="mt-10 flex flex-col gap-3 hidden sm:block">
              <button
                onClick={handleAddToCart}
                className={`w-full flex items-center justify-center gap-2 text-sm tracking-[0.15em] uppercase py-5 transition-all duration-300 ${isAdded ? "bg-green-600 text-white" : "bg-neutral-900 hover:bg-neutral-800 text-white"
                  }`}
              >
                {isAdded ? <><Check className="w-4 h-4" /> ADDED TO BAG</> : <><ShoppingBag className="w-4 h-4" /> ADD TO BAG</>}
              </button>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center border border-neutral-300 hover:border-neutral-900 text-neutral-900 text-sm tracking-[0.15em] uppercase py-4 transition-colors duration-300"
              >
                Enquire on WhatsApp
              </a>
            </div>

            {/* Accordion Lists */}
            <div className="mt-12 border-t border-neutral-200">
              {(product.details || []).map((detail, index) => (
                <div key={index} className="border-b border-neutral-200 py-4">
                  <button
                    onClick={() => toggleAccordion(index)}
                    className="w-full flex justify-between items-center text-left text-xs tracking-wider uppercase text-neutral-700 font-medium"
                  >
                    {detail.title}
                    {openAccordion === index ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                  <AnimatePresence>
                    {openAccordion === index && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <p className="pt-3 text-sm font-light text-neutral-500 leading-relaxed">{detail.content}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* --- UPDATED Related Products with Real Clothes --- */}
        <div className="mt-24 md:mt-32 border-t border-neutral-100 pt-16">
          <h3 className="font-serif text-2xl md:text-3xl font-light text-center mb-12">
            You may also like
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {related.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => navigate(`/product/${item.id}`, { state: { product: item } })}
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4] w-full bg-neutral-100 rounded-sm overflow-hidden relative mb-4">
                  {/* Real Unsplash Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>

                <div className="flex flex-col items-center text-center md:items-start md:text-left">
                  <h4 className="font-light text-neutral-900 text-sm md:text-base tracking-wide">
                    {item.name}
                  </h4>
                  <p className="text-neutral-500 text-xs md:text-sm font-light mt-1">
                    ${item.price.toFixed(2)}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Mobile Bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-neutral-200 bg-white/95 backdrop-blur-md p-4 z-50 flex gap-3 items-center sm:hidden">
        <div className="flex flex-col flex-shrink-0 mr-2">
          <span className="text-[10px] uppercase tracking-wider text-neutral-400">Total</span>
          <span className="text-base font-medium tracking-wide">{priceDisplay}</span>
        </div>
        <button
          onClick={handleAddToCart}
          className={`flex-1 text-center text-white text-xs tracking-widest uppercase py-4 font-medium transition-colors flex items-center justify-center gap-2 ${isAdded ? 'bg-green-600' : 'bg-neutral-900'
            }`}
        >
          {isAdded ? <><Check className="w-3.5 h-3.5" /> ADDED</> : <><ShoppingBag className="w-3.5 h-3.5" /> ADD TO BAG</>}
        </button>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="border border-neutral-300 px-4 py-4 text-xs tracking-wider uppercase text-neutral-700 flex-shrink-0 hover:border-black transition-colors"
        >
          WA
        </a>
      </div>
    </div>
  );
}