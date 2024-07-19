// CartContext.js
import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (ingredient) => {
        // Kiểm tra xem ingredient đã tồn tại trong cartItems chưa
        const existingItem = cartItems.find(item => item._id === ingredient._id);

        if (existingItem) {
            // Nếu tồn tại thì tăng số lượng lên 1
            const updatedItems = cartItems.map(item =>
                item._id === ingredient._id ? { ...item, quantity: item.quantity + 1 } : item
            );
            setCartItems(updatedItems);
        } else {
            // Nếu chưa tồn tại thì thêm mới vào cartItems với số lượng là 1
            setCartItems([...cartItems, { ...ingredient, quantity: 1 }]);
        }
    };

    const removeFromCart = (ingredientId) => {
        const updatedItems = cartItems.filter(item => item._id !== ingredientId);
        setCartItems(updatedItems);
    };

    return (
        <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};
