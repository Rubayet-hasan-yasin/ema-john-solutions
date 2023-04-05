import React from 'react';
import './Cart.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faArrowRight } from '@fortawesome/free-solid-svg-icons'

const Cart = ({cart, handleClearCart, children}) => {
    console.log(cart);

    let totalPrice = 0;
    let totalShipping = 0;
    let quantity = 0;
    

    for (const product of cart){
        totalPrice = totalPrice + product.price * product.quantity || 1;
        totalShipping = totalShipping + product.shipping;
        quantity = quantity + product.quantity;
    }

    const tax = totalPrice * 4 / 100;

    const garndTotal = totalPrice + totalShipping + tax;



    return (
        <div className='cart-container'>
            <h2>Order Summary</h2>
            <h5>Selected Items: {quantity}</h5>
            <p>Total Price: ${totalPrice}</p>
            <p>Total Shipping Charge: ${totalShipping}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <h4>Grand Total: ${garndTotal.toFixed(2)}</h4>

            <button onClick={handleClearCart} className='btn-clear-cart'>Clear Cart
                <FontAwesomeIcon icon={faTrashAlt} className='btn-icon'/>
            </button>

            {children}
        </div>
    );
};

export default Cart;