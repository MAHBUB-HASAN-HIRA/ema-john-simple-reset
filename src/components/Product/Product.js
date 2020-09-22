import React from "react";
import "./Product.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faShoppingCart} from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";


const Product = props => {
  const { name, img, seller, price, stock, key, features} = props.product;

  return (
    <div className="product">
        <div>
            <img src={img} alt="product img" />
        </div>
        <div className='product-details'>
            <h3> <Link to={"/product/"+key}>{name}</Link> </h3>
            <br/>
            <div className='details'>
                <div>
                    <p>By: {seller}</p>
                    <p>${price}</p>
                    <p>only {stock} left in stock - order soon</p>
                    {props.showAddToCart && <button 
                        onClick={() => props.handleAddProduct(props.product)}
                        className='add_cart_btn'>
                            <FontAwesomeIcon icon={faShoppingCart}/>
                            add to cart
                        </button>
                    }
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

export default Product;
