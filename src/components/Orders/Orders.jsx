import React, { useState } from 'react';
import Cart from '../cart/Cart';
import { Link, useLoaderData } from 'react-router-dom';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Orders.css'
import { removeFromDb } from '../../utilities/fakedb';
import { deleteShoppingCart } from '../../utilities/fakedb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCardAlt } from '@fortawesome/free-solid-svg-icons'

const Orders = () => {
    const savedcart = useLoaderData();

    const [cart, setCart] = useState(savedcart)


    const handleRemoveFromCart = id => {
        const remaining = cart.filter(product => product._id !== id)
        setCart(remaining)
        removeFromDb(id)
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();

    }


    return (
        <div className='shop-container'>
            <div className='review-container'>
                {
                    cart.map(product => <ReviewItem
                        key={product._id}
                        product={product}
                        handleRemoveFromCart={handleRemoveFromCart}

                    />)
                }
            </div>
            <div>
                <Cart
                    cart={cart}
                    handleClearCart={handleClearCart}
                >
                    <Link to='/checkout'>
                        <button className='btn-proceed-checkout'>Proceed Checkout
                            <FontAwesomeIcon icon={faCreditCardAlt} className='btn-icon'></FontAwesomeIcon>
                        </button>
                    </Link>
                </Cart>
            </div>
        </div>
    );
};

export default Orders;