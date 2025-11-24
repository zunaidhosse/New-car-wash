
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
    <svg xmlns="http://www.w3.org/2000/svg" className={`w-12 h-12 transition-opacity duration-500 ${completed ? 'opacity-100 text-primary' : 'opacity-30 text-text-secondary'}`} viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <circle cx="7" cy="17" r="2" />
        <circle cx="17" cy="17" r="2" />
        <path d="M5 17h-2v-6l2 -5h9l4 5h1a2 2 0 0 1 2 2v4h-2m-4 0h-6m-6 -6h15m-6 0v-5" />
    </svg>
);


const CustomerDashboard: React.FC<{ customerData: CustomerData; onScanClick: () => void; }> = ({ customerData, onScanClick }) => {
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
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 0h-4m4 0l-5-5" /></svg>
                {t('scanQrCode')}
            </button>
        </div>
    );
};

export default CustomerDashboard;