import React, { useState, useEffect, useRef } from "react";
import { Search, ShoppingBag, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "./CartContext";

const Navbar = () => {
    const { cartCount, setIsCartOpen } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const menuRef = useRef(null);
    const searchInputRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setIsMenuOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (isSearchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [isSearchOpen]);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [isMenuOpen]);

    const navLinks = [
        { name: "Home", path: "/" },
        { name: "Collections", path: "/categories" },
        { name: "Contact Us", path: "/contact" },
    ];

    const closeMenu = () => setIsMenuOpen(false);

    return (
        <>
            <nav
                className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
                    scrolled
                        ? "bg-white/95 backdrop-blur-md shadow-sm"
                        : "bg-white"
                }`}
            >
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex justify-between items-center h-16">

                        {/* Left: Logo */}
                        <Link
                            to="/"
                            className="font-serif text-xl sm:text-2xl font-bold tracking-wider select-none"
                            onClick={closeMenu}
                        >
                            LUXORA
                        </Link>

                        {/* Center: Desktop Links */}
                        <div className="hidden lg:flex items-center gap-10">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    to={link.path}
                                    className="relative text-xs font-medium tracking-widest uppercase hover:text-[#c4a882] transition-colors after:content-[''] after:absolute after:-bottom-1 after:left-0 after:w-0 after:h-[1.5px] after:bg-[#c4a882] after:transition-all hover:after:w-full"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* Right: Icons + Hamburger */}
                        <div className="flex items-center gap-1 sm:gap-2">

                            {/* Search Toggle */}
                            <button
                                className="p-2 text-gray-700 hover:text-[#c4a882] active:scale-95 transition-all"
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                aria-label="Toggle Search"
                            >
                                {isSearchOpen ? <X size={20} /> : <Search size={20} />}
                            </button>

                            {/* Cart Button */}
                            <button
                                onClick={() => setIsCartOpen(true)}
                                className="p-2 text-gray-700 hover:text-[#c4a882] active:scale-95 transition-all relative"
                                aria-label="Open Cart"
                            >
                                <ShoppingBag size={20} />
                                {cartCount > 0 && (
                                    <span className="absolute top-0.5 right-0.5 bg-[#1a1a1a] text-white text-[10px] font-semibold min-w-[18px] h-[18px] rounded-full flex items-center justify-center leading-none">
                                        {cartCount}
                                    </span>
                                )}
                            </button>

                            {/* Hamburger — right side, mobile only */}
                            <button
                                className="lg:hidden p-2 -mr-2 text-gray-700 hover:text-[#c4a882] active:scale-95 transition-all"
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                aria-label="Toggle Menu"
                            >
                                {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Search Bar (Expandable) */}
                <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                        isSearchOpen ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
                    }`}
                >
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-4">
                        <div className="relative">
                            <Search
                                size={16}
                                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                ref={searchInputRef}
                                type="text"
                                placeholder="Search products..."
                                className="w-full pl-11 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#c4a882]/40 focus:border-[#c4a882] transition-all placeholder:text-gray-400"
                            />
                        </div>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu Overlay */}
            <div
                className={`fixed inset-0 bg-black/30 z-40 lg:hidden transition-opacity duration-300 ${
                    isMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                }`}
                onClick={closeMenu}
            />

            {/* Mobile Slide-in Menu (from right) */}
            <div
                ref={menuRef}
                className={`fixed top-0 right-0 h-full w-72 max-w-[80vw] bg-white z-50 lg:hidden transform transition-transform duration-300 ease-out shadow-2xl ${
                    isMenuOpen ? "translate-x-0" : "translate-x-full"
                }`}
            >
                {/* Menu Header */}
                <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
                    <span className="font-serif text-xl font-bold tracking-wider">
                        LUXORA
                    </span>
                    <button
                        onClick={closeMenu}
                        className="p-2 -mr-2 text-gray-700 hover:text-[#c4a882] active:scale-95 transition-all"
                        aria-label="Close Menu"
                    >
                        <X size={22} />
                    </button>
                </div>

                {/* Menu Links */}
                <div className="px-4 py-6">
                    <div className="space-y-1">
                        {navLinks.map((link, index) => (
                            <Link
                                key={link.name}
                                to={link.path}
                                onClick={closeMenu}
                                className="flex items-center gap-3 px-4 py-3.5 rounded-lg text-[15px] font-medium tracking-wide text-gray-800 hover:text-[#c4a882] hover:bg-[#c4a882]/5 active:bg-[#c4a882]/10 transition-all"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Decorative Divider
                    <div className="my-6 flex items-center gap-3 px-4">
                        <div className="flex-1 h-px bg-gray-200" />
                        <span className="text-[10px] tracking-[0.3em] text-gray-400 uppercase">Quick Access</span>
                        <div className="flex-1 h-px bg-gray-200" />
                    </div> */}

                    {/* Cart Shortcut
                    <button
                        onClick={() => {
                            closeMenu();
                            setTimeout(() => setIsCartOpen(true), 200);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-3.5 rounded-lg text-[15px] font-medium tracking-wide text-gray-800 hover:text-[#c4a882] hover:bg-[#c4a882]/5 active:bg-[#c4a882]/10 transition-all"
                    >
                        <ShoppingBag size={18} />
                        <span>Shopping Bag</span>
                        {cartCount > 0 && (
                            <span className="ml-auto bg-[#1a1a1a] text-white text-[11px] font-semibold min-w-[22px] h-[22px] rounded-full flex items-center justify-center px-1.5">
                                {cartCount}
                            </span>
                        )}
                    </button> */}
                </div>

                {/* Menu Footer */}
                <div className="absolute bottom-0 left-0 right-0 px-4 py-5 border-t border-gray-100">
                    <p className="text-[11px] text-gray-400 tracking-wide text-center">
                        © {new Date().getFullYear()} Luxora. All rights reserved.
                    </p>
                </div>
            </div>

            {/* Spacer */}
            <div className="h-16" />
        </>
    );
};

export default Navbar;