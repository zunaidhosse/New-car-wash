
import React from 'react';
import { CustomerData } from '../../types';
import { WASH_GOAL } from '../../constants';
import { useAppContext } from '../../context/AppContext';
import { useTranslation } from '../../i18n';

interface CustomerDashboardProps {
    customerData: CustomerData;
    onScanClick: () => void;
}

const CarIcon: React.FC<{ completed: boolean }> = ({ completed }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={`w-12 h-12 transition-opacity duration-500 ${completed ? 'opacity-100 text-primary' : 'opacity-30 text-text-secondary'}`} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 2a.75.75 0 01.75.75v1.25a.75.75 0 01-1.5 0V2.75A.75.75 0 0110 2zM5.03 3.55a.75.75 0 011.06 0l.91.92a.75.75 0 01-1.06 1.06l-.91-.92a.75.75 0 010-1.06zm9.94 0a.75.75 0 010 1.06l-.92.92a.75.75 0 01-1.06-1.06l.92-.92a.75.75 0 011.06 0zM3.25 9A.75.75 0 014 8.25h1.25a.75.75 0 010 1.5H4A.75.75 0 013.25 9zm13.5 0a.75.75 0 01-.75.75h-1.25a.75.75 0 010-1.5h1.25a.75.75 0 01.75.75zM10 15a.75.75 0 01.75.75v1.25a.75.75 0 01-1.5 0V15.75A.75.75 0 0110 15zm-4.97 1.45a.75.75 0 011.06 0l.92.91a.75.75 0 01-1.06 1.06l-.92-.91a.75.75 0 010-1.06zm9.94 0a.75.75 0 010 1.06l-.91.91a.75.75 0 11-1.06-1.06l.91-.91a.75.75 0 011.06 0zM7.12 6.87A2.5 2.5 0 005.61 5.61l-.92-.91a.75.75 0 00-1.06 1.06l.92.91a4 4 0 015.65 0l.92-.91a.75.75 0 00-1.06-1.06l-.92.91a2.5 2.5 0 00-1.51 1.26.75.75 0 00.19 1.03l.3.26a.75.75 0 001.03-.2 1 1 0 011.52 0 .75.75 0 001.03.2l.3-.26a.75.75 0 00.19-1.03zM10 12a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
    </svg>
);


const CustomerDashboard: React.FC<CustomerDashboardProps> = ({ customerData, onScanClick }) => {
    const { language } = useAppContext();
    const t = useTranslation(language);
    const count = customerData.user?.count || 0;

    return (
        <div className="space-y-6">
            <div className="p-6 rounded-2xl bg-base-100 shadow-neumorphic-light dark:shadow-neumorphic-dark">
                <h2 className="text-center font-bold mb-4">{t('washesCompleted')}</h2>
                <div className="flex justify-center gap-4">
                    {[...Array(WASH_GOAL)].map((_, i) => (
                        <CarIcon key={i} completed={i < count} />
                    ))}
                </div>
            </div>

            <div className="p-6 rounded-2xl bg-base-100 shadow-neumorphic-light dark:shadow-neumorphic-dark">
                 <div className="flex justify-between items-center">
                    <span className="font-semibold text-text-secondary">{t('status')}</span>
                    <span className="font-bold text-2xl text-primary">{count} / {WASH_GOAL}</span>
                 </div>
                 {customerData.lastUpdated && (
                     <p className="text-xs text-text-secondary mt-2 text-center">{t('lastUpdated')}: {new Date(customerData.lastUpdated).toLocaleString()}</p>
                 )}
            </div>
            
            {(customerData.notification) && (
                <div className="p-6 rounded-2xl bg-base-100 shadow-neumorphic-light dark:shadow-neumorphic-dark">
                    <h3 className="font-bold mb-2">{t('message')}</h3>
                    <p className="p-4 bg-base-100 shadow-neumorphic-light-inset dark:shadow-neumorphic-dark-inset rounded-lg text-center text-primary font-semibold animate-pulse">
                        {customerData.notification}
                    </p>
                </div>
            )}
            
            <button onClick={onScanClick} className="w-full py-4 px-4 rounded-xl bg-base-100 shadow-neumorphic-light dark:shadow-neumorphic-dark hover:shadow-neumorphic-light-inset dark:hover:shadow-neumorphic-dark-inset active:shadow-neumorphic-light-inset dark:active:shadow-neumorphic-dark-inset font-semibold text-primary transition-shadow flex items-center justify-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                {t('scanQrCode')}
            </button>
        </div>
    );
};

export default CustomerDashboard;
