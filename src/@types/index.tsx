import { ReactNode } from "react";

// Types of contexts
export interface AuthContextProps {
  user: UserLogin | undefined;
  signInWithGoogle: () => Promise<void>;
}

// Types of UserLogin
export interface UserLogin {
  id: string;
  name: string;
  avatar: string;
  email: string | null;
}

// ContextProps
export interface ContextProps {
  children: ReactNode;
}
