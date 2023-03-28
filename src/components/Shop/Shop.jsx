import React, { useEffect, useState } from 'react';
import { addToDb, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../cart/Cart';
import Product from '../product/Product';
import './Shop.css'

const Shop = () => {
    const [products, setProducts] = useState([])
    const [cart, setCart] = useState([])

    useEffect(() => {
        fetch('products.json')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])

    const handleAddToCart = product => {
        const newCart = [...cart, product];
        setCart(newCart)

        addToDb(product.id)
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
                <Cart cart={cart}></Cart>
            </div>

        </div>
    );
};

export default Shop;