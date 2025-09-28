
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, commonStyles } from '../styles/commonStyles';
import { subjects, mockTutors } from '../data/mockData';
import SearchBar from '../components/SearchBar';
import SubjectCard from '../components/SubjectCard';
import TutorCard from '../components/TutorCard';
import FilterBottomSheet from '../components/FilterBottomSheet';
import { useSearch } from '../hooks/useSearch';
import Icon from '../components/Icon';

export default function HomeScreen() {
  const [showFilters, setShowFilters] = useState(false);
  const { searchQuery, setSearchQuery, filters, setFilters, filteredTutors } = useSearch(mockTutors);

  const featuredTutors = mockTutors.slice(0, 3);
  const popularSubjects = subjects.slice(0, 6);

  const handleSubjectPress = (subject: string) => {
    console.log('Subject pressed:', subject);
    setFilters({ ...filters, subject });
    router.push('/search');
  };

  const handleTutorPress = (tutorId: string) => {
    console.log('Tutor pressed:', tutorId);
    router.push(`/tutor/${tutorId}`);
  };

  const handleSearchPress = () => {
    console.log('Search pressed');
    router.push('/search');
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={commonStyles.title}>Find Your Perfect Tutor</Text>
            <Text style={commonStyles.textLight}>
              Connect with expert tutors for personalized learning
            </Text>
          </View>
          <TouchableOpacity style={styles.profileButton}>
            <Icon name="person-circle-outline" size={32} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <TouchableOpacity onPress={handleSearchPress}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            onFilterPress={() => setShowFilters(true)}
            placeholder="Search tutors, subjects..."
          />
        </TouchableOpacity>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Expert Tutors</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>50+</Text>
            <Text style={styles.statLabel}>Subjects</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statNumber}>10k+</Text>
            <Text style={styles.statLabel}>Sessions</Text>
          </View>
        </View>

        {/* Popular Subjects */}
        <View style={commonStyles.section}>
          <View style={commonStyles.spaceBetween}>
            <Text style={commonStyles.subtitle}>Popular Subjects</Text>
            <TouchableOpacity onPress={() => router.push('/subjects')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.subjectsGrid}>
            {popularSubjects.map((subject) => (
              <View key={subject.id} style={styles.subjectItem}>
                <SubjectCard
                  subject={subject}
                  onPress={() => handleSubjectPress(subject.name)}
                />
              </View>
            ))}
          </View>
        </View>

        {/* Featured Tutors */}
        <View style={commonStyles.section}>
          <View style={commonStyles.spaceBetween}>
            <Text style={commonStyles.subtitle}>Featured Tutors</Text>
            <TouchableOpacity onPress={() => router.push('/search')}>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {featuredTutors.map((tutor) => (
            <TutorCard
              key={tutor.id}
              tutor={tutor}
              onPress={() => handleTutorPress(tutor.id)}
            />
          ))}
        </View>

        {/* How It Works */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>How It Works</Text>
          
          <View style={styles.stepsContainer}>
            <View style={styles.step}>
              <View style={styles.stepIcon}>
                <Icon name="search" size={24} color={colors.primary} />
              </View>
              <Text style={styles.stepTitle}>1. Find a Tutor</Text>
              <Text style={styles.stepDescription}>
                Browse through our verified tutors and find the perfect match
              </Text>
            </View>
            
            <View style={styles.step}>
              <View style={styles.stepIcon}>
                <Icon name="calendar" size={24} color={colors.primary} />
              </View>
              <Text style={styles.stepTitle}>2. Book a Session</Text>
              <Text style={styles.stepDescription}>
                Schedule a session at your convenience with flexible timing
              </Text>
            </View>
            
            <View style={styles.step}>
              <View style={styles.stepIcon}>
                <Icon name="school" size={24} color={colors.primary} />
              </View>
              <Text style={styles.stepTitle}>3. Start Learning</Text>
              <Text style={styles.stepDescription}>
                Connect with your tutor and begin your personalized learning journey
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <FilterBottomSheet
        isVisible={showFilters}
        onClose={() => setShowFilters(false)}
        filters={filters}
        onApplyFilters={setFilters}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  profileButton: {
    padding: 4,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginHorizontal: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
  },
  seeAllText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
  },
  subjectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
  },
  subjectItem: {
    width: '48%',
  },
  stepsContainer: {
    marginTop: 16,
  },
  step: {
    alignItems: 'center',
    marginBottom: 24,
  },
  stepIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.backgroundAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 14,
    color: colors.textLight,
    textAlign: 'center',
    lineHeight: 20,
  },
});
