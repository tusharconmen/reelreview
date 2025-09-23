import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TeacherCard } from '../components/TeacherCard';
import { FilterButtons } from '../components/FilterButtons';
import { dummyMusicTeachers } from '../data/dummyData';
import { MusicTeacher } from '../types';

const HomeScreen: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('');

  const filters = [
    'Format du cours',
    'Tarif',
    'Niveau',
    'Temps',
    'Disponibilité',
  ];

  const renderTeacher = ({ item }: { item: MusicTeacher }) => (
    <TeacherCard
      teacher={item}
      onPress={() => {
        console.log('Teacher pressed:', item.name);
      }}
      onFavoritePress={() => {
        console.log('Favorite pressed for:', item.name);
      }}
    />
  );

  const handleFilterPress = (filter: string) => {
    setActiveFilter(activeFilter === filter ? '' : filter);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Musique - Paris</Text>
        </View>
        <View style={styles.placeholder} />
      </View>

      <FilterButtons
        filters={filters}
        activeFilter={activeFilter}
        onFilterPress={handleFilterPress}
      />

      <View style={styles.resultsHeader}>
        <Text style={styles.resultsText}>
          {dummyMusicTeachers.length} professeurs disponibles
        </Text>
      </View>

      <FlatList
        data={dummyMusicTeachers}
        renderItem={renderTeacher}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 4,
  },
  titleContainer: {
    flex: 1,
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  placeholder: {
    width: 32,
  },
  resultsHeader: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#FFFFFF',
  },
  resultsText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },
  row: {
    justifyContent: 'space-between',
  },
});

export default HomeScreen;
