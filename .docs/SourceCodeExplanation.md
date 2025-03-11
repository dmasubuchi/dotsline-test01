# DotsGames ID System - Source Code Explanation

This document provides a detailed explanation of the DotsGames ID system source code, its architecture, and implementation details.

## Project Structure

The DotsGames ID system follows a modular architecture with the following structure:

```
dotsline-test01/
├── src/                 # Source code
│   ├── components/      # React components
│   │   ├── auth/        # Authentication components
│   │   ├── common/      # Shared components
│   │   ├── dashboard/   # Dashboard components
│   │   ├── layout/      # Layout components
│   │   ├── platform-linking/ # Platform linking components
│   │   ├── profile/     # Profile components
│   │   └── ui/          # UI components
│   ├── contexts/        # React contexts
│   ├── App.tsx          # Main application component
│   ├── index.css        # Global styles
│   └── main.tsx         # Application entry point
├── public/              # Static assets
└── ...                  # Configuration files
```

## Core Components

### Authentication System

The authentication system is implemented using React Context API to provide global state management for user authentication.

#### AuthContext.tsx

```tsx
// src/contexts/AuthContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// User type definition
export interface User {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
}

// Context interface
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, username: string, password: string) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  getLinkedPlatforms: () => Platform[];
  linkPlatform: (platform: Platform) => Promise<boolean>;
  unlinkPlatform: (platformId: string) => Promise<boolean>;
}

// Platform type definition
export interface Platform {
  id: string;
  name: string;
  icon: string;
  username: string;
  isLinked: boolean;
}

// Context creation
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State management
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [platforms, setPlatforms] = useState<Platform[]>([]);

  // Load user from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      parsedUser.createdAt = new Date(parsedUser.createdAt);
      setUser(parsedUser);
    }
    
    const storedPlatforms = localStorage.getItem('platforms');
    if (storedPlatforms) {
      setPlatforms(JSON.parse(storedPlatforms));
    }
  }, []);

  // Authentication methods
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock validation (in a real app, this would be a server call)
      if (email === 'demo@example.com' && password === 'password') {
        const newUser = {
          id: '1',
          email,
          username: 'DemoUser',
          createdAt: new Date()
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
        return true;
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create new user (in a real app, this would be a server call)
      const newUser = {
        id: Date.now().toString(),
        email,
        username,
        createdAt: new Date()
      };
      setUser(newUser);
      localStorage.setItem('user', JSON.stringify(newUser));
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const resetPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would send a reset email
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (user) {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return true;
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Platform linking methods
  const getLinkedPlatforms = (): Platform[] => {
    return platforms.filter(p => p.isLinked);
  };

  const linkPlatform = async (platform: Platform): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const existingIndex = platforms.findIndex(p => p.id === platform.id);
      let updatedPlatforms: Platform[];
      
      if (existingIndex >= 0) {
        updatedPlatforms = [...platforms];
        updatedPlatforms[existingIndex] = { ...platform, isLinked: true };
      } else {
        updatedPlatforms = [...platforms, { ...platform, isLinked: true }];
      }
      
      setPlatforms(updatedPlatforms);
      localStorage.setItem('platforms', JSON.stringify(updatedPlatforms));
      return true;
    } finally {
      setIsLoading(false);
    }
  };

  const unlinkPlatform = async (platformId: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const existingIndex = platforms.findIndex(p => p.id === platformId);
      if (existingIndex >= 0) {
        const updatedPlatforms = [...platforms];
        updatedPlatforms[existingIndex] = { 
          ...updatedPlatforms[existingIndex], 
          isLinked: false 
        };
        
        setPlatforms(updatedPlatforms);
        localStorage.setItem('platforms', JSON.stringify(updatedPlatforms));
        return true;
      }
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Context value
  const value = {
    user,
    isLoading,
    login,
    register,
    logout,
    resetPassword,
    updateProfile,
    getLinkedPlatforms,
    linkPlatform,
    unlinkPlatform
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for using the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
```

### Multilingual Support

The language system is implemented using React Context API to provide global state management for language preferences.

#### LanguageContext.tsx

