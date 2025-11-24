
import React, { createContext, useContext, useEffect } from 'react';
import useLocalStorage from '../hooks/useLocalStorage';
import { User, Theme, Language } from '../types';

interface AppContextType {
  users: User[];
  setUsers: React.Dispatch<React.SetStateAction<User[]>>;
  adminNotification: string;
  setAdminNotification: React.Dispatch<React.SetStateAction<string>>;
  theme: Theme;
  setTheme: (theme: Theme) => void;
  language: Language;
  setLanguage: React.Dispatch<React.SetStateAction<Language>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [users, setUsers] = useLocalStorage<User[]>('users', []);
  const [adminNotification, setAdminNotification] = useLocalStorage<string>('adminNotification', '');
  const [theme, rawSetTheme] = useLocalStorage<Theme>('theme', Theme.Light);
  const [language, setLanguage] = useLocalStorage<Language>('language', Language.EN);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(Theme.Light, Theme.Dark, Theme.Blue);
    root.classList.add(theme);
    if(theme === Theme.Dark) {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }
  }, [theme]);

  const setTheme = (newTheme: Theme) => {
    rawSetTheme(newTheme);
  };
  
  return (
    <AppContext.Provider value={{ users, setUsers, adminNotification, setAdminNotification, theme, setTheme, language, setLanguage }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
