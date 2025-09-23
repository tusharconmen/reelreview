import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const { width: screenWidth } = Dimensions.get('window');

interface CarouselProps {
  children: React.ReactNode[];
  currentIndex: number;
  onIndexChange: (index: number) => void;
  showDots?: boolean;
  showNavigation?: boolean;
  onNext?: () => void;
  onPrevious?: () => void;
  onComplete?: () => void;
  isLastSlide?: boolean;
}

export const Carousel: React.FC<CarouselProps> = ({
  children,
  currentIndex,
  onIndexChange,
  showDots = true,
  showNavigation = true,
  onNext,
  onPrevious,
  onComplete,
  isLastSlide = false,
}) => {
  const scrollViewRef = useRef<ScrollView>(null);

  const handleScroll = (event: any) => {
    const slideSize = event.nativeEvent.layoutMeasurement.width;
    const index = event.nativeEvent.contentOffset.x / slideSize;
    const roundIndex = Math.round(index);
    
    if (roundIndex !== currentIndex) {
      onIndexChange(roundIndex);
    }
  };

  const goToSlide = (index: number) => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: index * screenWidth,
        animated: true,
      });
    }
  };

  const handleNext = () => {
    if (isLastSlide) {
      onComplete?.();
    } else {
      onNext?.();
      goToSlide(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    onPrevious?.();
    goToSlide(currentIndex - 1);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={handleScroll}
        scrollEnabled={false} // Disable manual scrolling for controlled navigation
      >
        {children.map((child, index) => (
          <View key={index} style={styles.slide}>
            {child}
          </View>
        ))}
      </ScrollView>

      {showDots && (
        <View style={styles.dotsContainer}>
          {children.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dot,
                index === currentIndex && styles.activeDot,
              ]}
              onPress={() => goToSlide(index)}
            />
          ))}
        </View>
      )}

      {showNavigation && (
        <View style={styles.navigationContainer}>
          {currentIndex > 0 && (
            <TouchableOpacity
              style={styles.navButton}
              onPress={handlePrevious}
            >
              <Ionicons name="chevron-back" size={24} color="#3B82F6" />
              <Text style={styles.navButtonText}>Previous</Text>
            </TouchableOpacity>
          )}

          <View style={styles.spacer} />

          <TouchableOpacity
            style={[styles.navButton, styles.nextButton]}
            onPress={handleNext}
          >
            <Text style={styles.nextButtonText}>
              {isLastSlide ? 'Complete' : 'Next'}
            </Text>
            <Ionicons 
              name={isLastSlide ? "checkmark" : "chevron-forward"} 
              size={24} 
              color="#FFFFFF" 
            />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  slide: {
    width: screenWidth,
    flex: 1,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 20,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E5E7EB',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#3B82F6',
    width: 24,
  },
  navigationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  navButtonText: {
    fontSize: 16,
    color: '#3B82F6',
    marginLeft: 4,
  },
  nextButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
    marginRight: 4,
  },
  spacer: {
    flex: 1,
  },
});