```tsx
// src/contexts/LanguageContext.tsx
import React, { createContext, useContext, useState, useEffect } from 'react';

// Available languages
type Language = 'en' | 'ja';

// Translation keys
interface Translations {
  [key: string]: {
    [key: string]: string;
  };
}

// Context interface
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Translations
const translations: Translations = {
  en: {
    'app.name': 'DotsGames ID',
    'app.tagline': 'One ID for all your gaming needs',
    'common.email': 'Email',
    'common.password': 'Password',
    'common.username': 'Username',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.loading': 'Loading...',
    'common.error': 'An error occurred. Please try again.',
    'auth.login': 'Log In',
    'auth.register': 'Register',
    'auth.logout': 'Log Out',
    'auth.forgotPassword': 'Forgot Password?',
    'auth.resetPassword': 'Reset Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.passwordResetSent': 'Password reset instructions have been sent to your email.',
    'auth.loginFailed': 'Login failed. Please check your credentials.',
    'auth.registerFailed': 'Registration failed. Please try again.',
    'auth.noAccount': 'Don\'t have an account?',
    'auth.haveAccount': 'Already have an account?',
    'auth.termsAgree': 'I agree to the Terms of Service and Privacy Policy',
    'profile.title': 'Profile',
    'profile.personalInfo': 'Personal Information',
    'profile.updateSuccess': 'Profile updated successfully',
    'profile.updateFailed': 'Failed to update profile',
    'dashboard.welcome': 'Welcome',
    'dashboard.accountSummary': 'Account Summary',
    'dashboard.linkedPlatforms': 'Linked Platforms',
    'dashboard.recentActivity': 'Recent Activity',
    'dashboard.accountCreated': 'Account Created',
    'dashboard.platformLinked': 'Platform Linked',
    'dashboard.noActivity': 'No recent activity',
    'platform.title': 'Gaming Platforms',
    'platform.link': 'Link',
    'platform.unlink': 'Unlink',
    'platform.linkSuccess': 'Platform linked successfully',
    'platform.unlinkSuccess': 'Platform unlinked successfully',
    'platform.linkFailed': 'Failed to link platform',
    'platform.unlinkFailed': 'Failed to unlink platform',
    'platform.noLinkedPlatforms': 'No linked platforms',
    'platform.platformUsername': 'Platform Username',
    'nav.home': 'Home',
    'nav.dashboard': 'Dashboard',
    'nav.profile': 'Profile',
    'nav.platforms': 'Platforms',
    'footer.copyright': '© 2025 DotsGames. All rights reserved.',
    'footer.terms': 'Terms of Service',
    'footer.privacy': 'Privacy Policy',
  },
  ja: {
    'app.name': 'DotsGames ID',
    'app.tagline': 'すべてのゲームに一つのID',
    'common.email': 'メールアドレス',
    'common.password': 'パスワード',
    'common.username': 'ユーザー名',
    'common.save': '保存',
    'common.cancel': 'キャンセル',
    'common.loading': '読み込み中...',
    'common.error': 'エラーが発生しました。もう一度お試しください。',
    'auth.login': 'ログイン',
    'auth.register': '登録',
    'auth.logout': 'ログアウト',
    'auth.forgotPassword': 'パスワードをお忘れですか？',
    'auth.resetPassword': 'パスワードをリセット',
    'auth.confirmPassword': 'パスワードを確認',
    'auth.passwordResetSent': 'パスワードリセットの手順をメールで送信しました。',
    'auth.loginFailed': 'ログインに失敗しました。認証情報を確認してください。',
    'auth.registerFailed': '登録に失敗しました。もう一度お試しください。',
    'auth.noAccount': 'アカウントをお持ちでないですか？',
    'auth.haveAccount': 'すでにアカウントをお持ちですか？',
    'auth.termsAgree': '利用規約とプライバシーポリシーに同意します',
    'profile.title': 'プロフィール',
    'profile.personalInfo': '個人情報',
    'profile.updateSuccess': 'プロフィールが正常に更新されました',
    'profile.updateFailed': 'プロフィールの更新に失敗しました',
    'dashboard.welcome': 'ようこそ',
    'dashboard.accountSummary': 'アカウント概要',
    'dashboard.linkedPlatforms': '連携済みプラットフォーム',
    'dashboard.recentActivity': '最近のアクティビティ',
    'dashboard.accountCreated': 'アカウント作成',
    'dashboard.platformLinked': 'プラットフォーム連携',
    'dashboard.noActivity': '最近のアクティビティはありません',
    'platform.title': 'ゲームプラットフォーム',
    'platform.link': '連携',
    'platform.unlink': '連携解除',
    'platform.linkSuccess': 'プラットフォームが正常に連携されました',
    'platform.unlinkSuccess': 'プラットフォームの連携が正常に解除されました',
    'platform.linkFailed': 'プラットフォームの連携に失敗しました',
    'platform.unlinkFailed': 'プラットフォームの連携解除に失敗しました',
    'platform.noLinkedPlatforms': '連携済みプラットフォームはありません',
    'platform.platformUsername': 'プラットフォームのユーザー名',
    'nav.home': 'ホーム',
    'nav.dashboard': 'ダッシュボード',
    'nav.profile': 'プロフィール',
    'nav.platforms': 'プラットフォーム',
    'footer.copyright': '© 2025 DotsGames. All rights reserved.',
    'footer.terms': '利用規約',
    'footer.privacy': 'プライバシーポリシー',
  }
};

// Context creation
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Provider component
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get stored language or default to English
  const getInitialLanguage = (): Language => {
    const storedLanguage = localStorage.getItem('language') as Language;
    return storedLanguage || 'en';
  };

  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  // Update language and store in localStorage
  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('language', lang);
  };

  // Translation function
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  // Context value
  const value = {
    language,
    setLanguage,
    t
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook for using the language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
```

