import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../cart/Cart';
import Product from '../product/Product';
import './Shop.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    const handleAddToCart = product => {
        // const newCart = [...cart, product];
        let newCart = [];
        //if product doesn't exist in the cart, then set quantity = 1 
        //if exist update quantity by 1
        const exists = cart.find(pd => pd.id === product.id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd.id !== product.id);
            newCart = [...remaining, exists]
        }


        setCart(newCart)

        addToDb(product.id)
    }

    const handleClearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    useEffect(() => {
        const storedCart = getShoppingCart()
        const saveCart = [];
        //step 1: get id
        for (const id in storedCart) {
            //step 2: get the product by using id 
            const addedProduct = products.find(product => product.id === id);

            //3: get quantity of the product 
            if (addedProduct) {
                const quantity = storedCart[id];
                addedProduct.quantity = quantity;

                //4: add the added product  to the saved cart
                saveCart.push(addedProduct)
            }

        }
        //5: set  cart
        setCart(saveCart)

    }, [products])

    return (
        <div className='shop-container'>
            <div className='product-container'>
                {
                    products.map(product => <Product
                        key={product.id}
                        product={product}
                        handleAddToCart={handleAddToCart}
                    ></Product>)
                }
            </div>

            <div className='cart-container-shop'>
                <Cart
                    cart={cart}
                    handleClearCart={handleClearCart}
                >
                    <Link to='/orders'>
                        <button className='btn-review'>Review Order
                            <FontAwesomeIcon icon={faArrowRight} className='btn-icon'/>
                        </button>
                    </Link>

                </Cart>


            </div>

        </div>
    );
};

export default Shop;