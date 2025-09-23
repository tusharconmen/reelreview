import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useAuth } from '../context/AuthContext';
import { Carousel } from '../components/Carousel';
import { InterestsScreen } from './InterestsScreen';
import { MentorSetupScreen } from './MentorSetupScreen';
import { ProfileSetupData, RootStackParamList } from '../types';
import { mentorServices } from '../data/dummyData';

type ProfileSetupScreenNavigationProp = StackNavigationProp<RootStackParamList, 'ProfileSetup'>;

export const ProfileSetupScreen: React.FC = () => {
  const navigation = useNavigation<ProfileSetupScreenNavigationProp>();
  const { completeProfileSetup } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [profileData, setProfileData] = useState<ProfileSetupData>({
    interests: [],
    mentorServices: mentorServices,
    isMentor: false,
    followerCount: 15000, // Simulate user with 15k followers
  });

  const isEligibleForMentor = profileData.followerCount >= 10000;
  const totalSlides = isEligibleForMentor ? 2 : 1;

  const handleInterestsChange = (interests: string[]) => {
    setProfileData(prev => ({ ...prev, interests }));
  };

  const handleServicesChange = (services: any[]) => {
    setProfileData(prev => ({ ...prev, mentorServices: services }));
  };

  const handleNext = () => {
    if (currentSlide < totalSlides - 1) {
      setCurrentSlide(currentSlide + 1);
    }
  };

  const handlePrevious = () => {
    if (currentSlide > 0) {
      setCurrentSlide(currentSlide - 1);
    }
  };

  const handleComplete = () => {
    // Save profile data and navigate to main app
    console.log('Profile setup completed:', profileData);
    
    // Mark profile setup as complete
    completeProfileSetup();
    
    Alert.alert(
      'Profile Setup Complete!',
      'Your profile has been set up successfully. You can now start using the app.',
      [
        {
          text: 'Continue',
          onPress: () => {
            // Navigation will be handled automatically by the RootNavigator
          },
        },
      ]
    );
  };

  const renderInterestsSlide = () => (
    <InterestsScreen
      selectedInterests={profileData.interests}
      onInterestsChange={handleInterestsChange}
    />
  );

  const renderMentorSetupSlide = () => (
    <MentorSetupScreen
      mentorServices={profileData.mentorServices}
      onServicesChange={handleServicesChange}
      followerCount={profileData.followerCount}
    />
  );

  const slides = [
    renderInterestsSlide(),
    ...(isEligibleForMentor ? [renderMentorSetupSlide()] : []),
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Profile Setup</Text>
        <Text style={styles.headerSubtitle}>
          Step {currentSlide + 1} of {totalSlides}
        </Text>
      </View>

      <Carousel
        currentIndex={currentSlide}
        onIndexChange={setCurrentSlide}
        onNext={handleNext}
        onPrevious={handlePrevious}
        onComplete={handleComplete}
        isLastSlide={currentSlide === totalSlides - 1}
        showDots={true}
        showNavigation={true}
      >
        {slides}
      </Carousel>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1F2937',
    textAlign: 'center',
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 4,
  },
});
