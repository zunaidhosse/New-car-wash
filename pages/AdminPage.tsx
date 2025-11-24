
import React, { useState, useEffect } from 'react';
import LoginScreen from '../components/admin/LoginScreen';
import AdminDashboard from '../components/admin/AdminDashboard';
import { Link } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { useTranslation } from '../i18n';

const AdminPage: React.FC = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const { language } = useAppContext();
    const t = useTranslation(language);

    useEffect(() => {
        const loggedIn = sessionStorage.getItem('isAdminLoggedIn');
        if (loggedIn === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    const handleLogin = () => {
        sessionStorage.setItem('isAdminLoggedIn', 'true');
        setIsLoggedIn(true);
    };

    return (
        <div className="p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <header className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-text-primary">{t('adminPanel')}</h1>
                    <Link to="/" className="text-sm text-primary hover:underline">{t('customerApp')}</Link>
                </header>
                
                {isLoggedIn ? <AdminDashboard /> : <LoginScreen onLogin={handleLogin} />}
            </div>
        </div>
    );
};

export default AdminPage;
