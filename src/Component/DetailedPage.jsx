import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Minus, Plus, ChevronDown, ChevronUp } from "lucide-react";

export default function DetailPage() {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [openAccordion, setOpenAccordion] = useState(null);

  // Updated product data with images and technical specs
  const product = {
    id: 1,
    name: "Oversized Wool Blend Coat",
    category: "Outerwear / Fall Collection",
    price: 24500,
    customizable: true,
    description:
      "Crafted from a premium wool blend, this oversized coat offers a relaxed silhouette without compromising on structure. Designed with dropped shoulders and a notched lapel, it is the definitive piece for transitional dressing.",
    // Placeholder array simulating 3 distinct lookbook shots
    images: [" Lookbook Front", " Lookbook Profile", " Lookbook Detail View"],
    details: [
      {
        title: "Composition & Care",
        content: "70% Virgin Wool, 30% Polyamide. Dry clean only. Handle with care to maintain shape and texture over seasons."
      },
      {
        title: "Sizing & Fit",
        content: "Designed for an intentional oversized fit. We recommend taking your true size, or sizing down if you prefer a closer silhouette. Model is 178cm wearing size M."
      },
      {
        title: "Shipping & Bespoke Delivery",
        content: "Complimentary shipping across India. Handcrafted and dispatched within 5-7 business days."
      }
    ]
  };

  const related = [
    { id: 2, name: "Ribbed Turtleneck Sweater", category: "Knitwear", price: 8500 },
    { id: 3, name: "Wide-Leg Tailored Trouser", category: "Bottoms", price: 12000 },
    { id: 4, name: "Minimal Leather Crossbody", category: "Accessories", price: 15500 },
  ];

  const sizes = ["XS", "S", "M", "L", "XL"];

  const priceDisplay = useMemo(() => {
    return `₹${(product.price * quantity).toLocaleString("en-IN")}`;
  }, [quantity, product.price]);

  const handleQuantity = (type) => {
    if (type === "inc") setQuantity((prev) => prev + 1);
    if (type === "dec") setQuantity((prev) => Math.max(1, prev - 1));
  };

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const whatsappLink = `https://wa.me/919528836338?text=${encodeURIComponent(
    `Hello, I am interested in the ${product.name}. Size: ${selectedSize}. Quantity: ${quantity}.`
  )}`;

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans antialiased pb-24 lg:pb-0">
      {/* Minimalist Header */}
      <div className="flex justify-between items-center px-6 md:px-12 py-6 border-b border-neutral-100 sticky top-0 bg-white/90 backdrop-blur-md z-40">
        <button
          onClick={() => window.history.back()}
          className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors duration-300 text-sm tracking-wide uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <h1 className="text-sm tracking-[0.2em] uppercase font-light text-neutral-600">
          Maison Aurelia
        </h1>
        <div className="w-10" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
          
          {/* Enhanced Image Area: Gallery Style */}
          <div className="flex flex-col gap-4">
            <div className="aspect-[3/4] w-full bg-neutral-100 rounded-sm overflow-hidden relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  className="absolute inset-0 bg-gradient-to-b from-neutral-200 to-neutral-50 flex items-center justify-center"
                >
                  <span className="text-neutral-400 text-xs tracking-[0.3em] uppercase">
                    {product.images[activeImageIndex]}
                  </span>
                </motion.div>
              </AnimatePresence>
            </div>
            
            {/* Thumbnail Indicators */}
            <div className="flex gap-3 justify-center lg:justify-start">
              {product.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveImageIndex(index)}
                  className={`w-16 h-20 border transition-all duration-300 relative flex items-center justify-center bg-neutral-50 text-[9px] text-neutral-400 ${
                    activeImageIndex === index ? "border-neutral-900" : "border-neutral-200"
                  }`}
                >
                  0{index + 1}
                </button>
              ))}
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
              {product.category}
            </p>

            <h2 className="text-4xl md:text-5xl font-serif font-light text-neutral-900 leading-tight">
              {product.name}
            </h2>

            <div className="text-xl font-light mt-6 tracking-wide">
              {priceDisplay}
            </div>

            <div className="mt-8">
              <p className="text-neutral-600 leading-relaxed font-light text-[15px]">
                {product.description}
              </p>
            </div>

            {/* Size Selector */}
            {product.customizable && (
              <div className="mt-10">
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-xs tracking-[0.15em] uppercase text-neutral-500">
                    Select Size
                  </label>
                  <button className="text-xs underline text-neutral-400 hover:text-neutral-900 transition-colors">
                    Size Guide
                  </button>
                </div>

                <div className="flex flex-wrap gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-14 h-14 border flex items-center justify-center text-sm transition-all duration-300 ${
                        selectedSize === size
                          ? "bg-neutral-900 text-white border-neutral-900"
                          : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-900"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Quantity Selector */}
            <div className="mt-8">
              <label className="block text-xs tracking-[0.15em] uppercase text-neutral-500 mb-4">
                Quantity
              </label>
              <div className="flex items-center border border-neutral-200 w-max">
                <button 
                  onClick={() => handleQuantity("dec")} 
                  className="p-4 hover:bg-neutral-50 transition-colors"
                >
                  <Minus className="w-4 h-4 text-neutral-700" />
                </button>
                <span className="w-12 text-center text-sm font-light">{quantity}</span>
                <button 
                  onClick={() => handleQuantity("inc")} 
                  className="p-4 hover:bg-neutral-50 transition-colors"
                >
                  <Plus className="w-4 h-4 text-neutral-700" />
                </button>
              </div>
            </div>

            {/* CTA Button (Desktop view only, hidden on mobile) */}
            <div className="mt-10 hidden sm:block">
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center bg-neutral-900 hover:bg-neutral-800 text-white text-sm tracking-[0.15em] uppercase py-5 transition-colors duration-300"
              >
                Enquire on WhatsApp
              </a>
            </div>

            {/* Accordion Lists for Premium Context */}
            <div className="mt-12 border-t border-neutral-200">
              {product.details.map((detail, index) => (
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
                        <p className="pt-3 text-sm font-light text-neutral-500 leading-relaxed">
                          {detail.content}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related Products */}
        <div className="mt-24 md:mt-32 border-t border-neutral-100 pt-16">
          <h3 className="font-serif text-2xl md:text-3xl font-light text-center mb-12">
            You may also like
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-10">
            {related.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4] w-full bg-neutral-100 rounded-sm overflow-hidden relative mb-4">
                  <div className="absolute inset-0 bg-gradient-to-b from-neutral-200 to-neutral-50 flex items-center justify-center transition-transform duration-700 group-hover:scale-105">
                     <span className="text-neutral-300 text-[10px] tracking-[0.3em] uppercase">{item.category}</span>
                  </div>
                </div>

                <div className="flex flex-col items-center text-center md:items-start md:text-left">
                  <h4 className="font-light text-neutral-900 text-sm md:text-base tracking-wide">
                    {item.name}
                  </h4>
                  <p className="text-neutral-500 text-xs md:text-sm font-light mt-1">
                    ₹{item.price.toLocaleString("en-IN")}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Sticky Mobile Bar */}
      <div className="fixed bottom-0 left-0 right-0 border-t border-neutral-200 bg-white p-4 z-50 flex gap-4 items-center sm:hidden backdrop-blur-md bg-white/95">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase tracking-wider text-neutral-400">Total</span>
          <span className="text-base font-medium tracking-wide">{priceDisplay}</span>
        </div>
        <a
          href={whatsappLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 text-center bg-neutral-900 text-white text-xs tracking-widest uppercase py-4 font-medium"
        >
          Enquire Now
        </a>
      </div>
    </div>
  );
}