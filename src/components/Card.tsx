import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  onPress?: () => void;
  disabled?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  disabled = false,
}) => {
  const CardComponent = onPress ? TouchableOpacity : View;

  return (
    <CardComponent
      style={[styles.card, style]}
      onPress={onPress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      {children}
    </CardComponent>
  );
};

interface MentorCardProps {
  name: string;
  category: string;
  followers: number;
  profileImage?: string;
  onPress?: () => void;
}

export const MentorCard: React.FC<MentorCardProps> = ({
  name,
  category,
  followers,
  profileImage,
  onPress,
}) => {
  return (
    <Card onPress={onPress} style={styles.mentorCard}>
      <View style={styles.mentorHeader}>
        <View style={styles.avatarContainer}>
          {profileImage ? (
            <Ionicons name="person" size={24} color="#007AFF" />
          ) : (
            <Ionicons name="person-outline" size={24} color="#6C757D" />
          )}
        </View>
        <View style={styles.mentorInfo}>
          <Text style={styles.mentorName}>{name}</Text>
          <Text style={styles.mentorCategory}>{category}</Text>
        </View>
        <View style={styles.followersContainer}>
          <Ionicons name="people" size={16} color="#6C757D" />
          <Text style={styles.followersText}>{followers.toLocaleString()}</Text>
        </View>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 4,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  mentorCard: {
    marginVertical: 6,
  },
  mentorHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F8F9FA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  mentorInfo: {
    flex: 1,
  },
  mentorName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 2,
  },
  mentorCategory: {
    fontSize: 14,
    color: '#6C757D',
  },
  followersContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  followersText: {
    fontSize: 12,
    color: '#6C757D',
    marginLeft: 4,
  },
});
