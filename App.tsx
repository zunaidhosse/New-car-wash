
import React from 'react';
import { HashRouter, Routes, Route, Link } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import AdminPage from './pages/AdminPage';
import CustomerPage from './pages/CustomerPage';

function App() {
  return (
    <AppProvider>
      <HashRouter>
        <div className="min-h-screen bg-base-100 text-text-primary font-sans transition-colors duration-300">
           <Routes>
              <Route path="/admin" element={<AdminPage />} />
              <Route path="/" element={<CustomerPage />} />
          </Routes>
        </div>
      </HashRouter>
    </AppProvider>
  );
}

export default App;
