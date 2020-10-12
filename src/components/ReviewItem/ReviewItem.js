import React from 'react';
import './ReviewItem.css';

const ReviewItem = props => {
    const {name, price, img, seller, key, features} = props.product
    return (
        <div className="product review">
            <div>
                <img src={img} alt="product img" />
            </div>
            <div className='product-details'>
                <h3>{name}</h3>
                <br/><br/>  
                <div className='details'>
                    <div>
                        <h4>By: {seller}</h4>
                        <h4>Price: ${price}</h4>
                        <br/>
                        <button 
                             onClick={() => props.removedProduct(key)}
                             className='add_cart_btn'>   
                                removed
                            </button>
                    </div>
                    <div className='feature'>
                        <h4>Feature</h4>
                        <ul>
                            {
                                features.map(feature => <li>{feature.description}:
                                <strong>{feature.value}</strong></li>)
                            }
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReviewItem;