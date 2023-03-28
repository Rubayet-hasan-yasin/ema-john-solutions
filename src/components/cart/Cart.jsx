import React from 'react';
import './Cart.css'

const Cart = ({cart}) => {
    console.log(cart);

    let totalPrice = 0;
    let totalShipping = 0;
    

    for (const product of cart){
        totalPrice = totalPrice + product.price;
        totalShipping = totalShipping + product.shipping;
    }

    const tax = totalPrice * 4 / 100;

    const garndTotal = totalPrice + totalShipping + tax;



    return (
        <div className='cart-container'>
            <h2>Order Summary</h2>
            <h5>Selected Items: {cart.length}</h5>
            <p>Total Price: ${totalPrice}</p>
            <p>Total Shipping Charge: ${totalShipping}</p>
            <p>Tax: ${tax.toFixed(2)}</p>
            <h4>Grand Total: ${garndTotal.toFixed(2)}</h4>
        </div>
    );
};

export default Cart;