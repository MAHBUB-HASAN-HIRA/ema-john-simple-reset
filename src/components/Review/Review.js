import React, {useEffect, useState } from 'react';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css'; 
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([])
    const history = useHistory()
    
    const handleProceedOrder =() => {
        history.push('/shipment')
    }

    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productsKey = Object.keys(savedCart);

        fetch('https://murmuring-temple-61690.herokuapp.com/productsByKeys',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify(productsKey)
        }).then(res => res.json())
        .then(data => setCart(data));

    }, [])

   
    const removedProduct = productKey => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    return (
            <div className='shop-container'>
                <div className="product-container">
                    {
                        cart.map(pd => <ReviewItem removedProduct={removedProduct} key={pd.key} product={pd}></ReviewItem>)
                    }
                    
                </div>
                <div className='cart-container'>
                    <Cart cart={cart}>
                        <button onClick={handleProceedOrder} className='add_cart_btn'>Proceed CheckOut</button>
                    </Cart>
                </div> 
            </div>
    );
};

export default Review;