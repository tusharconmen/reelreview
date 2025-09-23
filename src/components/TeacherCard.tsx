import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MusicTeacher } from '../types';

interface TeacherCardProps {
  teacher: MusicTeacher;
  onPress?: () => void;
  onFavoritePress?: () => void;
}

const { width } = Dimensions.get('window');
const cardWidth = (width - 48) / 2; // 16px margin on each side, 16px gap between cards

export const TeacherCard: React.FC<TeacherCardProps> = ({
  teacher,
  onPress,
  onFavoritePress,
}) => {
  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Ionicons key={i} name="star" size={12} color="#FCD34D" />
      );
    }

    if (hasHalfStar) {
      stars.push(
        <Ionicons key="half" name="star-half" size={12} color="#FCD34D" />
      );
    }

    return stars;
  };

  return (
    <TouchableOpacity
      style={[styles.card, { width: cardWidth }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: teacher.profileImage }}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.imageOverlay}>
          <Text style={styles.teacherName}>{teacher.name}</Text>
          <Text style={styles.location}>{teacher.location}</Text>
        </View>
        <TouchableOpacity
          style={styles.favoriteButton}
          onPress={onFavoritePress}
          activeOpacity={0.7}
        >
          <Ionicons name="heart-outline" size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.ratingContainer}>
          <View style={styles.starsContainer}>
            {renderStars(teacher.rating)}
          </View>
          <Text style={styles.ratingText}>
            {teacher.rating} ({teacher.reviewCount} avis)
          </Text>
          {teacher.isVerified && (
            <View style={styles.verifiedBadge}>
              <Ionicons name="checkmark-circle" size={16} color="#3B82F6" />
            </View>
          )}
        </View>

        <Text style={styles.specialization} numberOfLines={2}>
          {teacher.specialization}
        </Text>

        <View style={styles.priceContainer}>
          <Text style={styles.price}>
            {teacher.price}{teacher.currency}/h
          </Text>
          {teacher.firstLessonFree && (
            <Text style={styles.freeLesson}>1er cours offert</Text>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    height: 120,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  teacherName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  location: {
    fontSize: 12,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  favoriteButton: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    padding: 12,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  starsContainer: {
    flexDirection: 'row',
    marginRight: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#6B7280',
    marginRight: 4,
  },
  verifiedBadge: {
    marginLeft: 4,
  },
  specialization: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 8,
    lineHeight: 18,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#EC4899',
  },
  freeLesson: {
    fontSize: 12,
    color: '#F472B6',
    backgroundColor: '#FDF2F8',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
  },
});
