import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define available languages
type Language = 'en' | 'ja';

// Define translations type
interface TranslationItem {
  en: string;
  ja: string;
}

interface Translations {
  [key: string]: TranslationItem;
}

// Define context type
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

// Create context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Define provider props
interface LanguageProviderProps {
  children: ReactNode;
}

// Translations
const translations: Translations = {
  'app.name': {
    en: 'DotsGames ID',
    ja: 'DotsGames ID',
  },
  'app.tagline': {
    en: 'One ID for all your gaming platforms',
    ja: 'すべてのゲームプラットフォームのための1つのID',
  },
  'common.email': {
    en: 'Email',
    ja: 'メールアドレス',
  },
  'common.password': {
    en: 'Password',
    ja: 'パスワード',
  },
  'common.username': {
    en: 'Username',
    ja: 'ユーザー名',
  },
  'common.submit': {
    en: 'Submit',
    ja: '送信',
  },
  'common.cancel': {
    en: 'Cancel',
    ja: 'キャンセル',
  },
  'common.save': {
    en: 'Save',
    ja: '保存',
  },
  'common.loading': {
    en: 'Loading...',
    ja: '読み込み中...',
  },
  'common.error': {
    en: 'An error occurred',
    ja: 'エラーが発生しました',
  },
  'common.success': {
    en: 'Success!',
    ja: '成功しました！',
  },
  'auth.login': {
    en: 'Login',
    ja: 'ログイン',
  },
  'auth.register': {
    en: 'Register',
    ja: '登録',
  },
  'auth.logout': {
    en: 'Logout',
    ja: 'ログアウト',
  },
  'auth.forgotPassword': {
    en: 'Forgot Password?',
    ja: 'パスワードをお忘れですか？',
  },
  'auth.resetPassword': {
    en: 'Reset Password',
    ja: 'パスワードをリセット',
  },
  'auth.noAccount': {
    en: "Don't have an account?",
    ja: 'アカウントをお持ちでないですか？',
  },
  'auth.haveAccount': {
    en: 'Already have an account?',
    ja: 'すでにアカウントをお持ちですか？',
  },
  'auth.confirmPassword': {
    en: 'Confirm Password',
    ja: 'パスワードを確認',
  },
  'auth.termsAgree': {
    en: 'I agree to the Terms and Conditions',
    ja: '利用規約に同意します',
  },
  'auth.passwordResetSent': {
    en: 'Password reset instructions have been sent to your email',
    ja: 'パスワードリセットの手順がメールで送信されました',
  },
  'auth.loginFailed': {
    en: 'Login failed. Please check your credentials.',
    ja: 'ログインに失敗しました。認証情報を確認してください。',
  },
  'auth.registerFailed': {
    en: 'Registration failed. Email may already be in use.',
    ja: '登録に失敗しました。メールアドレスがすでに使用されている可能性があります。',
  },
  'dashboard.title': {
    en: 'Dashboard',
    ja: 'ダッシュボード',
  },
  'dashboard.welcome': {
    en: 'Welcome back',
    ja: 'お帰りなさい',
  },
  'dashboard.accountSummary': {
    en: 'Account Summary',
    ja: 'アカウント概要',
  },
  'dashboard.linkedPlatforms': {
    en: 'Linked Platforms',
    ja: '連携済みプラットフォーム',
  },
  'dashboard.recentActivity': {
    en: 'Recent Activity',
    ja: '最近のアクティビティ',
  },
  'dashboard.noActivity': {
    en: 'No recent activity',
    ja: '最近のアクティビティはありません',
  },
  'dashboard.accountCreated': {
    en: 'Account created',
    ja: 'アカウント作成',
  },
  'dashboard.platformLinked': {
    en: 'Platform linked',
    ja: 'プラットフォーム連携',
  },
  'dashboard.platformUnlinked': {
    en: 'Platform unlinked',
    ja: 'プラットフォーム連携解除',
  },
  'dashboard.profileUpdated': {
    en: 'Profile updated',
    ja: 'プロフィール更新',
  },
  'profile.title': {
    en: 'Profile',
    ja: 'プロフィール',
  },
  'profile.personalInfo': {
    en: 'Personal Information',
    ja: '個人情報',
  },
  'profile.updateSuccess': {
    en: 'Profile updated successfully',
    ja: 'プロフィールが正常に更新されました',
  },
  'profile.updateFailed': {
    en: 'Failed to update profile',
    ja: 'プロフィールの更新に失敗しました',
  },
  'platform.title': {
    en: 'Gaming Platforms',
    ja: 'ゲームプラットフォーム',
  },
  'platform.link': {
    en: 'Link',
    ja: '連携',
  },
  'platform.unlink': {
    en: 'Unlink',
    ja: '連携解除',
  },
  'platform.linkAccount': {
    en: 'Link Account',
    ja: 'アカウントを連携',
  },
  'platform.platformUsername': {
    en: 'Platform Username',
    ja: 'プラットフォームのユーザー名',
  },
  'platform.linkSuccess': {
    en: 'Platform linked successfully',
    ja: 'プラットフォームが正常に連携されました',
  },
  'platform.unlinkSuccess': {
    en: 'Platform unlinked successfully',
    ja: 'プラットフォームの連携が正常に解除されました',
  },
  'platform.linkFailed': {
    en: 'Failed to link platform',
    ja: 'プラットフォームの連携に失敗しました',
  },
  'platform.unlinkFailed': {
    en: 'Failed to unlink platform',
    ja: 'プラットフォームの連携解除に失敗しました',
  },
  'platform.noLinkedPlatforms': {
    en: 'No linked platforms',
    ja: '連携済みプラットフォームはありません',
  },
  'platform.linkPlatformPrompt': {
    en: 'Link your gaming platforms to access all your games in one place',
    ja: 'ゲームプラットフォームを連携して、すべてのゲームに一か所からアクセスしましょう',
  },
  'landing.getStarted': {
    en: 'Get Started',
    ja: '始める',
  },
  'landing.features': {
    en: 'Features',
    ja: '機能',
  },
  'landing.feature1Title': {
    en: 'One ID for All Platforms',
    ja: 'すべてのプラットフォームのための1つのID',
  },
  'landing.feature1Desc': {
    en: 'Connect all your gaming accounts to a single DotsGames ID',
    ja: 'すべてのゲームアカウントを1つのDotsGames IDに連携',
  },
  'landing.feature2Title': {
    en: 'Secure Authentication',
    ja: '安全な認証',
  },
  'landing.feature2Desc': {
    en: 'Your gaming accounts are protected with industry-standard security',
    ja: 'ゲームアカウントは業界標準のセキュリティで保護されています',
  },
  'landing.feature3Title': {
    en: 'Easy Management',
    ja: '簡単な管理',
  },
  'landing.feature3Desc': {
    en: 'Manage all your gaming profiles from a single dashboard',
    ja: '1つのダッシュボードからすべてのゲームプロフィールを管理',
  },
};

// Provider component
export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    // Get language from localStorage or use browser language
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'ja')) {
      return savedLanguage;
    }
    
    // Check browser language
    const browserLanguage = navigator.language.split('-')[0];
    return browserLanguage === 'ja' ? 'ja' : 'en';
  });

  // Update localStorage when language changes
  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  // Set language function
  const setLanguage = (newLanguage: Language) => {
    setLanguageState(newLanguage);
  };

  // Translation function
  const t = (key: string): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return translations[key][language];
  };

  // Context value
  const value = {
    language,
    setLanguage,
    t,
  };

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};

// Custom hook to use language context
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
