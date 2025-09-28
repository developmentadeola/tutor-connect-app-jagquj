
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, commonStyles, spacing, borderRadius } from '../styles/commonStyles';
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
          <View style={styles.headerContent}>
            <Text style={styles.greeting}>Welcome back!</Text>
            <Text style={commonStyles.title}>Find Your Perfect Tutor</Text>
            <Text style={commonStyles.textSecondary}>
              Connect with expert tutors for personalized learning
            </Text>
          </View>
          <TouchableOpacity style={styles.profileButton} activeOpacity={0.7}>
            <Icon name="person-circle" size={40} color={colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Search Bar */}
        <TouchableOpacity onPress={handleSearchPress} activeOpacity={1}>
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
            <View style={styles.statIconContainer}>
              <Icon name="people" size={24} color={colors.primary} />
            </View>
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Expert Tutors</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Icon name="library" size={24} color={colors.success} />
            </View>
            <Text style={styles.statNumber}>50+</Text>
            <Text style={styles.statLabel}>Subjects</Text>
          </View>
          <View style={styles.statCard}>
            <View style={styles.statIconContainer}>
              <Icon name="trophy" size={24} color={colors.accent} />
            </View>
            <Text style={styles.statNumber}>10k+</Text>
            <Text style={styles.statLabel}>Sessions</Text>
          </View>
        </View>

        {/* Popular Subjects */}
        <View style={commonStyles.section}>
          <View style={commonStyles.spaceBetween}>
            <Text style={commonStyles.subtitle}>Popular Subjects</Text>
            <TouchableOpacity onPress={() => router.push('/subjects')} activeOpacity={0.7}>
              <View style={commonStyles.row}>
                <Text style={styles.seeAllText}>See All</Text>
                <Icon name="chevron-forward" size={16} color={colors.primary} />
              </View>
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
            <TouchableOpacity onPress={() => router.push('/search')} activeOpacity={0.7}>
              <View style={commonStyles.row}>
                <Text style={styles.seeAllText}>See All</Text>
                <Icon name="chevron-forward" size={16} color={colors.primary} />
              </View>
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
              <View style={[styles.stepIcon, { backgroundColor: `${colors.primary}15` }]}>
                <Icon name="search" size={28} color={colors.primary} />
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Find a Tutor</Text>
                <Text style={styles.stepDescription}>
                  Browse through our verified tutors and find the perfect match for your learning needs
                </Text>
              </View>
            </View>
            
            <View style={styles.step}>
              <View style={[styles.stepIcon, { backgroundColor: `${colors.success}15` }]}>
                <Icon name="calendar" size={28} color={colors.success} />
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Book a Session</Text>
                <Text style={styles.stepDescription}>
                  Schedule a session at your convenience with flexible timing options
                </Text>
              </View>
            </View>
            
            <View style={styles.step}>
              <View style={[styles.stepIcon, { backgroundColor: `${colors.accent}15` }]}>
                <Icon name="school" size={28} color={colors.accent} />
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>Start Learning</Text>
                <Text style={styles.stepDescription}>
                  Connect with your tutor and begin your personalized learning journey
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Bottom Spacing */}
        <View style={{ height: spacing.xl }} />
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
    marginBottom: spacing.xl,
  },
  headerContent: {
    flex: 1,
    marginRight: spacing.md,
  },
  greeting: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  profileButton: {
    padding: spacing.xs,
    borderRadius: borderRadius.full,
    backgroundColor: colors.backgroundSoft,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: spacing.xl,
    gap: spacing.md,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.borderLight,
    boxShadow: `0px 2px 8px ${colors.shadow}`,
    elevation: 2,
  },
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.lg,
    backgroundColor: colors.backgroundSoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.sm,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '800',
    color: colors.text,
    marginBottom: spacing.xs,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  seeAllText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: '600',
    marginRight: spacing.xs,
  },
  subjectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.md,
    marginTop: spacing.lg,
  },
  subjectItem: {
    width: '48%',
  },
  stepsContainer: {
    marginTop: spacing.lg,
    gap: spacing.lg,
  },
  step: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  stepIcon: {
    width: 64,
    height: 64,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.lg,
  },
  stepContent: {
    flex: 1,
    paddingTop: spacing.sm,
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    marginBottom: spacing.sm,
  },
  stepDescription: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 22,
  },
});
