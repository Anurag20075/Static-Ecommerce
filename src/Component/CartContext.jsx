import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    // Now accepts a SINGLE object from DetailPage
    // (which already has selectedSize, selectedColor, selectedColorName, quantity)
    const addToCart = (cartItem) => {
        setCartItems((prev) => {
            // Check for duplicate: same product + same size + same color
            const existingIndex = prev.findIndex(
                (item) =>
                    item.id === cartItem.id &&
                    item.selectedSize === cartItem.selectedSize &&
                    item.selectedColor === cartItem.selectedColor
            );

            if (existingIndex !== -1) {
                // Same exact variant exists → increment quantity
                return prev.map((item, i) =>
                    i === existingIndex
                        ? { ...item, quantity: item.quantity + cartItem.quantity }
                        : item
                );
            }

            // New variant → add as fresh entry
            return [...prev, { ...cartItem }];
        });

        setIsCartOpen(true);
    };

    // Index-based — safe for duplicate products in different sizes/colors
    const updateQuantity = (index, change) => {
        setCartItems((prev) =>
            prev
                .map((item, i) =>
                    i === index
                        ? { ...item, quantity: item.quantity + change }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    // Index-based removal
    const removeItem = (index) => {
        setCartItems((prev) => prev.filter((_, i) => i !== index));
    };

    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <CartContext.Provider
            value={{
                cartItems,
                isCartOpen,
                setIsCartOpen,
                addToCart,
                updateQuantity,
                removeItem,
                cartCount,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);