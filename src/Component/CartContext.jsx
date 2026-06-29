import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (cartItem) => {
        setCartItems((prev) => {
            const existingIndex = prev.findIndex(
                (item) =>
                    item.id === cartItem.id &&
                    item.selectedSize === cartItem.selectedSize &&
                    item.selectedColor === cartItem.selectedColor
            );

            if (existingIndex !== -1) {
                return prev.map((item, i) =>
                    i === existingIndex
                        ? { ...item, quantity: item.quantity + cartItem.quantity }
                        : item
                );
            }

            return [...prev, { ...cartItem }];
        });

        // ❌ REMOVED: setIsCartOpen(true);
        // Cart drawer no longer auto-opens on every add.
        // User can open it manually via the header cart icon.
    };

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