import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import ProductList from './components/ProductList';
import RegisterSale from './components/RegisterSale';
import WarehouseList from './components/WareHouseList';
import InventoryList from './components/InventoryList';

function App() {
    return (
        <Router>
            <Routes>
            <Route path="/" element={<Home />} />
                <Route path="/products" element={<ProductList />} />
                <Route path="/register-sale" element={<RegisterSale />} />
                <Route path="/warehouses" element={<WarehouseList />} />
                <Route path="/inventory" element={<InventoryList />} />
            </Routes>
        </Router>
    );
}

export default App;
