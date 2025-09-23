import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { ContentInterest } from '../types';
import { contentInterests } from '../data/dummyData';

interface InterestsScreenProps {
  selectedInterests: string[];
  onInterestsChange: (interests: string[]) => void;
}

export const InterestsScreen: React.FC<InterestsScreenProps> = ({
  selectedInterests,
  onInterestsChange,
}) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const categories = ['Video', 'Photography', 'Writing', 'Design', 'Audio'];

  const toggleInterest = (interestId: string) => {
    const newInterests = selectedInterests.includes(interestId)
      ? selectedInterests.filter(id => id !== interestId)
      : [...selectedInterests, interestId];
    
    onInterestsChange(newInterests);
  };

  const toggleCategory = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter(cat => cat !== category)
      : [...selectedCategories, category];
    
    setSelectedCategories(newCategories);
  };

  const getInterestsByCategory = (category: string) => {
    return contentInterests.filter(interest => interest.category === category);
  };

  const isInterestSelected = (interestId: string) => {
    return selectedInterests.includes(interestId);
  };

  const isCategorySelected = (category: string) => {
    return selectedCategories.includes(category);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>What are you interested in?</Text>
        <Text style={styles.subtitle}>
          Select your content creation interests to get personalized recommendations
        </Text>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {categories.map((category) => (
          <View key={category} style={styles.categorySection}>
            <TouchableOpacity
              style={[
                styles.categoryHeader,
                isCategorySelected(category) && styles.selectedCategoryHeader,
              ]}
              onPress={() => toggleCategory(category)}
            >
              <Text style={[
                styles.categoryTitle,
                isCategorySelected(category) && styles.selectedCategoryTitle,
              ]}>
                {category}
              </Text>
              <Ionicons
                name={isCategorySelected(category) ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={isCategorySelected(category) ? '#3B82F6' : '#6B7280'}
              />
            </TouchableOpacity>

            {isCategorySelected(category) && (
              <View style={styles.interestsGrid}>
                {getInterestsByCategory(category).map((interest) => (
                  <TouchableOpacity
                    key={interest.id}
                    style={[
                      styles.interestChip,
                      isInterestSelected(interest.id) && styles.selectedInterestChip,
                    ]}
                    onPress={() => toggleInterest(interest.id)}
                  >
                    <Ionicons
                      name={interest.icon as any}
                      size={20}
                      color={isInterestSelected(interest.id) ? '#FFFFFF' : '#3B82F6'}
                    />
                    <Text style={[
                      styles.interestText,
                      isInterestSelected(interest.id) && styles.selectedInterestText,
                    ]}>
                      {interest.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.selectedCount}>
          {selectedInterests.length} interests selected
        </Text>
      </View>
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
    paddingVertical: 24,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
  },
  content: {
    flex: 1,
    paddingHorizontal: 20,
  },
  categorySection: {
    marginBottom: 16,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  selectedCategoryHeader: {
    backgroundColor: '#EBF4FF',
    borderColor: '#3B82F6',
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#374151',
  },
  selectedCategoryTitle: {
    color: '#3B82F6',
  },
  interestsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 8,
  },
  interestChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#3B82F6',
    marginRight: 8,
    marginBottom: 8,
  },
  selectedInterestChip: {
    backgroundColor: '#3B82F6',
  },
  interestText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#3B82F6',
    marginLeft: 6,
  },
  selectedInterestText: {
    color: '#FFFFFF',
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#F9FAFB',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  selectedCount: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});
