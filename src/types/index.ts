export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
}

export interface Mentor {
  id: string;
  name: string;
  category: string;
  followers: number;
  profileImage?: string;
  bio?: string;
}

export interface ReviewRequest {
  id: string;
  mentorId: string;
  mentorName: string;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: Date;
}

export interface Review {
  id: string;
  mentorId: string;
  mentorName: string;
  content: string;
  rating: number;
  createdAt: Date;
}

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Requests: undefined;
  Library: undefined;
  Profile: undefined;
};
