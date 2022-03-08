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

// RoomCodeProps

export interface RoomCodeProps {
  code: string;
}

// RoomParams
export interface RoomParams {
  id: string;
}

// FirebaseQuestions

export type FirebaseQuestions = Record<
  string,
  {
    author: {
      name: string;
      avatar: string;
    };
    content: string;
    isAnswered: boolean;
    isHighlighted: boolean;
    likes: Record<
      string,
      {
        authorId: string;
      }
    >;
  }
>;

export interface QuestionsProps {
  id: string;
  author: {
    name: string;
    avatar: string;
  };
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId: string | undefined;
}

export interface QuestionProps {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
}
