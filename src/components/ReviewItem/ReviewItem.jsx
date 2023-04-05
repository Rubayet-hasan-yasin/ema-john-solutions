import React from 'react';
import './ReviewItem.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'

const ReviewItem = ({ product, handleRemoveFromCart }) => {
    const { quantity, img, price, name, id } = product


    return (
        <div className='review-Item'>
            <img src={img} alt="" />

            <div className='review-details'>
                <p className='product-title'>{name}</p>
                <p>Price: <span className='orenge-text'>${price}</span></p>
                <p>Order Quantity: <span>{quantity}</span></p>

            </div>
            <button onClick={() => handleRemoveFromCart(id)} className='btn-delete'> <FontAwesomeIcon className='delete-icon' icon={faTrashAlt} />
            </button>
        </div>
    );
};

export default ReviewItem;