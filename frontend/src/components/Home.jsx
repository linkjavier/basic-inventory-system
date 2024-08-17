import React from 'react';
import { Link } from 'react-router-dom';

function Home() {
    return (
        <div className="min-h-screen bg-gray-100 p-8 flex flex-col items-center">
            <h1 className="text-5xl font-bold mb-12 text-gray-900">Dashboard</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full max-w-5xl">
                {/* Card for Products */}
                <Link to="/products" className="bg-white p-6 rounded-lg shadow-lg transform transition hover:scale-105 hover:shadow-2xl">
                    <div className="text-center">
                        <h2 className="text-3xl font-semibold text-blue-600 mb-4">Products</h2>
                        <p className="text-gray-600">View, create, and edit products.</p>
                    </div>
                </Link>

                {/* Card for Register Sale */}
                <Link to="/register-sale" className="bg-white p-6 rounded-lg shadow-lg transform transition hover:scale-105 hover:shadow-2xl">
                    <div className="text-center">
                        <h2 className="text-3xl font-semibold text-green-600 mb-4">Register Sale</h2>
                        <p className="text-gray-600">Register new sales and update inventory.</p>
                    </div>
                </Link>

                {/* Card for Warehouses */}
                <Link to="/warehouses" className="bg-white p-6 rounded-lg shadow-lg transform transition hover:scale-105 hover:shadow-2xl">
                    <div className="text-center">
                        <h2 className="text-3xl font-semibold text-orange-600 mb-4">Warehouses</h2>
                        <p className="text-gray-600">Manage warehouse locations and stock levels.</p>
                    </div>
                </Link>

                {/* Card for Inventory */}
                <Link to="/inventory" className="bg-white p-6 rounded-lg shadow-lg transform transition hover:scale-105 hover:shadow-2xl">
                    <div className="text-center">
                        <h2 className="text-3xl font-semibold text-violet-950 mb-4">Inventory</h2>
                        <p className="text-gray-600">Manage Inventory and Location of Products.</p>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default Home;
