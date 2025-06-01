
"use client";

import type { ReactNode, Dispatch, SetStateAction } from 'react';
import { createContext, useContext, useEffect, useState } from 'react';
import { type User, onAuthStateChanged, signOut as firebaseSignOut, createUserWithEmailAndPassword as firebaseRegister, signInWithEmailAndPassword as firebaseLogin } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import type { LoginFormData, RegisterFormData } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithEmail: (data: LoginFormData) => Promise<User>;
  registerWithEmail: (data: RegisterFormData) => Promise<User>;
  logoutUser: () => Promise<void>;
  setUser: Dispatch<SetStateAction<User | null>>; // Exposed for specific scenarios if needed
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const loginWithEmail = async (data: LoginFormData): Promise<User> => {
    const userCredential = await firebaseLogin(auth, data.email, data.password);
    return userCredential.user;
  };

  const registerWithEmail = async (data: RegisterFormData): Promise<User> => {
    const userCredential = await firebaseRegister(auth, data.email, data.password);
    // You might want to update the user's profile here if needed
    return userCredential.user;
  };

  const logoutUser = async (): Promise<void> => {
    await firebaseSignOut(auth);
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithEmail, registerWithEmail, logoutUser, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
