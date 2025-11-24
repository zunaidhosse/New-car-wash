
import React, { useState } from 'react';
import { User } from '../../types';
import { useTranslation } from '../../i18n';
import { useAppContext } from '../../context/AppContext';

interface UserItemProps {
  user: User;
  onIncrement: (userId: string) => void;
  onDelete: (userId: string) => void;
  onGenerateQr: (user: User) => void;
}

const UserItem: React.FC<UserItemProps> = ({ user, onIncrement, onDelete, onGenerateQr }) => {
    const { language } = useAppContext();
    const t = useTranslation(language);
    const [showHistory, setShowHistory] = useState(false);

    return (
        <div className="p-4 rounded-xl bg-base-100 shadow-neumorphic-light dark:shadow-neumorphic-dark">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-base-200 flex items-center justify-center shadow-neumorphic-light-inset dark:shadow-neumorphic-dark-inset">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-text-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    </div>
                    <div>
                        <p className="font-bold">{user.name}</p>
                        <p className="text-sm text-text-secondary">ID: {user.id}</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <span className="font-bold text-xl text-primary">{user.count}</span>
                    <button onClick={() => onIncrement(user.id)} className="w-10 h-10 rounded-full flex items-center justify-center bg-base-100 shadow-neumorphic-light dark:shadow-neumorphic-dark active:shadow-neumorphic-light-inset dark:active:shadow-neumorphic-dark-inset text-primary font-bold text-2xl">+</button>
                </div>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
                 <button onClick={() => onGenerateQr(user)} className="flex-1 text-sm py-2 px-3 rounded-lg bg-base-100 shadow-neumorphic-light dark:shadow-neumorphic-dark hover:shadow-neumorphic-light-inset dark:hover:shadow-neumorphic-dark-inset">{t('generateQr')}</button>
                 <button onClick={() => setShowHistory(!showHistory)} className="flex-1 text-sm py-2 px-3 rounded-lg bg-base-100 shadow-neumorphic-light dark:shadow-neumorphic-dark hover:shadow-neumorphic-light-inset dark:hover:shadow-neumorphic-dark-inset">{t('viewHistory')}</button>
                 <button onClick={() => onDelete(user.id)} className="flex-1 text-sm py-2 px-3 rounded-lg bg-red-200 text-red-700 shadow-neumorphic-light dark:shadow-neumorphic-dark hover:shadow-neumorphic-light-inset dark:hover:shadow-neumorphic-dark-inset">{t('delete')}</button>
            </div>
            {showHistory && (
                <div className="mt-4 p-3 bg-base-100 shadow-neumorphic-light-inset dark:shadow-neumorphic-dark-inset rounded-lg">
                    <h4 className="font-semibold mb-2">{t('history')}</h4>
                    {user.history.length > 0 ? (
                        <ul className="text-sm space-y-1 max-h-32 overflow-y-auto">
                            {[...user.history].reverse().map((log, index) => (
                                <li key={index}>
                                    {new Date(log.date).toLocaleString()}: Count set to {log.count}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-sm text-text-secondary">{t('noHistory')}</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default UserItem;
