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
        { name: "MEN", path: "/men" },
        { name: "WOMEN", path: "/women" },
        { name: "NEW ARRIVALS", path: "/new-arrivals" },
        { name: "COLLECTIONS", path: "/categories" },
        { name: "SALE", path: "/sale" },
    ];

    return (
        <nav
            className={`sticky top-0 z-40 transition-all duration-300 ${
                scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
                <div className="flex justify-between items-center h-16">
                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>

                    {/* Left Links */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navLinks.slice(0, 2).map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className="text-xs font-medium tracking-widest hover:text-[#c4a882] transition-colors"
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Logo */}
                    <Link
                        to="/"
                        className="font-serif text-2xl font-bold tracking-wider"
                    >
                        LUXORA
                    </Link>

                    {/* Right Links */}
                    <div className="hidden lg:flex items-center space-x-8">
                        {navLinks.slice(2).map((link) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                className={`text-xs font-medium tracking-widest hover:text-[#c4a882] transition-colors ${
                                    link.name === "SALE" ? "text-red-600" : ""
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Icons */}
                    <div className="flex items-center space-x-4">
                        <button className="hover:text-[#c4a882] transition-colors">
                            <Search size={20} />
                        </button>
                        <button className="hover:text-[#c4a882] transition-colors hidden sm:block">
                            <Heart size={20} />
                        </button>

                        {/* Connected Cart Button */}
                        <button
                            onClick={() => setIsCartOpen(true)}
                            className="hover:text-[#c4a882] transition-colors relative p-1"
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
        </nav>
    );
};

export default Navbar;
