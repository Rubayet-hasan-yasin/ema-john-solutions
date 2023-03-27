import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping } from '@fortawesome/free-solid-svg-icons'

import './Product.css'

const Product = (props) => {
    const { id, img, name, price, seller, ratings, } = props.product
    // console.log(props.product);
const carticon = <FontAwesomeIcon icon={faCartShopping} />
    const handleAddToCart = props.handleAddToCart;
    return (
        <div>
            <div className='product'>
                <img src={img} alt="" />

                <h3>{name}</h3>
                <h4 className='price'>Price: ${price}</h4>
                <p>Manufacturer: {seller}</p>
                <p>Rating : {ratings} start</p>
            </div>
            <button onClick={() => handleAddToCart(props.product)} className='btn-cart'>Add to cart {carticon}</button>
        </div>
    );
};

export default Product;