import React from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { dummyUser } from '../data/dummyData';

const WelcomeScreen: React.FC = () => {
  const { login } = useAuth();

  const handleSignUp = () => {
    // For now, just log in with dummy user
    login(dummyUser);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Text style={styles.logo}>ReelReview</Text>
          <Text style={styles.tagline}>
            Connect with mentors for authentic reviews
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Sign up with Instagram"
            onPress={handleSignUp}
            variant="primary"
            size="large"
            style={styles.instagramButton}
          />

          <Button
            title="Continue as Guest"
            onPress={handleSignUp}
            variant="outline"
            size="large"
            style={styles.guestButton}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 80,
  },
  logo: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 16,
  },
  tagline: {
    fontSize: 18,
    color: '#6C757D',
    textAlign: 'center',
    lineHeight: 24,
  },
  buttonContainer: {
    width: '100%',
    gap: 16,
  },
  instagramButton: {
    backgroundColor: '#E4405F',
  },
  guestButton: {
    borderColor: '#007AFF',
  },
});

export default WelcomeScreen;
