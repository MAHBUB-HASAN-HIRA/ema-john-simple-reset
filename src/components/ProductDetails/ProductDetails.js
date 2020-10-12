import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import './ProductDetails.css'

const ProductDetails = () => {
    let {productKey} = useParams();
    const [product, setProduct] = useState({})
    
    useEffect(() =>{
        fetch('https://murmuring-temple-61690.herokuapp.com/product/' + productKey)
        .then(res => res.json())
        .then(data => setProduct(data));
    }, [productKey])

    return (
        <div className='product_details'>
            <h1>Yours Product Details.</h1>
            <Product showAddToCart={false} product ={product}></Product>
        </div>
    );
};

export default ProductDetails;