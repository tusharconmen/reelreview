import React from 'react';
import { View, Text, StyleSheet, FlatList, SafeAreaView } from 'react-native';
import { MentorCard } from '../components/Card';
import { dummyMentors } from '../data/dummyData';
import { Mentor } from '../types';

const HomeScreen: React.FC = () => {
  const renderMentor = ({ item }: { item: Mentor }) => (
    <MentorCard
      name={item.name}
      category={item.category}
      followers={item.followers}
      profileImage={item.profileImage}
      onPress={() => {
        // TODO: Navigate to mentor profile
        // For now, just log the mentor name

        console.log('Mentor pressed:', item.name);
      }}
    />
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Discover Mentors</Text>
        <Text style={styles.subtitle}>Find mentors to review your content</Text>
      </View>

      <FlatList
        data={dummyMentors}
        renderItem={renderMentor}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212529',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#6C757D',
  },
  listContainer: {
    paddingVertical: 8,
  },
});

export default HomeScreen;
