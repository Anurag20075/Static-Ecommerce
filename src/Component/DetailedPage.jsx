import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Minus, Plus, ChevronDown, ChevronUp, ShoppingBag, Check, X } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "./CartContext";

import { products as mensProducts } from "../data/CategoriesData";
import { products as womensProducts } from "../data/WomenCategoriesData";

export default function DetailPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const passedProduct = location.state?.product;

  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(null);
  const [openAccordion, setOpenAccordion] = useState(null);
  const [isAdded, setIsAdded] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [lastAdded, setLastAdded] = useState(null);
  const [sizeConfirmed, setSizeConfirmed] = useState(false);
  const [colorConfirmed, setColorConfirmed] = useState(false);

  const product = passedProduct || {
    id: 1,
    name: "Oversized Wool Blend Coat",
    category: "Outerwear / Fall Collection",
    price: 245.00,
    image: null,
    colors: ["#1a1a1a", "#8B7355", "#D2B48C"],
    colorNames: ["Black", "Camel", "Tan"],
    customizable: true,
    description:
      "Crafted from a premium wool blend, this oversized coat offers a relaxed silhouette without compromising on structure. Designed with dropped shoulders and a notched lapel, it is the definitive piece for transitional dressing.",
    details: [
      { title: "Composition & Care", content: "70% Virgin Wool, 30% Polyamide. Dry clean only." },
      { title: "Sizing & Fit", content: "Designed for an intentional oversized fit. Model is 178cm wearing size M." },
      { title: "Shipping & Returns", content: "Complimentary standard shipping. Easy 14-day returns." }
    ]
  };

  // Auto-select first color on mount
  useEffect(() => {
    if (product.colors && product.colors.length > 0 && !selectedColor) {
      setSelectedColor(product.colors[0]);
    }
  }, [product.colors]);

  const sizes = ["XS", "S", "M", "L", "XL"];

  const related = useMemo(() => {
    const allProducts = [...womensProducts, ...mensProducts];
    return allProducts.filter(p => p.id !== product.id).slice(0, 4);
  }, [product.id]);

  const priceDisplay = useMemo(() => {
    return `$${(product.price * quantity).toFixed(2)}`;
  }, [quantity, product.price]);

  // Resolve color name — NEVER returns hex
  const selectedColorName = useMemo(() => {
    if (!selectedColor) return null;
    if (!product.colorNames || !product.colors) return null; // No names? Return null, not hex
    const index = product.colors.indexOf(selectedColor);
    if (index !== -1 && product.colorNames[index]) {
      return product.colorNames[index];
    }
    return null; // Fallback to null instead of hex
  }, [selectedColor, product.colors, product.colorNames]);

  const handleQuantity = (type) => {
    if (type === "inc") setQuantity(prev => prev + 1);
    if (type === "dec") setQuantity(prev => Math.max(1, prev - 1));
  };

  const handleSizeSelect = (size) => {
    setSelectedSize(size);
    setSizeConfirmed(false);
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    setColorConfirmed(false);
  };

  const toggleAccordion = (index) => {
    setOpenAccordion(openAccordion === index ? null : index);
  };

  const resetStates = () => {
    setSelectedSize("M");
    setQuantity(1);
    setSizeConfirmed(false);
    setColorConfirmed(false);
    setIsAdded(false);
    setShowToast(false);
    setLastAdded(null);
  };

  const handleAddToCart = () => {
    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      selectedSize: selectedSize,
      selectedColor: selectedColor,
      selectedColorName: selectedColorName, // null if no colorNames in data
      quantity: quantity,
      category: product.category,
      gender: product.gender,
    };

    addToCart(cartItem);

    const toastDetails = {
      name: product.name,
      size: selectedSize,
      color: selectedColorName || null, // null if no name — toast will show dot instead
      colorHex: selectedColor || null,  // for rendering dot in toast
      hasColors: !!product.colors,
      quantity: quantity,
      total: (product.price * quantity).toFixed(2),
    };

    setLastAdded(toastDetails);
    setIsAdded(true);
    setSizeConfirmed(true);
    setColorConfirmed(true);
    setShowToast(true);

    setTimeout(() => setShowToast(false), 3000);
    setTimeout(() => setIsAdded(false), 2000);
  };

  // Button subtitle — always clean, never hex
  const buttonSubtitle = useMemo(() => {
    let text = `SIZE ${selectedSize}`;
    if (product.colors && selectedColorName) {
      text += ` · ${selectedColorName}`;
    }
    return text;
  }, [selectedSize, selectedColorName, product.colors]);

  // WhatsApp message
  const whatsappMessage = useMemo(() => {
    let msg = `Hello, I am interested in the ${product.name}. Size: ${selectedSize}.`;
    if (product.colors && selectedColorName) {
      msg += ` Color: ${selectedColorName}.`;
    }
    msg += ` Quantity: ${quantity}.`;
    return msg;
  }, [product.name, selectedSize, selectedColorName, product.colors, quantity]);

  const whatsappLink = `https://wa.me/916398802517?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <div className="min-h-screen bg-white text-neutral-900 font-sans antialiased pb-24 lg:pb-0">

      {/* ========== TOAST — Shows color dot if no name ========== */}
      <AnimatePresence>
        {showToast && lastAdded && (
          <motion.div
            initial={{ opacity: 0, y: -20, x: "-50%" }}
            animate={{ opacity: 1, y: 0, x: "-50%" }}
            exit={{ opacity: 0, y: -20, x: "-50%" }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="fixed top-20 left-1/2 z-[100] bg-neutral-900 text-white px-6 py-4 rounded-sm shadow-2xl flex items-center gap-4 min-w-[320px] max-w-[90vw]"
          >
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center flex-shrink-0">
              <Check className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs tracking-wider uppercase text-neutral-400 mb-0.5">Added to cart</p>
              <p className="text-sm font-light truncate">{lastAdded.name}</p>
              <p className="text-xs text-neutral-400 mt-0.5 flex items-center gap-1.5 flex-wrap">
                <span>Size: <span className="text-white font-medium">{lastAdded.size}</span></span>
                {lastAdded.hasColors && (
                  <span className="flex items-center gap-1">
                    · Color:{" "}
                    {lastAdded.color ? (
                      <span className="text-white font-medium">{lastAdded.color}</span>
                    ) : lastAdded.colorHex ? (
                      <span
                        className="inline-block w-3 h-3 rounded-full border border-white/30 flex-shrink-0"
                        style={{ backgroundColor: lastAdded.colorHex }}
                      />
                    ) : null}
                  </span>
                )}
                <span>· Qty: {lastAdded.quantity} · ${lastAdded.total}</span>
              </p>
            </div>
            <button
              onClick={() => setShowToast(false)}
              className="text-neutral-500 hover:text-white transition-colors flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Minimalist Header */}
      <div className="flex justify-between items-center px-6 md:px-12 py-6 border-b border-neutral-100 sticky top-0 bg-white/90 backdrop-blur-md z-40">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-neutral-500 hover:text-neutral-900 transition-colors duration-300 text-sm tracking-wide uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>
        <h1 className="text-sm tracking-[0.2em] uppercase font-light text-neutral-600">Luxora</h1>
        <div className="w-10" />
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

          {/* Image */}
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

          {/* Details */}
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

            {/* ===== COLOR SELECTOR ===== */}
            {product.colors && product.colors.length > 0 && (
              <div className="mt-8">
                <div className="flex justify-between items-center mb-4">
                  <label className="block text-xs tracking-[0.15em] uppercase text-neutral-500">
                    Color
                    <AnimatePresence mode="wait">
                      {selectedColorName && (
                        <motion.span
                          key={selectedColor}
                          initial={{ opacity: 0, x: -8 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 8 }}
                          transition={{ duration: 0.2 }}
                          className="ml-2 text-neutral-900 font-medium normal-case tracking-normal"
                        >
                          — {selectedColorName}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </label>
                  <span className="text-xs text-neutral-400">
                    {product.colors.length} option{product.colors.length > 1 ? "s" : ""}
                  </span>
                </div>
                <div className="flex gap-3">
                  {product.colors.map((color, i) => {
                    const name = product.colorNames?.[i] || null;
                    const isSelected = selectedColor === color;

                    return (
                      <div key={i} className="relative">
                        <motion.button
                          onClick={() => handleColorSelect(color)}
                          whileTap={{ scale: 0.9 }}
                          className={`relative w-9 h-9 rounded-full transition-all duration-300 flex items-center justify-center
                            ${isSelected
                              ? "ring-2 ring-neutral-900 ring-offset-2"
                              : "ring-1 ring-neutral-200 hover:ring-neutral-400"
                            }
                            ${colorConfirmed && isSelected ? "ring-2 !ring-green-500 !ring-offset-2" : ""}
                          `}
                          style={{ backgroundColor: color }}
                          title={name || color}
                        >
                          <AnimatePresence>
                            {isSelected && (
                              <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ duration: 0.2 }}
                                className="w-3 h-3 rounded-full border-2 border-white"
                                style={{ backgroundColor: color }}
                              />
                            )}
                          </AnimatePresence>
                        </motion.button>

                        {/* Name label under selected swatch */}
                        <AnimatePresence>
                          {isSelected && name && (
                            <motion.p
                              initial={{ opacity: 0, y: -4 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: -4 }}
                              className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-neutral-500 whitespace-nowrap"
                            >
                              {name}
                            </motion.p>
                          )}
                        </AnimatePresence>

                        {/* Green checkmark after add */}
                        <AnimatePresence>
                          {colorConfirmed && isSelected && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              exit={{ scale: 0 }}
                              className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center z-10"
                            >
                              <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
                </div>

                {/* Confirmed text — only if name exists, otherwise skip */}
                <AnimatePresence>
                  {colorConfirmed && selectedColorName && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-6 text-xs text-green-600 flex items-center gap-1.5 overflow-hidden"
                    >
                      <Check className="w-3 h-3" />
                      {selectedColorName} selected & added to cart
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* ===== SIZE SELECTOR ===== */}
            <div className="mt-8">
              <div className="flex justify-between items-center mb-4">
                <label className="block text-xs tracking-[0.15em] uppercase text-neutral-500">
                  Select Size
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={selectedSize}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.2 }}
                      className="ml-2 text-neutral-900 font-medium normal-case tracking-normal"
                    >
                      — {selectedSize}
                    </motion.span>
                  </AnimatePresence>
                </label>
                <button className="text-xs underline text-neutral-400 hover:text-neutral-900 transition-colors">Size Guide</button>
              </div>
              <div className="flex flex-wrap gap-3">
                {sizes.map((size) => (
                  <motion.button
                    key={size}
                    onClick={() => handleSizeSelect(size)}
                    whileTap={{ scale: 0.95 }}
                    className={`relative w-14 h-14 border flex items-center justify-center text-sm transition-all duration-300 overflow-hidden
                      ${selectedSize === size
                        ? "bg-neutral-900 text-white border-neutral-900"
                        : "bg-white text-neutral-700 border-neutral-200 hover:border-neutral-900"
                      }
                      ${sizeConfirmed && selectedSize === size ? "ring-2 ring-green-500 ring-offset-2" : ""}
                    `}
                  >
                    {size}
                    <AnimatePresence>
                      {sizeConfirmed && selectedSize === size && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                          className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full flex items-center justify-center"
                        >
                          <Check className="w-2.5 h-2.5 text-white" strokeWidth={3} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>
                ))}
              </div>
              <AnimatePresence>
                {sizeConfirmed && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-3 text-xs text-green-600 flex items-center gap-1.5 overflow-hidden"
                  >
                    <Check className="w-3 h-3" />
                    Size {selectedSize} selected & added to cart
                  </motion.p>
                )}
              </AnimatePresence>
            </div>

            {/* Quantity */}
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

            {/* CTA Desktop */}
            <div className="mt-10 flex flex-col gap-3 hidden sm:block">
              <button
                onClick={handleAddToCart}
                className={`w-full flex items-center justify-center gap-2 text-sm tracking-[0.15em] uppercase py-5 transition-all duration-300
                  ${isAdded ? "bg-green-600 text-white" : "bg-neutral-900 hover:bg-neutral-800 text-white"}`}
              >
                {isAdded
                  ? <><Check className="w-4 h-4" /> ADDED TO CART — {buttonSubtitle}</>
                  : <><ShoppingBag className="w-4 h-4" /> ADD TO CART — {buttonSubtitle}</>
                }
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

            {/* Accordion */}
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

        {/* Related */}
        <div className="mt-24 md:mt-32 border-t border-neutral-100 pt-16">
          <h3 className="font-serif text-2xl md:text-3xl font-light text-center mb-12">You may also like</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10">
            {related.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => {
                  resetStates();
                  if (item.colors?.length > 0) setSelectedColor(item.colors[0]);
                  else setSelectedColor(null);
                  navigate(`/product/${item.id}`, { state: { product: item } });
                }}
                className="group cursor-pointer"
              >
                <div className="aspect-[3/4] w-full bg-neutral-100 rounded-sm overflow-hidden relative mb-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                </div>
                <div className="flex flex-col items-center text-center md:items-start md:text-left">
                  <h4 className="font-light text-neutral-900 text-sm md:text-base tracking-wide">{item.name}</h4>
                  <p className="text-neutral-500 text-xs md:text-sm font-light mt-1">${item.price.toFixed(2)}</p>
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
          className={`flex-1 text-center text-white text-[10px] sm:text-xs tracking-widest uppercase py-4 font-medium transition-colors flex items-center justify-center gap-1.5
            ${isAdded ? 'bg-green-600' : 'bg-neutral-900'}`}
        >
          {isAdded
            ? <><Check className="w-3.5 h-3.5" /> ADDED</>
            : <><ShoppingBag className="w-3.5 h-3.5" /> ADD {buttonSubtitle}</>
          }
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