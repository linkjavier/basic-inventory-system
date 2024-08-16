import React, { useState } from 'react';
import axios from 'axios';

function RegisterSale() {
    const [productId, setProductId] = useState('');
    const [warehouseId, setWarehouseId] = useState('');
    const [quantitySold, setQuantitySold] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/sales/', {
            product_id: productId,
            warehouse_id: warehouseId,
            quantity_sold: quantitySold
        })
        .then(response => {
            console.log('Sale registered:', response.data);
        })
        .catch(error => {
            console.error('Error registering sale:', error);
        });
    };

    return (
        <div>
            <h1>Register Sale</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Product ID:</label>
                    <input type="number" value={productId} onChange={(e) => setProductId(e.target.value)} required />
                </div>
                <div>
                    <label>Warehouse ID:</label>
                    <input type="number" value={warehouseId} onChange={(e) => setWarehouseId(e.target.value)} required />
                </div>
                <div>
                    <label>Quantity Sold:</label>
                    <input type="number" value={quantitySold} onChange={(e) => setQuantitySold(e.target.value)} required />
                </div>
                <button type="submit">Register Sale</button>
            </form>
        </div>
    );
}

export default RegisterSale;
