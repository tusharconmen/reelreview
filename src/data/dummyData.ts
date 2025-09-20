import { Mentor, User } from '../types';

export const dummyUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@example.com',
  profileImage: 'https://via.placeholder.com/150',
};

export const dummyMentors: Mentor[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    category: 'Fitness & Wellness',
    followers: 12500,
    profileImage: 'https://via.placeholder.com/150',
    bio: 'Certified personal trainer with 5+ years experience',
  },
  {
    id: '2',
    name: 'Mike Chen',
    category: 'Technology',
    followers: 8900,
    profileImage: 'https://via.placeholder.com/150',
    bio: 'Senior software engineer and tech mentor',
  },
  {
    id: '3',
    name: 'Emma Wilson',
    category: 'Business',
    followers: 15600,
    profileImage: 'https://via.placeholder.com/150',
    bio: 'Entrepreneur and business strategy consultant',
  },
  {
    id: '4',
    name: 'David Rodriguez',
    category: 'Photography',
    followers: 22100,
    profileImage: 'https://via.placeholder.com/150',
    bio: 'Professional photographer and creative director',
  },
  {
    id: '5',
    name: 'Lisa Park',
    category: 'Cooking',
    followers: 18900,
    profileImage: 'https://via.placeholder.com/150',
    bio: 'Chef and culinary instructor',
  },
  {
    id: '6',
    name: 'Alex Thompson',
    category: 'Music',
    followers: 31200,
    profileImage: 'https://via.placeholder.com/150',
    bio: 'Music producer and audio engineer',
  },
];