### Platform Linking

The platform linking component allows users to connect their DotsGames ID with various gaming platforms.

#### PlatformLinking.tsx

```tsx
// src/components/platform-linking/PlatformLinking.tsx
import React, { useState } from 'react';
import { useAuth, Platform } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Alert, AlertDescription } from '../ui/alert';

// Available platforms
const availablePlatforms = [
  { id: 'xbox', name: 'Xbox', icon: 'Xbox' },
  { id: 'playstation', name: 'PlayStation', icon: 'PlayStation' },
  { id: 'nintendo', name: 'Nintendo', icon: 'Nintendo' },
  { id: 'steam', name: 'Steam', icon: 'Steam' },
  { id: 'epic', name: 'Epic Games', icon: 'Epic' },
];

const PlatformLinking: React.FC = () => {
  const { getLinkedPlatforms, linkPlatform, unlinkPlatform, isLoading } = useAuth();
  const { t } = useLanguage();
  
  const [selectedPlatform, setSelectedPlatform] = useState(availablePlatforms[0]);
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const linkedPlatforms = getLinkedPlatforms();
  
  const handleLinkPlatform = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    
    if (!username) {
      setError('Please enter your platform username');
      return;
    }
    
    try {
      const platform: Platform = {
        id: selectedPlatform.id,
        name: selectedPlatform.name,
        icon: selectedPlatform.icon,
        username,
        isLinked: true
      };
      
      const result = await linkPlatform(platform);
      if (result) {
        setSuccess(t('platform.linkSuccess'));
        setUsername('');
      } else {
        setError(t('platform.linkFailed'));
      }
    } catch (err) {
      setError(t('common.error'));
      console.error(err);
    }
  };
  
  const handleUnlinkPlatform = async (platformId: string) => {
    setError('');
    setSuccess('');
    
    try {
      const result = await unlinkPlatform(platformId);
      if (result) {
        setSuccess(t('platform.unlinkSuccess'));
      } else {
        setError(t('platform.unlinkFailed'));
      }
    } catch (err) {
      setError(t('common.error'));
      console.error(err);
    }
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">{t('platform.title')}</h1>
      
      {/* Link Platform Form */}
      <Card>
        <CardHeader>
          <CardTitle>Link a Gaming Platform</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLinkPlatform} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            {success && (
              <Alert>
                <AlertDescription>{success}</AlertDescription>
              </Alert>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="platform">Platform</Label>
              <select
                id="platform"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={selectedPlatform.id}
                onChange={(e) => {
                  const platform = availablePlatforms.find(p => p.id === e.target.value);
                  if (platform) setSelectedPlatform(platform);
                }}
                disabled={isLoading}
              >
                {availablePlatforms.map((platform) => (
                  <option key={platform.id} value={platform.id}>
                    {platform.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="username">{t('platform.platformUsername')}</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={isLoading}
              />
            </div>
            
            <Button type="submit" disabled={isLoading}>
              {isLoading ? t('common.loading') : t('platform.link')}
            </Button>
          </form>
        </CardContent>
      </Card>
      
      {/* Linked Platforms */}
      <Card>
        <CardHeader>
          <CardTitle>{t('dashboard.linkedPlatforms')}</CardTitle>
        </CardHeader>
        <CardContent>
          {linkedPlatforms.length > 0 ? (
            <div className="space-y-4">
              {linkedPlatforms.map((platform) => (
                <div key={platform.id} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-lg font-medium">{platform.icon.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-medium">{platform.name}</div>
                      <div className="text-sm text-gray-500">{platform.username}</div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    onClick={() => handleUnlinkPlatform(platform.id)}
                    disabled={isLoading}
                  >
                    {isLoading ? t('common.loading') : t('platform.unlink')}
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-6 text-gray-500">
              {t('platform.noLinkedPlatforms')}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default PlatformLinking;
```

