import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './components/ProductList';
import RegisterSale from './components/RegisterSale';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/products" element={<ProductList />} />
                <Route path="/register-sale" element={<RegisterSale />} />
            </Routes>
        </Router>
    );
}

export default App;
