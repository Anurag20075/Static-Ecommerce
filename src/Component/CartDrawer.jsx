import React, { useState } from "react";
import {
    X,
    Trash2,
    Plus,
    Minus,
    MessageSquare,
    ShoppingBag,
} from "lucide-react";

export default function CartDrawer({
    isCartOpen,
    setIsCartOpen,
    cartItems,
    setCartItems,
}) {
    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
    });

    // Quantity और Delete हैंडलर्स
    const updateQuantity = (id, change) => {
        setCartItems((prev) =>
            prev.map((item) => {
                if (item.id === id) {
                    const newQty = item.quantity + change;
                    return newQty > 0 ? { ...item, quantity: newQty } : item;
                }
                return item;
            })
        );
    };

    const removeItem = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Calculations
    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const shipping = 0.0;
    const total = subtotal + shipping;

    // WhatsApp Checkout Logic
    const handleWhatsAppCheckout = (e) => {
        e.preventDefault();
        if (cartItems.length === 0) return alert("Your cart is empty!");

        const sellerWhatsAppNumber = "919999999999";

        let message = `📦 *NEW ORDER RECEIVED!*\n\n`;
        message += `👤 *Customer Details:*\n`;
        message += `Name: ${formData.name}\n`;
        message += `Phone: ${formData.phone}\n`;
        message += `Address: ${formData.address}\n\n`;

        message += `🛒 *Items Ordered:*\n`;
        cartItems.forEach((item, index) => {
            message += `${index + 1}. ${item.name}\n`;
            message += `   Size: ${item.selectedSize}\n`;
            message += `   Qty: ${item.quantity}\n`;
            message += `   Price: $${(item.price * item.quantity).toFixed(
                2
            )}\n\n`;
        });

        message += `💰 *Total Amount:* $${total.toFixed(2)}\n`;
        message += `---------------------------------\n`;
        message += `Please confirm availability and share payment details.`;

        const encodedMessage = encodeURIComponent(message);
        const whatsAppUrl = `https://wa.me/${sellerWhatsAppNumber}?text=${encodedMessage}`;

        window.open(whatsAppUrl, "_blank");
    };

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex justify-end">
            {/* DRAWER PANEL */}
            <div className="w-full max-w-xl bg-white h-screen flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
                {/* Drawer Header */}
                <div className="p-6 border-b border-zinc-100 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <ShoppingBag className="w-5 h-5 text-zinc-900" />
                        <h2 className="text-xl font-bold tracking-tight text-zinc-900 font-serif">
                            Your Cart
                        </h2>
                        <span className="text-sm bg-zinc-100 px-2.5 py-0.5 rounded-full font-medium text-zinc-600">
                            {cartItems.length}{" "}
                            {cartItems.length === 1 ? "item" : "items"}
                        </span>
                    </div>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="p-2 text-zinc-400 hover:text-zinc-900 rounded-full hover:bg-zinc-100 transition-colors"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Drawer Body */}
                <div className="flex-1 overflow-y-auto p-6 space-y-8">
                    {/* Item List */}
                    <div className="space-y-4">
                        {cartItems.length === 0 ? (
                            <div className="text-center py-12 text-zinc-400">
                                <p className="font-medium">
                                    Your bag is empty.
                                </p>
                            </div>
                        ) : (
                            cartItems.map((item) => (
                                <div
                                    key={item.id}
                                    className="flex gap-4 p-4 rounded-xl border border-zinc-100 bg-white shadow-sm transition-all hover:shadow-md"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.name}
                                        className="w-20 h-24 object-cover rounded-lg bg-zinc-100 flex-shrink-0"
                                    />
                                    <div className="flex-1 flex flex-col justify-between">
                                        <div>
                                            <div className="flex justify-between items-start gap-2">
                                                <h3 className="font-medium text-zinc-900 text-sm sm:text-base leading-snug">
                                                    {item.name}
                                                </h3>
                                                <button
                                                    onClick={() =>
                                                        removeItem(item.id)
                                                    }
                                                    className="text-zinc-400 hover:text-red-500 transition-colors p-1"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <p className="text-xs text-zinc-400 mt-1">
                                                Size:{" "}
                                                <span className="font-semibold text-zinc-700">
                                                    {item.selectedSize}
                                                </span>
                                            </p>
                                        </div>

                                        <div className="flex justify-between items-center mt-2">
                                            {/* Quantity Controls */}
                                            <div className="flex items-center border border-zinc-200 rounded-full bg-zinc-50">
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            -1
                                                        )
                                                    }
                                                    className="p-1.5 hover:bg-zinc-200 rounded-full transition-colors"
                                                >
                                                    <Minus className="w-3 h-3 text-zinc-600" />
                                                </button>
                                                <span className="px-3 text-xs font-semibold text-zinc-800 select-none">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() =>
                                                        updateQuantity(
                                                            item.id,
                                                            1
                                                        )
                                                    }
                                                    className="p-1.5 hover:bg-zinc-200 rounded-full transition-colors"
                                                >
                                                    <Plus className="w-3 h-3 text-zinc-600" />
                                                </button>
                                            </div>
                                            <span className="font-bold text-sm text-zinc-900">
                                                $
                                                {(
                                                    item.price * item.quantity
                                                ).toFixed(2)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    {cartItems.length > 0 && (
                        <>
                            <hr className="border-zinc-100" />

                            {/* Order Summary */}
                            <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-100 space-y-3">
                                <h4 className="font-bold text-sm text-zinc-400 uppercase tracking-wider">
                                    Order Summary
                                </h4>
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-500">
                                        Subtotal
                                    </span>
                                    <span className="font-medium text-zinc-900">
                                        ${subtotal.toFixed(2)}
                                    </span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-zinc-500">
                                        Shipping
                                    </span>
                                    <span className="font-medium text-emerald-600">
                                        Free
                                    </span>
                                </div>
                                <div className="border-t border-dashed border-zinc-200 pt-3 flex justify-between items-baseline">
                                    <span className="font-semibold text-zinc-900">
                                        Total Amount
                                    </span>
                                    <span className="text-2xl font-bold text-zinc-900 font-serif">
                                        ${total.toFixed(2)}
                                    </span>
                                </div>
                            </div>

                            {/* Checkout Form */}
                            <form
                                onSubmit={handleWhatsAppCheckout}
                                className="space-y-5"
                            >
                                <div className="space-y-1">
                                    <h3 className="text-base font-bold text-zinc-900 font-serif">
                                        Delivery Details
                                    </h3>
                                    <p className="text-xs text-zinc-400">
                                        Please provide your details to process
                                        the order via WhatsApp.
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="relative group">
                                        <input
                                            type="text"
                                            name="name"
                                            required
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder=" "
                                            className="peer w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-zinc-900 focus:bg-white transition-all placeholder-transparent text-sm"
                                        />
                                        <label className="absolute left-4 top-3 text-zinc-400 text-sm pointer-events-none transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-zinc-900 peer-focus:bg-white peer-focus:px-1 -top-2.5 text-xs bg-white px-1">
                                            Full Name
                                        </label>
                                    </div>

                                    <div className="relative group">
                                        <input
                                            type="tel"
                                            name="phone"
                                            required
                                            value={formData.phone}
                                            onChange={handleInputChange}
                                            placeholder=" "
                                            className="peer w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-zinc-900 focus:bg-white transition-all placeholder-transparent text-sm"
                                        />
                                        <label className="absolute left-4 top-3 text-zinc-400 text-sm pointer-events-none transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-zinc-900 peer-focus:bg-white peer-focus:px-1 -top-2.5 text-xs bg-white px-1">
                                            WhatsApp Mobile Number
                                        </label>
                                    </div>

                                    <div className="relative group">
                                        <textarea
                                            name="address"
                                            required
                                            value={formData.address}
                                            onChange={handleInputChange}
                                            placeholder=" "
                                            rows="3"
                                            className="peer w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-xl outline-none focus:border-zinc-900 focus:bg-white transition-all placeholder-transparent text-sm resize-none"
                                        />
                                        <label className="absolute left-4 top-3 text-zinc-400 text-sm pointer-events-none transition-all duration-200 peer-placeholder-shown:top-3 peer-placeholder-shown:text-sm peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-zinc-900 peer-focus:bg-white peer-focus:px-1 -top-2.5 text-xs bg-white px-1">
                                            Complete Delivery Address
                                        </label>
                                    </div>
                                </div>

                                <div className="pt-2">
                                    <button
                                        type="submit"
                                        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 tracking-wide text-sm"
                                    >
                                        <MessageSquare className="w-4 h-4 fill-white" />
                                        Confirm Order via WhatsApp
                                    </button>
                                </div>
                            </form>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
