import React, { useState, useEffect } from "react";
import { Search, Heart, ShoppingBag, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";

const Navbar = () => {
    const { cartCount, setIsCartOpen } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Collections", path: "/categories" },
        { name: "Contact Us", path: "/contact" },
    ];

    return (
        <nav
            className={`sticky top-0 z-40 transition-all duration-300 ${
                scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center h-16">
                    
                    {/* Left Side: Logo */}
                    <div className="flex items-center">
                        {/* Mobile Menu Button (Stays left on mobile) */}
                        <button
                            className="lg:hidden mr-2 p-2 text-gray-700 hover:text-[#c4a882] transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Toggle Menu"
                        >
                            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>

                        <Link
                            to="/"
                            className="font-serif text-2xl font-bold tracking-wider"
                        >
                            LUXORA
                        </Link>
                    </div>

                    {/* Right Side: Links & Icons */}
                    <div className="flex items-center space-x-8">
                        
                        {/* Desktop Navigation Links */}
                        <div className="hidden lg:flex items-center space-x-8">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="text-xs font-medium tracking-widest hover:text-[#c4a882] transition-colors"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Action Icons */}
                        <div className="flex items-center space-x-4 border-l border-gray-100 pl-4 lg:pl-0 lg:border-none">
                            <button className="hover:text-[#c4a882] transition-colors" aria-label="Search">
                                <Search size={20} />
                            </button>
                            <button className="hover:text-[#c4a882] transition-colors hidden sm:block" aria-label="Wishlist">
                                <Heart size={20} />
                            </button>

                            {/* Connected Cart Button */}
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="hover:text-[#c4a882] transition-colors relative p-1"
                                aria-label="Open Cart"
                            >
                                <ShoppingBag size={20} />
                                {cartCount > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-[#1a1a1a] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">
                                        {cartCount}
                                    </span>
                                )}
                            </button>
                        </div>

                    </div>
                </div>
            </div>

            {/* Mobile Dropdown Menu */}
            {isMenuOpen && (
                <div className="lg:hidden bg-white border-t border-gray-100 absolute w-full left-0 shadow-lg dynamic-height">
                    <div className="px-4 pt-2 pb-6 space-y-4 flex flex-col">
                        {navLinks.map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={() => setIsMenuOpen(false)}
                                className="text-sm font-medium tracking-widest text-gray-800 hover:text-[#c4a882] transition-colors py-2 border-b border-gray-50 last:border-none"
                            >
                                {link.name}
                            </Link>
                        ))}
                        <Link 
                            to="/wishlist" 
                            onClick={() => setIsMenuOpen(false)}
                            className="text-sm font-medium tracking-widest text-gray-800 hover:text-[#c4a882] transition-colors py-2 sm:hidden flex items-center gap-2"
                        >
                            <Heart size={18} /> WISHLIST
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;