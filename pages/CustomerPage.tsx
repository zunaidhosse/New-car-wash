
import React, { useState } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { CustomerData, QrCodeData, User } from '../types';
import CustomerDashboard from '../components/customer/CustomerDashboard';
import QRScannerModal from '../components/customer/QRScannerModal';
import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n';
import { Language } from '../types';
import { useAppContext } from '../context/AppContext';

const CustomerPage: React.FC = () => {
    const [customerData, setCustomerData] = useLocalStorage<CustomerData>('customerData', {
        user: null,
        lastUpdated: null,
        notification: null,
    });
    
    const [isScanning, setIsScanning] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const { language, setLanguage } = useAppContext();
    const t = useTranslation(language);


    const handleScanSuccess = (decodedText: string) => {
        try {
            const data: QrCodeData = JSON.parse(decodedText);
            if (data.userId && typeof data.updatedCount !== 'undefined') {
                const updatedUser: User = {
                    ...(customerData.user || { id: data.userId, name: 'Customer', startDate: new Date().toISOString(), history: [] }),
                    id: data.userId,
                    count: data.updatedCount,
                };

                setCustomerData({
                    user: updatedUser,
                    lastUpdated: new Date().toISOString(),
                    notification: data.notification,
                });
                
                setIsScanning(false);
                setSuccessMessage(t('scanSuccess'));
                setTimeout(() => setSuccessMessage(''), 3000);
            }
        } catch (error) {
            console.error('Failed to parse QR code data:', error);
            alert('Invalid QR Code');
        }
    };

    const toggleLanguage = () => {
        setLanguage(lang => lang === Language.EN ? Language.AR : Language.EN);
    }

    return (
        <div className="p-4 md:p-8" dir={language === 'ar' ? 'rtl' : 'ltr'}>
             <div className="max-w-md mx-auto">
                 <header className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-text-primary">{t('customerApp')}</h1>
                    <div className="flex items-center gap-4">
                        <button onClick={toggleLanguage} className="text-sm font-semibold p-2 rounded-lg bg-base-100 shadow-neumorphic-light dark:shadow-neumorphic-dark hover:shadow-neumorphic-light-inset dark:hover:shadow-neumorphic-dark-inset">
                            {language === 'en' ? 'AR' : 'EN'}
                        </button>
                        <Link to="/admin" className="text-sm text-primary hover:underline">{t('adminPanel')}</Link>
                    </div>
                </header>

                <CustomerDashboard 
                    customerData={customerData}
                    onScanClick={() => setIsScanning(true)}
                />
                
                {isScanning && (
                    <QRScannerModal
                        onClose={() => setIsScanning(false)}
                        onScanSuccess={handleScanSuccess}
                    />
                )}
                {successMessage && (
                    <div className="fixed bottom-5 left-1/2 -translate-x-1/2 bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg">
                        {successMessage}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CustomerPage;
