import React, { useState, useEffect } from 'react';
import axios from 'axios';

function ProductList() {
    const [products, setProducts] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newProductName, setNewProductName] = useState('');
    const [newProductPrice, setNewProductPrice] = useState('');
    const [newProductDescription, setNewProductDescription] = useState('');
    const [editProductId, setEditProductId] = useState(null);
    const [editProductName, setEditProductName] = useState('');
    const [editProductPrice, setEditProductPrice] = useState('');
    const [editProductDescription, setEditProductDescription] = useState('');

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        axios.get('http://localhost:8000/api/products/')
            .then(response => {
                setProducts(response.data);
            })
            .catch(error => {
                console.error('Error fetching products:', error);
            });
    };

    const handleAddProduct = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/products/', {
            name: newProductName,
            price: newProductPrice,
            description: newProductDescription
        })
        .then(response => {
            setShowAddModal(false);
            fetchProducts();
        })
        .catch(error => {
            console.error('Error adding product:', error);
        });
    };

    const handleEditProduct = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8000/api/products/${editProductId}/`, {
            name: editProductName,
            price: editProductPrice,
            description: editProductDescription
        })
        .then(response => {
            setShowEditModal(false);
            fetchProducts();
        })
        .catch(error => {
            console.error('Error updating product:', error);
        });
    };

    const openEditModal = (product) => {
        setEditProductId(product.id);
        setEditProductName(product.name);
        setEditProductPrice(product.price);
        setEditProductDescription(product.description);
        setShowEditModal(true);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-6 text-gray-900">Products</h1>
            <button 
                onClick={() => setShowAddModal(true)}
                className="mb-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
                Add New Product
            </button>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(product => (
                    <li key={product.id} className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold text-gray-800">{product.name}</h2>
                        <p className="text-gray-600 mt-2">Price: ${product.price}</p>
                        <p className="text-gray-600 mt-2">Description: {product.description}</p>
                        <button 
                            onClick={() => openEditModal(product)}
                            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                        >
                            Edit
                        </button>
                    </li>
                ))}
            </ul>

            {showAddModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900">Add New Product</h2>
                        <form onSubmit={handleAddProduct}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Product Name:</label>
                                <input 
                                    type="text" 
                                    value={newProductName} 
                                    onChange={(e) => setNewProductName(e.target.value)} 
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    required 
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Product Price:</label>
                                <input 
                                    type="number" 
                                    value={newProductPrice} 
                                    onChange={(e) => setNewProductPrice(e.target.value)} 
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    required 
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Product Description:</label>
                                <textarea 
                                    value={newProductDescription} 
                                    onChange={(e) => setNewProductDescription(e.target.value)} 
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    required 
                                />
                            </div>
                            <div className="flex justify-between">
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Add Product</button>
                                <button type="button" onClick={() => setShowAddModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900">Edit Product</h2>
                        <form onSubmit={handleEditProduct}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Product Name:</label>
                                <input 
                                    type="text" 
                                    value={editProductName} 
                                    onChange={(e) => setEditProductName(e.target.value)} 
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    required 
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Product Price:</label>
                                <input 
                                    type="number" 
                                    value={editProductPrice} 
                                    onChange={(e) => setEditProductPrice(e.target.value)} 
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    required 
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Product Description:</label>
                                <textarea 
                                    value={editProductDescription} 
                                    onChange={(e) => setEditProductDescription(e.target.value)} 
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    required 
                                />
                            </div>
                            <div className="flex justify-between">
                                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Update Product</button>
                                <button type="button" onClick={() => setShowEditModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default ProductList;
