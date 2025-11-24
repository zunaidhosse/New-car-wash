
import { Language } from './types';

const translations = {
  en: {
    // General
    adminPanel: 'Admin Panel',
    customerApp: 'Customer App',
    lastUpdated: 'Last Updated',
    message: 'Message',
    status: 'Status',
    // Customer App
    scanQrCode: 'Scan QR Code',
    washesCompleted: 'Washes Completed',
    freeWashEarned: 'Congratulations! You earned a free wash!',
    scanSuccess: 'Data updated successfully!',
    // Admin Panel
    login: 'Login',
    password: 'Password',
    enter: 'Enter',
    incorrectPassword: 'Incorrect password',
    searchByIdOrName: 'Search by ID or Name...',
    createUser: 'Create User',
    userId: 'User ID',
    userName: 'User Name',
    mobileNumber: 'Mobile Number (Optional)',
    initialCount: 'Initial Count',
    userList: 'User List',
    currentCount: 'Current Count',
    generateQr: 'Generate QR',
    delete: 'Delete',
    settings: 'Settings',
    adminNotification: 'Admin Notification for Customers',
    setNotification: 'Set Notification',
    colorTheme: 'Color Theme',
    backupRestore: 'Backup & Restore',
    exportData: 'Export Data',
    importData: 'Import Data',
    history: 'History',
    noHistory: 'No history yet.',
    viewHistory: 'View History'
  },
  ar: {
    // General
    adminPanel: 'لوحة التحكم للمسؤول',
    customerApp: 'تطبيق العميل',
    lastUpdated: 'آخر تحديث',
    message: 'رسالة',
    status: 'الحالة',
    // Customer App
    scanQrCode: 'مسح رمز الاستجابة السريعة',
    washesCompleted: 'الغسلات المكتملة',
    freeWashEarned: 'تهانينا! لقد حصلت على غسلة مجانية!',
    scanSuccess: 'تم تحديث البيانات بنجاح!',
    // Admin Panel
    login: 'تسجيل الدخول',
    password: 'كلمة المرور',
    enter: 'دخول',
    incorrectPassword: 'كلمة مرور خاطئة',
    searchByIdOrName: 'ابحث بالمعرف أو الاسم...',
    createUser: 'إنشاء مستخدم',
    userId: 'معرف المستخدم',
    userName: 'اسم المستخدم',
    mobileNumber: 'رقم الجوال (اختياري)',
    initialCount: 'العدد الأولي',
    userList: 'قائمة المستخدمين',
    currentCount: 'العدد الحالي',
    generateQr: 'إنشاء رمز QR',
    delete: 'حذف',
    settings: 'الإعدادات',
    adminNotification: 'إشعار إداري للعملاء',
    setNotification: 'تعيين الإشعار',
    colorTheme: 'سمة اللون',
    backupRestore: 'النسخ الاحتياطي والاستعادة',
    exportData: 'تصدير البيانات',
    importData: 'استيراد البيانات',
    history: 'السجل',
    noHistory: 'لا يوجد سجل حتى الآن.',
    viewHistory: 'عرض السجل'
  },
};

export const useTranslation = (lang: Language) => {
    return (key: keyof typeof translations.en) => translations[lang][key] || key;
}
