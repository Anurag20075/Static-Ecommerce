import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);

    const addToCart = (product, selectedSize = "M") => {
        setCartItems((prev) => {
            const existing = prev.find(
                (item) =>
                    item.id === product.id && item.selectedSize === selectedSize
            );

            if (existing) {
                return prev.map((item) =>
                    item.id === product.id && item.selectedSize === selectedSize
                        ? {
                              ...item,
                              quantity: item.quantity + 1,
                          }
                        : item
                );
            }

            return [
                ...prev,
                {
                    ...product,
                    selectedSize,
                    quantity: 1,
                },
            ];
        });

        setIsCartOpen(true);
    };

    const updateQuantity = (id, change) => {
        setCartItems((prev) =>
            prev
                .map((item) =>
                    item.id === id
                        ? {
                              ...item,
                              quantity: item.quantity + change,
                          }
                        : item
                )
                .filter((item) => item.quantity > 0)
        );
    };

    const removeItem = (id) => {
        setCartItems((prev) => prev.filter((item) => item.id !== id));
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
