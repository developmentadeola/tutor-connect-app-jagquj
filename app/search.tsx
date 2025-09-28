
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, commonStyles } from '../styles/commonStyles';
import { mockTutors } from '../data/mockData';
import SearchBar from '../components/SearchBar';
import TutorCard from '../components/TutorCard';
import FilterBottomSheet from '../components/FilterBottomSheet';
import { useSearch } from '../hooks/useSearch';
import Icon from '../components/Icon';

export default function SearchScreen() {
  const [showFilters, setShowFilters] = useState(false);
  const { searchQuery, setSearchQuery, filters, setFilters, filteredTutors } = useSearch(mockTutors);

  const handleTutorPress = (tutorId: string) => {
    console.log('Tutor pressed:', tutorId);
    router.push(`/tutor/${tutorId}`);
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={commonStyles.subtitle}>Find Tutors</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Search Bar */}
      <View style={commonStyles.content}>
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          onFilterPress={() => setShowFilters(true)}
          placeholder="Search tutors, subjects..."
        />

        {/* Active Filters */}
        {(filters.subject || filters.minPrice || filters.rating) && (
          <View style={styles.activeFilters}>
            {filters.subject && (
              <View style={styles.filterChip}>
                <Text style={styles.filterChipText}>{filters.subject}</Text>
                <TouchableOpacity
                  onPress={() => setFilters({ ...filters, subject: undefined })}
                >
                  <Icon name="close" size={16} color={colors.background} />
                </TouchableOpacity>
              </View>
            )}
            {filters.minPrice && (
              <View style={styles.filterChip}>
                <Text style={styles.filterChipText}>
                  ${filters.minPrice}+
                </Text>
                <TouchableOpacity
                  onPress={() => setFilters({ ...filters, minPrice: undefined, maxPrice: undefined })}
                >
                  <Icon name="close" size={16} color={colors.background} />
                </TouchableOpacity>
              </View>
            )}
            {filters.rating && (
              <View style={styles.filterChip}>
                <Text style={styles.filterChipText}>
                  {filters.rating}+ ⭐
                </Text>
                <TouchableOpacity
                  onPress={() => setFilters({ ...filters, rating: undefined })}
                >
                  <Icon name="close" size={16} color={colors.background} />
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}

        {/* Results */}
        <View style={styles.resultsHeader}>
          <Text style={commonStyles.text}>
            {filteredTutors.length} tutors found
          </Text>
          <TouchableOpacity onPress={() => setShowFilters(true)}>
            <View style={commonStyles.row}>
              <Icon name="options" size={16} color={colors.primary} />
              <Text style={[commonStyles.text, { color: colors.primary, marginLeft: 4 }]}>
                Sort & Filter
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView showsVerticalScrollIndicator={false}>
          {filteredTutors.length > 0 ? (
            filteredTutors.map((tutor) => (
              <TutorCard
                key={tutor.id}
                tutor={tutor}
                onPress={() => handleTutorPress(tutor.id)}
              />
            ))
          ) : (
            <View style={styles.emptyState}>
              <Icon name="search" size={64} color={colors.textMuted} />
              <Text style={[commonStyles.subtitle, { marginTop: 16, textAlign: 'center' }]}>
                No tutors found
              </Text>
              <Text style={[commonStyles.textLight, { textAlign: 'center', marginTop: 8 }]}>
                Try adjusting your search criteria or filters
              </Text>
            </View>
          )}
        </ScrollView>
      </View>

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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  activeFilters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  filterChipText: {
    color: colors.background,
    fontSize: 12,
    fontWeight: '600',
  },
  resultsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 64,
  },
});
