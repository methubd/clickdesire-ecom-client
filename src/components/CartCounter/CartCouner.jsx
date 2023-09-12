import { ShoppingCartIcon } from '@heroicons/react/24/solid'
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import useCartItems from '../../hooks/useCartItems';

const CartCouner = () => {
    const [cartItems] = useCartItems();

    return (
        <div>
            <p className='absolute right-3 top-1 rounded-full bg-red-500 px-1 text-xs text-white font-bold'>{cartItems.length}</p>
            <Link to='/cart-items'><ShoppingCartIcon className='cursor-pointer' width={20} color='white'/></Link>
        </div>
    );
};

export default CartCouner;