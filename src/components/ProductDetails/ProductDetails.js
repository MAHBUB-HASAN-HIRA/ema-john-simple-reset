import React from 'react';
import { useParams } from 'react-router-dom';
import Product from '../Product/Product';
import fakeData from '../../fakeData';
import './ProductDetails.css'

const ProductDetails = () => {
    let {productKey} = useParams();

    const product = fakeData.find(pd => pd.key === productKey);
    
    return (
        <div className='product_details'>
            <h1>Yours Product Details.</h1>
            <Product showAddToCart={false} product ={product}></Product>
        </div>
    );
};

export default ProductDetails;