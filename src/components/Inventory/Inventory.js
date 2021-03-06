import React from 'react';

const Inventory = () => {
    const product = {};
const handleAddProduct = () => {
    fetch('https://murmuring-temple-61690.herokuapp.com/addProducts', {
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(product)
    }).then(res => res.json())
    .then(data => console.log(data));
}
    return (
    <div>
        <h1>This is Inventory</h1>
        <form action="">
            <p><span>Name:</span><input type="text"/></p>
            <p><span>Price: </span><input type="text"/></p>
            <p><span>Quantity: </span><input type="text"/></p>
            <p><span>Product Image</span><input type="file"/></p>
            <button onClick={handleAddProduct}>Add Product</button>
        </form>
    </div>
    );
};

export default Inventory;