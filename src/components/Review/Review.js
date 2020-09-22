import React, { useEffect, useState } from 'react';
import fakeData from '../../fakeData';
import { getDatabaseCart, processOrder, removeFromDatabaseCart } from '../../utilities/databaseManager';
import Cart from '../Cart/Cart';
import ReviewItem from '../ReviewItem/ReviewItem';
import './Review.css';
import thankyouImg from '../../images/giphy.gif'; 
import { useHistory } from 'react-router-dom';

const Review = () => {
    const [cart, setCart] = useState([])
    const [orderPlace, setOrderPlace] = useState(false)
    const history = useHistory()
    

    const handleProceedOrder =() => {
        history.push('/shipment')
    }

    useEffect(() =>{
        const savedCart = getDatabaseCart();
        const productKeys = Object.keys(savedCart);

        const cartProducts = productKeys.map(key => {
            const product = fakeData.find( pd => pd.key === key);
            product.quantity = savedCart[key];
            return product;
        });
        setCart(cartProducts);
    }, [])

   
    const removedProduct = productKey => {
        const newCart = cart.filter(pd => pd.key !== productKey);
        setCart(newCart);
        removeFromDatabaseCart(productKey);
    }

    let thankyou;
    if(orderPlace){
        thankyou = <img src={thankyouImg} alt=""/>
    }

    return (
        <div className='shop-container'>
            <div className="product-container">
                {
                    cart.map(pd => <ReviewItem removedProduct={removedProduct} key={pd.key} product={pd}></ReviewItem>)
                }
                
                {thankyou}
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