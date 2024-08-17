import React, { useState, useEffect } from 'react';
import axios from 'axios';

function RegisterSale() {
    const [products, setProducts] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [sales, setSales] = useState([]);
    const [productId, setProductId] = useState('');
    const [warehouseId, setWarehouseId] = useState('');
    const [quantitySold, setQuantitySold] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [notificationVisible, setNotificationVisible] = useState(false);

    useEffect(() => {
        axios.get('http://localhost:8000/api/products/')
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products:', error));

        axios.get('http://localhost:8000/api/warehouses/')
            .then(response => setWarehouses(response.data))
            .catch(error => console.error('Error fetching warehouses:', error));

        fetchSales();
    }, []);

    const fetchSales = () => {
        axios.get('http://localhost:8000/api/sales/')
            .then(response => setSales(response.data))
            .catch(error => console.error('Error fetching sales:', error));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/sales/', {
            product: productId,
            warehouse: warehouseId,
            quantity_sold: quantitySold
        })
        .then(response => {
            console.log('Sale registered:', response.data);
            setShowModal(false);
            fetchSales();
        })
        .catch(error => {
            console.error('Error registering sale:', error);
            setErrorMessage(error.response?.data?.detail || 'An error occurred while registering the sale.');
            setNotificationVisible(true);
            setTimeout(() => setNotificationVisible(false), 5000);
        });
    };

    const handleModalClose = () => {
        setProductId('');
        setWarehouseId('');
        setQuantitySold('');
        setShowModal(false);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col lg:flex-row">
            {/* Error Notification */}
            {notificationVisible && (
                <div className="fixed top-0 left-0 w-full bg-red-600 text-white py-2 px-4 text-center transition-all duration-500 ease-in-out"
                     style={{ animation: 'fadeOut 5s forwards' }}>
                    {errorMessage}
                </div>
            )}

            {/* Desktop view: Split into two columns */}
            <div className={`flex-1 ${showModal ? 'hidden' : 'block'}`}>
                <h1 className="text-2xl font-bold mb-6 text-center">Register Sale</h1>
                <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Product:</label>
                        <select 
                            value={productId} 
                            onChange={(e) => setProductId(e.target.value)} 
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        >
                            <option value="">Select a product</option>
                            {products.map(product => (
                                <option key={product.id} value={product.id}>
                                    {product.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-medium mb-2">Warehouse:</label>
                        <select 
                            value={warehouseId} 
                            onChange={(e) => setWarehouseId(e.target.value)} 
                            className="w-full p-2 border border-gray-300 rounded"
                            required
                        >
                            <option value="">Select a warehouse</option>
                            {warehouses.map(warehouse => (
                                <option key={warehouse.id} value={warehouse.id}>
                                    {warehouse.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-700 font-medium mb-2">Quantity Sold:</label>
                        <input 
                            type="number" 
                            value={quantitySold} 
                            onChange={(e) => setQuantitySold(e.target.value)} 
                            className="w-full p-2 border border-gray-300 rounded" 
                            required
                        />
                    </div>
                    <div className="flex justify-between">
                        <button 
                            type="submit" 
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                        >
                            Register Sale
                        </button>
                        <button 
                            type="button" 
                            onClick={() => {
                                setProductId('');
                                setWarehouseId('');
                                setQuantitySold('');
                            }} 
                            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                        >
                            Reset
                        </button>
                    </div>
                </form>
            </div>

            {/* Desktop view: Sales List */}
            <div className="flex-1 p-6 lg:w-1/2">
                <h2 className="text-xl font-bold mb-4">Sales List</h2>
                <ul className="bg-white p-4 rounded-lg shadow-lg max-w-lg mx-auto">
                    {sales.map(sale => (
                        <li key={sale.id} className="mb-4 p-4 border-b border-gray-200">
                            <p><strong>Product:</strong> {products.find(p => p.id === sale.product)?.name || 'Unknown'}</p>
                            <p><strong>Warehouse:</strong> {warehouses.find(w => w.id === sale.warehouse)?.name || 'Unknown'}</p>
                            <p><strong>Quantity Sold:</strong> {sale.quantity_sold}</p>
                        </li>
                    ))}
                </ul>
            </div>

            {/* Mobile view: Modal for New Sale */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900">New Sale</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Product:</label>
                                <select 
                                    value={productId} 
                                    onChange={(e) => setProductId(e.target.value)} 
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                >
                                    <option value="">Select a product</option>
                                    {products.map(product => (
                                        <option key={product.id} value={product.id}>
                                            {product.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 font-medium mb-2">Warehouse:</label>
                                <select 
                                    value={warehouseId} 
                                    onChange={(e) => setWarehouseId(e.target.value)} 
                                    className="w-full p-2 border border-gray-300 rounded"
                                    required
                                >
                                    <option value="">Select a warehouse</option>
                                    {warehouses.map(warehouse => (
                                        <option key={warehouse.id} value={warehouse.id}>
                                            {warehouse.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-6">
                                <label className="block text-gray-700 font-medium mb-2">Quantity Sold:</label>
                                <input 
                                    type="number" 
                                    value={quantitySold} 
                                    onChange={(e) => setQuantitySold(e.target.value)} 
                                    className="w-full p-2 border border-gray-300 rounded" 
                                    required
                                />
                            </div>
                            <div className="flex justify-between">
                                <button 
                                    type="submit" 
                                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                                >
                                    Register Sale
                                </button>
                                <button 
                                    type="button" 
                                    onClick={handleModalClose} 
                                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* Mobile view: New Sale Button */}
            {!showModal && (
                <button 
                    onClick={() => setShowModal(true)}
                    className="fixed bottom-6 right-6 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition lg:hidden"
                >
                    New Sale
                </button>
            )}
        </div>
    );
}

export default RegisterSale;
