import React, { useState } from "react";
import {
    ShoppingBag,
    X,
    Trash2,
    Plus,
    Minus,
    MessageSquare,
} from "lucide-react";
import { useCart } from "./CartContext";

export default function CartCheckout() {
    const { cartItems, isCartOpen, setIsCartOpen, updateQuantity, removeItem } =
        useCart();

    const [formData, setFormData] = useState({
        name: "",
        phone: "",
        address: "",
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const subtotal = cartItems.reduce(
        (acc, item) => acc + item.price * item.quantity,
        0
    );
    const shipping = 0.0;
    const total = subtotal + shipping;

    const handleWhatsAppCheckout = (e) => {
        e.preventDefault();
        if (cartItems.length === 0) return alert("Your cart is empty!");

        const sellerWhatsAppNumber = "+916398802517";

        let message = `*NEW ORDER RECEIVED!*\n\n`;
        message += `*Customer Details:*\n`;
        message += `Name: ${formData.name}\n`;
        message += `Phone: ${formData.phone}\n`;
        message += `Address: ${formData.address}\n\n`;

        message += `🛒 *Items Ordered:*\n`;
        cartItems.forEach((item, index) => {
            message += `${index + 1}. ${item.name}\n`;
            message += `   Size: ${item.selectedSize}\n`;

            // ← COLOR ADDED TO WHATSAPP MESSAGE
            if (item.selectedColorName) {
                message += `   Color: ${item.selectedColorName}\n`;
            } else if (item.selectedColor) {
                message += `   Color: ${item.selectedColor}\n`;
            }

            message += `   Qty: ${item.quantity}\n`;
            message += `   Price: $${(item.price * item.quantity).toFixed(2)}\n\n`;
        });

        message += `*Total Amount:* $${total.toFixed(2)}\n`;
        message += `---------------------------------\n`;
        message += `Please confirm availability and share payment details.`;

        const encodedMessage = encodeURIComponent(message);
        const whatsAppUrl = `https://wa.me/${sellerWhatsAppNumber}?text=${encodedMessage}`;
        window.open(whatsAppUrl, "_blank");
    };

    if (!isCartOpen) return null;

    return (
        <>
            {/* Backdrop */}
            {isCartOpen && (
                <div className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 transition-opacity duration-300 flex justify-end">
                    {/* Drawer Panel */}
                    <div className="w-full max-w-xl bg-white h-screen flex flex-col shadow-2xl animate-in slide-in-from-right duration-300">
                        {/* Header */}
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

                        {/* Scrollable Body */}
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
                                    cartItems.map((item, index) => (
                                        <div
                                            // ← COMPOSITE KEY: handles same product in different size/color
                                            key={`${item.id}-${item.selectedSize}-${item.selectedColor || "none"}-${index}`}
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
                                                        {/* ← INDEX-BASED REMOVE */}
                                                        <button
                                                            onClick={() =>
                                                                removeItem(index)
                                                            }
                                                            className="text-zinc-400 hover:text-red-500 transition-colors p-1"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>

                                                    {/* ← SIZE + COLOR ROW */}
                                                    <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                                                        <p className="text-xs text-zinc-400">
                                                            Size:{" "}
                                                            <span className="font-semibold text-zinc-700">
                                                                {item.selectedSize}
                                                            </span>
                                                        </p>

                                                        {/* Color dot + name — only if color exists */}
                                                        {item.selectedColor && (
                                                            <p className="text-xs text-zinc-400 flex items-center gap-1.5">
                                                                Color:{" "}
                                                                <span
                                                                    className="inline-block w-3 h-3 rounded-full border border-zinc-200 flex-shrink-0"
                                                                    style={{
                                                                        backgroundColor:
                                                                            item.selectedColor,
                                                                    }}
                                                                />
                                                                {item.selectedColorName && (
                                                                    <span className="font-semibold text-zinc-700">
                                                                        {item.selectedColorName}
                                                                    </span>
                                                                )}
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex justify-between items-center mt-2">
                                                    {/* ← INDEX-BASED QUANTITY */}
                                                    <div className="flex items-center border border-zinc-200 rounded-full bg-zinc-50">
                                                        <button
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    index,
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
                                                                    index,
                                                                    1
                                                                )
                                                            }
                                                            className="p-1.5 hover:bg-zinc-200 rounded-full transition-colors"
                                                        >
                                                            <Plus className="w-3 h-3 text-zinc-600" />
                                                        </button>
                                                    </div>
                                                    <span className="font-bold text-sm text-zinc-900">
                                                        $                                                         {(
                                                            item.price *
                                                            item.quantity
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
                                                Please provide your details to
                                                process the order via WhatsApp.
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
                                                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 active:scale-[0.99] text-white font-bold rounded-xl transition-all shadow-md shadow-emerald-600/10 flex items-center justify-center gap-2 tracking-wide text-sm"
                                            >
                                                <MessageSquare className="w-4 h-4 fill-white" />
                                                Confirm Order via WhatsApp
                                            </button>
                                            <p className="text-center text-[11px] text-zinc-400 mt-2.5">
                                                No payment needed now. We will
                                                finalize your order details
                                                directly in chat.
                                            </p>
                                        </div>
                                    </form>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}