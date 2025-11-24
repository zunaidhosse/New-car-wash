import React, { useState, useRef, useEffect } from 'react';
import { ADMIN_PASSWORD } from '../../constants';
import { useAppContext } from '../../context/AppContext';
import { useTranslation } from '../../i18n';

interface LoginScreenProps {
  onLogin: () => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onLogin }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(true);
  const passwordRef = useRef<HTMLInputElement>(null);
  const { language } = useAppContext();
  const t = useTranslation(language);

  useEffect(() => {
    // FIX: Replaced NodeJS.Timeout with ReturnType<typeof setTimeout> for browser compatibility.
    let timer: ReturnType<typeof setTimeout>;
    if (password.length > 0) {
      setShowPassword(true);
      timer = setTimeout(() => {
        setShowPassword(false);
      }, 1000);
    }
    return () => clearTimeout(timer);
  }, [password]);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onLogin();
    } else {
      setError(t('incorrectPassword'));
      setPassword('');
      setShowPassword(true);
    }
  };

  return (
    <div className="max-w-sm mx-auto mt-20 p-8 rounded-2xl bg-base-100 shadow-neumorphic-light dark:shadow-neumorphic-dark">
      <h2 className="text-2xl font-bold text-center mb-6">{t('login')}</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-text-secondary mb-1">{t('password')}</label>
          <div className="relative">
            <input
              ref={passwordRef}
              id="password"
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 rounded-lg bg-base-100 border-none shadow-neumorphic-light-inset dark:shadow-neumorphic-dark-inset focus:outline-none focus:ring-2 focus:ring-primary"
              required
            />
          </div>
          {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
        </div>
        <button
          type="submit"
          className="w-full py-3 px-4 rounded-lg bg-base-100 shadow-neumorphic-light dark:shadow-neumorphic-dark hover:shadow-neumorphic-light-inset dark:hover:shadow-neumorphic-dark-inset active:shadow-neumorphic-light-inset dark:active:shadow-neumorphic-dark-inset font-semibold text-primary transition-shadow"
        >
          {t('enter')}
        </button>
      </form>
    </div>
  );
};

export default LoginScreen;