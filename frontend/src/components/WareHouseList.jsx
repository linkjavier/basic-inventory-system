import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WarehouseList() {
    const [warehouses, setWarehouses] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [newWarehouseName, setNewWarehouseName] = useState('');
    const [newWarehouseLocation, setNewWarehouseLocation] = useState('');
    const [editWarehouseId, setEditWarehouseId] = useState(null);
    const [editWarehouseName, setEditWarehouseName] = useState('');
    const [editWarehouseLocation, setEditWarehouseLocation] = useState('');

    useEffect(() => {
        fetchWarehouses();
    }, []);

    const fetchWarehouses = () => {
        axios.get('http://localhost:8000/api/warehouses/')
            .then(response => {
                setWarehouses(response.data);
            })
            .catch(error => {
                console.error('Error fetching warehouses:', error);
            });
    };

    const handleAddWarehouse = (event) => {
        event.preventDefault();
        axios.post('http://localhost:8000/api/warehouses/', {
            name: newWarehouseName,
            location: newWarehouseLocation
        })
        .then(response => {
            setShowAddModal(false);
            fetchWarehouses();
        })
        .catch(error => {
            console.error('Error adding warehouse:', error);
        });
    };

    const handleEditWarehouse = (event) => {
        event.preventDefault();
        axios.put(`http://localhost:8000/api/warehouses/${editWarehouseId}/`, {
            name: editWarehouseName,
            location: editWarehouseLocation
        })
        .then(response => {
            setShowEditModal(false);
            fetchWarehouses();
        })
        .catch(error => {
            console.error('Error updating warehouse:', error);
        });
    };

    const openEditModal = (warehouse) => {
        setEditWarehouseId(warehouse.id);
        setEditWarehouseName(warehouse.name);
        setEditWarehouseLocation(warehouse.location);
        setShowEditModal(true);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
            <h1 className="text-4xl font-bold mb-6 text-gray-900">Warehouses</h1>
            <button 
                onClick={() => setShowAddModal(true)}
                className="mb-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
            >
                Add New Warehouse
            </button>
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {warehouses.map(warehouse => (
                    <li key={warehouse.id} className="bg-white p-4 rounded-lg shadow-lg">
                        <h2 className="text-2xl font-semibold text-gray-800">{warehouse.name}</h2>
                        <p className="text-gray-600 mt-2">Location: {warehouse.location}</p>
                        <button 
                            onClick={() => openEditModal(warehouse)}
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
                        <h2 className="text-2xl font-bold mb-6 text-gray-900">Add New Warehouse</h2>
                        <form onSubmit={handleAddWarehouse}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Warehouse Name:</label>
                                <input 
                                    type="text" 
                                    value={newWarehouseName} 
                                    onChange={(e) => setNewWarehouseName(e.target.value)} 
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    required 
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Warehouse Location:</label>
                                <input 
                                    type="text" 
                                    value={newWarehouseLocation} 
                                    onChange={(e) => setNewWarehouseLocation(e.target.value)} 
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    required 
                                />
                            </div>
                            <div className="flex justify-between">
                                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">Add Warehouse</button>
                                <button type="button" onClick={() => setShowAddModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {showEditModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
                        <h2 className="text-2xl font-bold mb-6 text-gray-900">Edit Warehouse</h2>
                        <form onSubmit={handleEditWarehouse}>
                            <div className="mb-4">
                                <label className="block text-gray-700">Warehouse Name:</label>
                                <input 
                                    type="text" 
                                    value={editWarehouseName} 
                                    onChange={(e) => setEditWarehouseName(e.target.value)} 
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    required 
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700">Warehouse Location:</label>
                                <input 
                                    type="text" 
                                    value={editWarehouseLocation} 
                                    onChange={(e) => setEditWarehouseLocation(e.target.value)} 
                                    className="w-full p-2 border border-gray-300 rounded mt-1"
                                    required 
                                />
                            </div>
                            <div className="flex justify-between">
                                <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition">Update Warehouse</button>
                                <button type="button" onClick={() => setShowEditModal(false)} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default WarehouseList;
