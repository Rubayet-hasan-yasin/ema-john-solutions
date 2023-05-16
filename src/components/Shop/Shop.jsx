import React, { useEffect, useState } from 'react';
import { addToDb, deleteShoppingCart, getShoppingCart } from '../../utilities/fakedb';
import Cart from '../cart/Cart';
import Product from '../product/Product';
import './Shop.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { Link, useLoaderData } from 'react-router-dom';

const Shop = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(10);

    const { totalProducts } = useLoaderData();





    const totalPages = Math.ceil(totalProducts / itemsPerPage);

    const pageNumber = [...Array(totalPages).keys()];

    const options = [5, 10, 20];

    // useEffect(() => {
    //     fetch('http://localhost:5000/products')
    //         .then(res => res.json())
    //         .then(data => setProducts(data))
    // }, [])

    useEffect(()=>{
        let url = `http://localhost:5000/products?page=${currentPage}&limit=${itemsPerPage}`;
        fetch(url)
        .then(res=> res.json())
        .then(data=> setProducts(data))
    },[currentPage,itemsPerPage])

    const handleAddToCart = product => {
        // const newCart = [...cart, product];
        let newCart = [];
        //if product doesn't exist in the cart, then set quantity = 1 
        //if exist update quantity by 1
        const exists = cart.find(pd => pd._id === product._id);
        if (!exists) {
            product.quantity = 1;
            newCart = [...cart, product];
        }
        else {
            exists.quantity = exists.quantity + 1;
            const remaining = cart.filter(pd => pd._id !== product._id);
            newCart = [...remaining, exists]
        }


        setCart(newCart)

        addToDb(product._id)
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
            const addedProduct = products.find(product => product._id === id);

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

    const handleSelectChange = event =>{
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(0)
    }

    return (
        <>
            <div className='shop-container'>
                <div className='product-container'>
                    {
                        products.map(product => <Product
                            key={product._id}
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
                                <FontAwesomeIcon icon={faArrowRight} className='btn-icon' />
                            </button>
                        </Link>

                    </Cart>


                </div>

            </div>
            {/* pagination */}
            <div className='pagination'>
                <p>currentPage: {currentPage} and itemsPerPage: {itemsPerPage}</p>
                {
                    pageNumber.map(number=> <button 
                        key={number}
                        className={currentPage === number ? 'selected' : ''}
                        onClick={()=>setCurrentPage(number)}
                        >{number}</button>)
                }

                <select value={itemsPerPage} onChange={handleSelectChange}>
                    {
                        options.map(option=> <option key={option} value={option}>{option}</option>)
                    }

                </select>

            </div>
        </>
    );
};

export default Shop;