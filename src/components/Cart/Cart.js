import React from 'react';
import './Cart.css'


const Cart = props => {
    const cart = props.cart
    const itemsPrice = cart.reduce((price, product) => price + product.price * product.quantity ,0);

    let shipping = 0
    if (itemsPrice > 35) {
        shipping = 5;
    }
    else if(itemsPrice > 15){
        shipping = 8.82;
    }
    else if (itemsPrice > 0){
        shipping = 12.58;
    }

    const tax = itemsPrice / 10;
    const total = itemsPrice + shipping + tax;

    const formatNumber = num => {
        const precision = num.toFixed(2);
        return Number(precision);
    }
    return (
        <div>
             <h2 className='order_summery'>Order Summery</h2>
            <pre className='price_details'>
                <h4>Items Order: ${cart.length}</h4>
                <h4>Items Price: ${formatNumber(itemsPrice)}</h4>
                <h4>shipping   : ${shipping}</h4>
                <h4>Tax + VAT  : ${formatNumber(tax)}</h4>
                <h4>Total      : ${formatNumber(total)}</h4>
                {
                    props.children
                }
            </pre>
        </div>
    );
};

export default Cart;