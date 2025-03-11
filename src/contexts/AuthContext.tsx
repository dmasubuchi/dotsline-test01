import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define user type
export interface User {
  id: string;
  email: string;
  username: string;
  profileImage?: string;
  createdAt: Date;
}

// Define platform type
export interface Platform {
  id: string;
  name: string;
  icon: string;
  isLinked: boolean;
  username?: string;
  linkedAt?: Date;
}

// Define context type
interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, username: string, password: string) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  linkPlatform: (platformId: string, username: string) => Promise<boolean>;
  unlinkPlatform: (platformId: string) => Promise<boolean>;
  getLinkedPlatforms: () => Platform[];
  getAllPlatforms: () => Platform[];
}

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Mock platforms data
const PLATFORMS: Platform[] = [
  {
    id: 'xbox',
    name: 'Xbox',
    icon: 'xbox',
    isLinked: false,
  },
  {
    id: 'playstation',
    name: 'PlayStation',
    icon: 'playstation',
    isLinked: false,
  },
  {
    id: 'nintendo',
    name: 'Nintendo',
    icon: 'nintendo',
    isLinked: false,
  },
  {
    id: 'steam',
    name: 'Steam',
    icon: 'steam',
    isLinked: false,
  },
  {
    id: 'epic',
    name: 'Epic Games',
    icon: 'epic',
    isLinked: false,
  },
];

// Provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [platforms, setPlatforms] = useState<Platform[]>(PLATFORMS);

  // Check if user is already logged in
  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedPlatforms = localStorage.getItem('platforms');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    if (storedPlatforms) {
      setPlatforms(JSON.parse(storedPlatforms));
    }
    
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists in localStorage
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u: any) => u.email === email);
      
      if (!foundUser || foundUser.password !== password) {
        return false;
      }
      
      // Remove password from user object
      const { password: _, ...userWithoutPassword } = foundUser;
      
      // Set user in state and localStorage
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (email: string, username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user already exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = users.some((u: any) => u.email === email);
      
      if (userExists) {
        return false;
      }
      
      // Create new user
      const newUser = {
        id: `user-${Date.now()}`,
        email,
        username,
        password, // In a real app, this would be hashed
        profileImage: undefined,
        createdAt: new Date(),
      };
      
      // Save user to localStorage
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Remove password from user object for state
      const { password: _, ...userWithoutPassword } = newUser;
      
      // Set user in state and localStorage
      setUser(userWithoutPassword);
      localStorage.setItem('user', JSON.stringify(userWithoutPassword));
      
      return true;
    } catch (error) {
      console.error('Registration error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  // Reset password function
  const resetPassword = async (email: string): Promise<boolean> => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if user exists
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const userExists = users.some((u: any) => u.email === email);
      
      if (!userExists) {
        return false;
      }
      
      // In a real app, this would send an email with a reset link
      // For this demo, we'll just return success
      return true;
    } catch (error) {
      console.error('Password reset error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Update profile function
  const updateProfile = async (data: Partial<User>): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update user in state and localStorage
      const updatedUser = { ...user, ...data };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
      
      // Update user in users array
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const updatedUsers = users.map((u: any) => 
        u.id === user.id ? { ...u, ...data } : u
      );
      localStorage.setItem('users', JSON.stringify(updatedUsers));
      
      return true;
    } catch (error) {
      console.error('Profile update error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Link platform function
  const linkPlatform = async (platformId: string, username: string): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update platforms
      const updatedPlatforms = platforms.map(platform => 
        platform.id === platformId 
          ? { ...platform, isLinked: true, username, linkedAt: new Date() } 
          : platform
      );
      
      setPlatforms(updatedPlatforms);
      localStorage.setItem('platforms', JSON.stringify(updatedPlatforms));
      
      return true;
    } catch (error) {
      console.error('Platform linking error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Unlink platform function
  const unlinkPlatform = async (platformId: string): Promise<boolean> => {
    if (!user) return false;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Update platforms
      const updatedPlatforms = platforms.map(platform => 
        platform.id === platformId 
          ? { ...platform, isLinked: false, username: undefined, linkedAt: undefined } 
          : platform
      );
      
      setPlatforms(updatedPlatforms);
      localStorage.setItem('platforms', JSON.stringify(updatedPlatforms));
      
      return true;
    } catch (error) {
      console.error('Platform unlinking error:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  // Get linked platforms
  const getLinkedPlatforms = (): Platform[] => {
    return platforms.filter(platform => platform.isLinked);
  };

  // Get all platforms
  const getAllPlatforms = (): Platform[] => {
    return platforms;
  };

  // Context value
  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    resetPassword,
    updateProfile,
    linkPlatform,
    unlinkPlatform,
    getLinkedPlatforms,
    getAllPlatforms,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
