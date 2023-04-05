import React from 'react';
import Cart from '../cart/Cart';
import { useLoaderData } from 'react-router-dom';

const Orders = () => {
    const cart = useLoaderData();
    return (
        <div className='shop-container'>
            <div>
                <h2>Orders Page {cart.length}</h2>
            </div>
            <div>
                <Cart cart={cart} ></Cart>
            </div>
        </div>
    );
};

export default Orders;