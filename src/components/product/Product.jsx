import React from 'react';
import './Product.css'

const Product = (props) => {
    const { id, img, name, price, seller, ratings } = props.product
    console.log(props.product);
    return (
        <div>
            <div className='product'>
                <img src={img} alt="" />

                <h3>{name}</h3>
                <h4 className='price'>Price: ${price}</h4>
                <p>Manufacturer: {seller}</p>
                <p>Rating : {ratings} start</p>
            </div>
            <button className='btn-cart'>Add to cart</button>
        </div>
    );
};

export default Product;