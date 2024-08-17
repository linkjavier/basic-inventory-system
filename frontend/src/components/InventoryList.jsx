import React, { useState, useEffect } from 'react';
import axios from 'axios';

function InventoryList() {
    const [inventories, setInventories] = useState([]);
    const [products, setProducts] = useState([]);
    const [warehouses, setWarehouses] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [inventoryToDelete, setInventoryToDelete] = useState(null);
    const [newQuantity, setNewQuantity] = useState('');
    const [newProduct, setNewProduct] = useState('');
    const [newWarehouse, setNewWarehouse] = useState('');

    useEffect(() => {
        fetchInventories();
        fetchProducts();
        fetchWarehouses();
    }, []);

    const fetchInventories = () => {
        axios.get('http://localhost:8000/api/inventory/')
            .then(response => {
                setInventories(response.data);
            })
            .catch(error => {
                console.error('Error fetching inventories:', error);
            });
    };

    const fetchProducts = () => {
        axios.get('http://localhost:8000/api/products/')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    };

    const fetchWarehouses = () => {
        axios.get('http://localhost:8000/api/warehouses/')
            .then(response => {
                setWarehouses(response.data);
            })
            .catch(error => {
                console.error('Error fetching warehouses:', error);
            });
    };

    const handleAddInventory = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/inventory/', {
            quantity: newQuantity,
            product: newProduct,
            warehouse: newWarehouse
        })
        .then(response => {
            setShowAddModal(false);
            fetchInventories();
        })
        .catch(error => {
            console.error('Error adding inventory:', error);
        });
    };

    const handleDeleteInventory = () => {
        axios.delete(`http://localhost:8000/api/inventory/${inventoryToDelete}/`)
            .then(response => {
                setShowDeleteConfirm(false);
                fetchInventories();
            })
            .catch(error => {
                console.error('Error deleting inventory:', error);
            });
    };

    const confirmDelete = (inventoryId) => {
        setInventoryToDelete(inventoryId);
        setShowDeleteConfirm(true);
    };

    const getProductName = (productId) => {
        const product = products.find(p => p.id === productId);
        return product ? product.name : 'Unknown';
    };

    const getWarehouseName = (warehouseId) => {
        const warehouse = warehouses.find(w => w.id === warehouseId);
        return warehouse ? warehouse.name : 'Unknown';
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-6 text-gray-900">Inventory</h1>
            <button 
                onClick={() => setShowAddModal(true)}
                className="mb-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
                Add New Inventory
            </button>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {inventories.map(inventory => (
                    <li key={inventory.id} className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold text-gray-800">{getProductName(inventory.product)}</h2>
                        <p className="text-gray-600 mt-2">Quantity: {inventory.quantity}</p>
                        <p className="text-gray-600 mt-2">Warehouse: {getWarehouseName(inventory.warehouse)}</p>
                        <button 
                            onClick={() => confirmDelete(inventory.id)}
                            className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900">Add New Inventory</h2>
                        <form onSubmit={handleAddInventory}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Quantity:</label>
                                <input 
                                    type="number" 
                                    value={newQuantity} 
                                    onChange={(e) => setNewQuantity(e.target.value)} 
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    required 
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Product:</label>
                                <select 
                                    value={newProduct} 
                                    onChange={(e) => setNewProduct(e.target.value)} 
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    required
                                >
                                    <option value="">Select a product</option>
                                    {products.map(product => (
                                        <option key={product.id} value={product.id}>{product.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Warehouse:</label>
                                <select 
                                    value={newWarehouse} 
                                    onChange={(e) => setNewWarehouse(e.target.value)} 
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    required
                                >
                                    <option value="">Select a warehouse</option>
                                    {warehouses.map(warehouse => (
                                        <option key={warehouse.id} value={warehouse.id}>{warehouse.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="flex justify-between">
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Add Inventory</button>
                                <button type="button" onClick={() => setShowAddModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showDeleteConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900">Confirm Delete</h2>
                        <p className="text-gray-700 mb-4">Are you sure you want to delete this inventory item?</p>
                        <div className="flex justify-between">
                            <button 
                                onClick={handleDeleteInventory}
                                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition"
                            >
                                Delete
                            </button>
                            <button 
                                onClick={() => setShowDeleteConfirm(false)} 
                                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default InventoryList;