## Routing and Navigation

The application uses React Router for navigation and route protection.

### App.tsx

```tsx
// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import Layout from './components/layout/Layout';
import LandingPage from './components/common/LandingPage';
import LoginForm from './components/auth/LoginForm';
import RegisterForm from './components/auth/RegisterForm';
import ForgotPasswordForm from './components/auth/ForgotPasswordForm';
import Dashboard from './components/dashboard/Dashboard';
import ProfileForm from './components/profile/ProfileForm';
import PlatformLinking from './components/platform-linking/PlatformLinking';
import ProtectedRoute from './components/common/ProtectedRoute';

const App: React.FC = () => {
  return (
    <LanguageProvider>
      <AuthProvider>
        <Router>
          <Layout>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/forgot-password" element={<ForgotPasswordForm />} />
              
              {/* Protected routes */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfileForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/platforms"
                element={
                  <ProtectedRoute>
                    <PlatformLinking />
                  </ProtectedRoute>
                }
              />
              
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Layout>
        </Router>
      </AuthProvider>
    </LanguageProvider>
  );
};

export default App;
```

### ProtectedRoute.tsx

```tsx
// src/components/common/ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user } = useAuth();
  
  if (!user) {
    // Redirect to login if not authenticated
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

export default ProtectedRoute;
```

## UI Components

The application uses a custom UI component library built with Tailwind CSS.

### Button.tsx

```tsx
// src/components/ui/button.tsx
import * as React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "default", ...props }, ref) => {
    const variantStyles = {
      default: "bg-blue-600 text-white hover:bg-blue-700",
      outline: "border border-gray-300 bg-transparent hover:bg-gray-50",
      ghost: "bg-transparent hover:bg-gray-50",
    };
    
    const sizeStyles = {
      default: "h-10 px-4 py-2",
      sm: "h-8 px-3 py-1 text-sm",
      lg: "h-12 px-6 py-3 text-lg",
    };
    
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ${variantStyles[variant]} ${sizeStyles[size]} ${className || ''}`}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button };
```

## Data Flow

The DotsGames ID system uses a unidirectional data flow pattern:

1. User interactions trigger events in React components
2. Events call methods provided by context providers
3. Context providers update state and localStorage
4. Updated state flows down to components through context
5. Components re-render with the new state

This pattern ensures predictable state management and makes the application easier to debug and maintain.

## Authentication Flow

1. **Registration**:
   - User submits registration form
   - Form data is validated
   - New user is created in localStorage
   - User is redirected to dashboard

2. **Login**:
   - User submits login form
   - Credentials are validated against localStorage
   - User session is created
   - User is redirected to dashboard

3. **Password Reset**:
   - User requests password reset
   - Reset confirmation is simulated
   - Success message is displayed

4. **Logout**:
   - User clicks logout
   - User session is cleared
   - User is redirected to home page

## Platform Linking Flow

1. **Link Platform**:
   - User selects platform and enters username
   - Platform data is saved to localStorage
   - Success message is displayed
   - Linked platform appears in the list

2. **Unlink Platform**:
   - User clicks unlink button
   - Platform is marked as unlinked in localStorage
   - Success message is displayed
   - Platform is removed from the linked platforms list

## Future Enhancements

The current implementation uses localStorage for data persistence. In a production environment, this would be replaced with:

1. **Backend API Integration**:
   - RESTful or GraphQL API endpoints
   - JWT or session-based authentication
   - Proper database storage

2. **Real Platform OAuth**:
   - OAuth 2.0 integration with actual gaming platforms
   - Secure token exchange and storage
   - Proper error handling and token refresh

3. **Enhanced Security**:
   - Password hashing and salting
   - Two-factor authentication
   - Rate limiting and brute force protection

For more details on future enhancements, see the FUTURE_ENHANCEMENTS.md document.
