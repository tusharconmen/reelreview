import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

interface FilterButtonProps {
  label: string;
  isActive?: boolean;
  onPress?: () => void;
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  label,
  isActive = false,
  onPress,
}) => {
  return (
    <TouchableOpacity
      style={[styles.filterButton, isActive && styles.activeFilterButton]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={[styles.filterText, isActive && styles.activeFilterText]}>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

interface FilterButtonsProps {
  filters: string[];
  activeFilter?: string;
  onFilterPress?: (filter: string) => void;
}

export const FilterButtons: React.FC<FilterButtonsProps> = ({
  filters,
  activeFilter,
  onFilterPress,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {filters.map((filter, index) => (
        <FilterButton
          key={index}
          label={filter}
          isActive={activeFilter === filter}
          onPress={() => onFilterPress?.(filter)}
        />
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },
  activeFilterButton: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
});
