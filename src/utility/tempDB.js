import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";
import { useMemo } from 'react';

const addToDb = id => {
    let shoppingCart = getShoppingCart();
    const quantity = shoppingCart[id];
    if (!quantity) {
        shoppingCart[id] = 1;
    }
    else {
        const newQuantity = quantity + 1;
        shoppingCart[id] = newQuantity;
    }
    localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
}

const removeFromDb = id => {
    const shoppingCart = getShoppingCart();
    if (id in shoppingCart) {
        delete shoppingCart[id];
        localStorage.setItem('shopping-cart', JSON.stringify(shoppingCart));
    }
}

const getShoppingCart = () => {
    let shoppingCart = {};
    const storedCart = localStorage.getItem('shopping-cart');
    if (storedCart) {
        shoppingCart = JSON.parse(storedCart);
    }
    return shoppingCart;
}

const deleteShoppingCart = () => {
    localStorage.removeItem('shopping-cart');
}

const cartItems = () => {
    const storedCartItems = getShoppingCart();
    
    const {data: items = []} = useQuery({
        queryKey: ['allProducts'], 
        queryFn: 
        async () => {
            const res = await axios.get('https://ecom-server-hmqo5krgf-methubd.vercel.app/products')
            return res.data;
        }
    })
    const cartItems = useMemo(() => {
        if (!items) return [];

        const updatedCartItems = [];
        for (const id in storedCartItems) {
            const addedItem = items.find(item => item._id === id);
            if (addedItem) {
                updatedCartItems.push(addedItem);
            }
        }
        return updatedCartItems;
    }, [storedCartItems]);

    return cartItems;
}

export {
    addToDb,
    cartItems,
    removeFromDb,
    getShoppingCart,
    deleteShoppingCart
}