
import React, { useState, useMemo, ChangeEvent } from 'react';
import { useAppContext } from '../../context/AppContext';
import { User, HistoryLog, Theme } from '../../types';
import { useTranslation } from '../../i18n';
import UserItem from './UserItem';
import QRModal from './QRModal';
import { WASH_GOAL } from '../../constants';

const AdminDashboard: React.FC = () => {
    const { users, setUsers, adminNotification, setAdminNotification, theme, setTheme, language, setLanguage } = useAppContext();
    const t = useTranslation(language);

    const [searchTerm, setSearchTerm] = useState('');
    const [newUser, setNewUser] = useState({ id: '', name: '', mobile: '', count: '0' });
    const [notificationInput, setNotificationInput] = useState(adminNotification);
    const [qrCodeData, setQrCodeData] = useState<string | null>(null);

    const filteredUsers = useMemo(() =>
        users.filter(user =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.id.toLowerCase().includes(searchTerm.toLowerCase())
        ), [users, searchTerm]);

    const handleCreateUser = (e: React.FormEvent) => {
        e.preventDefault();
        if (users.some(u => u.id === newUser.id)) {
            alert('User ID must be unique.');
            return;
        }
        const userToAdd: User = {
            ...newUser,
            count: parseInt(newUser.count, 10) || 0,
            startDate: new Date().toISOString(),
            history: [],
        };
        setUsers([...users, userToAdd]);
        setNewUser({ id: '', name: '', mobile: '', count: '0' });
    };

    const handleUserInputChange = (e: ChangeEvent<HTMLInputElement>) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const handleIncrement = (userId: string) => {
        setUsers(users.map(user => {
            if (user.id === userId) {
                const newCount = user.count >= WASH_GOAL ? 0 : user.count + 1;
                const newHistoryEntry: HistoryLog = { date: new Date().toISOString(), count: newCount };
                return { ...user, count: newCount, history: [...user.history, newHistoryEntry] };
            }
            return user;
        }));
    };

    const handleDelete = (userId: string) => {
        if (window.confirm('Are you sure you want to delete this user?')) {
            setUsers(users.filter(user => user.id !== userId));
        }
    };

    const handleGenerateQr = (user: User) => {
        const isFreeWash = user.count === WASH_GOAL;
        const qrData = {
            userId: user.id,
            updatedCount: user.count,
            msg: isFreeWash ? t('freeWashEarned') : '',
            notification: adminNotification
        };
        setQrCodeData(JSON.stringify(qrData));
    };

    const handleExport = () => {
        const dataStr = JSON.stringify({ users, adminNotification }, null, 2);
        const dataUri = 'data:application/json;charset=utf-8,' + encodeURIComponent(dataStr);
        const exportFileDefaultName = 'loyalty_card_backup.json';
        const linkElement = document.createElement('a');
        linkElement.setAttribute('href', dataUri);
        linkElement.setAttribute('download', exportFileDefaultName);
        linkElement.click();
    };

    const handleImport = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target?.result as string);
                    if (data.users && Array.isArray(data.users)) {
                        setUsers(data.users);
                        setAdminNotification(data.adminNotification || '');
                        alert('Data imported successfully!');
                    } else {
                        alert('Invalid backup file format.');
                    }
                } catch (error) {
                    alert('Error reading backup file.');
                }
            };
            reader.readAsText(file);
        }
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 space-y-6">
                {/* User Creation Form */}
                <div className="p-6 rounded-2xl bg-base-100 shadow-neumorphic-light dark:shadow-neumorphic-dark">
                    <h2 className="text-xl font-bold mb-4">{t('createUser')}</h2>
                    <form onSubmit={handleCreateUser} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input type="text" name="id" value={newUser.id} onChange={handleUserInputChange} placeholder={t('userId')} required className="p-3 rounded-lg bg-base-100 shadow-neumorphic-light-inset dark:shadow-neumorphic-dark-inset focus:outline-none" />
                        <input type="text" name="name" value={newUser.name} onChange={handleUserInputChange} placeholder={t('userName')} required className="p-3 rounded-lg bg-base-100 shadow-neumorphic-light-inset dark:shadow-neumorphic-dark-inset focus:outline-none" />
                        <input type="tel" name="mobile" value={newUser.mobile} onChange={handleUserInputChange} placeholder={t('mobileNumber')} className="p-3 rounded-lg bg-base-100 shadow-neumorphic-light-inset dark:shadow-neumorphic-dark-inset focus:outline-none" />
                        <input type="number" name="count" value={newUser.count} onChange={handleUserInputChange} placeholder={t('initialCount')} className="p-3 rounded-lg bg-base-100 shadow-neumorphic-light-inset dark:shadow-neumorphic-dark-inset focus:outline-none" />
                        <button type="submit" className="md:col-span-2 p-3 rounded-lg bg-base-100 shadow-neumorphic-light dark:shadow-neumorphic-dark hover:shadow-neumorphic-light-inset dark:hover:shadow-neumorphic-dark-inset font-semibold text-primary">{t('createUser')}</button>
                    </form>
                </div>

                {/* User List */}
                <div className="p-6 rounded-2xl bg-base-100 shadow-neumorphic-light dark:shadow-neumorphic-dark">
                    <h2 className="text-xl font-bold mb-4">{t('userList')}</h2>
                    <input
                        type="text"
                        placeholder={t('searchByIdOrName')}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-full p-3 mb-4 rounded-lg bg-base-100 shadow-neumorphic-light-inset dark:shadow-neumorphic-dark-inset focus:outline-none"
                    />
                    <div className="space-y-3 max-h-[50vh] overflow-y-auto pr-2">
                        {filteredUsers.map(user => (
                            <UserItem key={user.id} user={user} onIncrement={handleIncrement} onDelete={handleDelete} onGenerateQr={handleGenerateQr} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Settings Panel */}
            <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-base-100 shadow-neumorphic-light dark:shadow-neumorphic-dark">
                    <h2 className="text-xl font-bold mb-4">{t('settings')}</h2>
                    <div className="space-y-4">
                        <div>
                            <label className="font-semibold">{t('adminNotification')}</label>
                            <textarea value={notificationInput} onChange={e => setNotificationInput(e.target.value)} rows={2} className="w-full mt-2 p-2 rounded-lg bg-base-100 shadow-neumorphic-light-inset dark:shadow-neumorphic-dark-inset focus:outline-none" />
                            <button onClick={() => setAdminNotification(notificationInput)} className="w-full mt-2 p-2 rounded-lg bg-base-100 shadow-neumorphic-light dark:shadow-neumorphic-dark hover:shadow-neumorphic-light-inset dark:hover:shadow-neumorphic-dark-inset text-sm">{t('setNotification')}</button>
                        </div>
                        <div>
                            <h3 className="font-semibold">{t('colorTheme')}</h3>
                            <div className="flex gap-2 mt-2">
                                <button onClick={() => setTheme(Theme.Light)} className={`p-2 rounded-full shadow-neumorphic-light dark:shadow-neumorphic-dark ${theme === Theme.Light ? 'shadow-neumorphic-light-inset dark:shadow-neumorphic-dark-inset' : ''}`}>
                                    <div className="w-6 h-6 bg-[#e0e5ec] rounded-full border border-gray-400"></div>
                                </button>
                                <button onClick={() => setTheme(Theme.Dark)} className={`p-2 rounded-full shadow-neumorphic-light dark:shadow-neumorphic-dark ${theme === Theme.Dark ? 'shadow-neumorphic-light-inset dark:shadow-neumorphic-dark-inset' : ''}`}>
                                    <div className="w-6 h-6 bg-[#222222] rounded-full"></div>
                                </button>
                                <button onClick={() => setTheme(Theme.Blue)} className={`p-2 rounded-full shadow-neumorphic-light dark:shadow-neumorphic-dark ${theme === Theme.Blue ? 'shadow-neumorphic-light-inset dark:shadow-neumorphic-dark-inset' : ''}`}>
                                    <div className="w-6 h-6 bg-[#e6f0ff] rounded-full border border-blue-300"></div>
                                </button>
                            </div>
                        </div>
                        <div>
                           <h3 className="font-semibold">{t('backupRestore')}</h3>
                           <div className="flex gap-2 mt-2">
                               <button onClick={handleExport} className="flex-1 p-2 rounded-lg bg-base-100 shadow-neumorphic-light dark:shadow-neumorphic-dark hover:shadow-neumorphic-light-inset dark:hover:shadow-neumorphic-dark-inset text-sm">{t('exportData')}</button>
                               <label className="flex-1 p-2 text-center rounded-lg bg-base-100 shadow-neumorphic-light dark:shadow-neumorphic-dark hover:shadow-neumorphic-light-inset dark:hover:shadow-neumorphic-dark-inset text-sm cursor-pointer">
                                  {t('importData')}
                                  <input type="file" accept=".json" onChange={handleImport} className="hidden" />
                               </label>
                           </div>
                        </div>
                    </div>
                </div>
            </div>
            {qrCodeData && <QRModal data={qrCodeData} onClose={() => setQrCodeData(null)} />}
        </div>
    );
};

export default AdminDashboard;
