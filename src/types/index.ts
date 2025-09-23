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

export interface MusicTeacher {
  id: string;
  name: string;
  location: string;
  specialization: string;
  rating: number;
  reviewCount: number;
  price: number;
  currency: string;
  profileImage?: string;
  isVerified: boolean;
  isOnline: boolean;
  firstLessonFree: boolean;
}

export interface ContentInterest {
  id: string;
  name: string;
  category: string;
  icon: string;
}

export interface MentorService {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  currency: string;
  pricePerMinute?: number;
  isActive: boolean;
}

export interface ProfileSetupData {
  interests: string[];
  mentorServices: MentorService[];
  isMentor: boolean;
  followerCount: number;
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
  ProfileSetup: undefined;
  Main: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Requests: undefined;
  Library: undefined;
  Profile: undefined;
};
