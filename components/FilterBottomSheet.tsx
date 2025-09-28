
import React, { useState } from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { colors, commonStyles, buttonStyles } from '../styles/commonStyles';
import { SearchFilters } from '../types';
import { subjects } from '../data/mockData';
import SimpleBottomSheet from './BottomSheet';
import Button from './Button';

interface FilterBottomSheetProps {
  isVisible: boolean;
  onClose: () => void;
  filters: SearchFilters;
  onApplyFilters: (filters: SearchFilters) => void;
}

export default function FilterBottomSheet({ 
  isVisible, 
  onClose, 
  filters, 
  onApplyFilters 
}: FilterBottomSheetProps) {
  const [tempFilters, setTempFilters] = useState<SearchFilters>(filters);

  const priceRanges = [
    { label: 'Under $25', min: 0, max: 25 },
    { label: '$25 - $40', min: 25, max: 40 },
    { label: '$40 - $60', min: 40, max: 60 },
    { label: 'Over $60', min: 60, max: 1000 },
  ];

  const ratings = [4.5, 4.0, 3.5, 3.0];

  const handleApply = () => {
    onApplyFilters(tempFilters);
    onClose();
  };

  const handleClear = () => {
    setTempFilters({});
  };

  return (
    <SimpleBottomSheet isVisible={isVisible} onClose={onClose}>
      <View style={styles.container}>
        <View style={commonStyles.spaceBetween}>
          <Text style={commonStyles.title}>Filters</Text>
          <TouchableOpacity onPress={handleClear}>
            <Text style={styles.clearText}>Clear All</Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Subject Filter */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>Subject</Text>
            <View style={styles.optionsGrid}>
              {subjects.map((subject) => (
                <TouchableOpacity
                  key={subject.id}
                  style={[
                    styles.option,
                    tempFilters.subject === subject.name && styles.selectedOption
                  ]}
                  onPress={() => setTempFilters({
                    ...tempFilters,
                    subject: tempFilters.subject === subject.name ? undefined : subject.name
                  })}
                >
                  <Text style={[
                    styles.optionText,
                    tempFilters.subject === subject.name && styles.selectedOptionText
                  ]}>
                    {subject.icon} {subject.name}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Price Range Filter */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>Price Range</Text>
            <View style={styles.optionsColumn}>
              {priceRanges.map((range, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.option,
                    tempFilters.minPrice === range.min && tempFilters.maxPrice === range.max && styles.selectedOption
                  ]}
                  onPress={() => setTempFilters({
                    ...tempFilters,
                    minPrice: tempFilters.minPrice === range.min ? undefined : range.min,
                    maxPrice: tempFilters.maxPrice === range.max ? undefined : range.max,
                  })}
                >
                  <Text style={[
                    styles.optionText,
                    tempFilters.minPrice === range.min && tempFilters.maxPrice === range.max && styles.selectedOptionText
                  ]}>
                    {range.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Rating Filter */}
          <View style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>Minimum Rating</Text>
            <View style={styles.optionsColumn}>
              {ratings.map((rating) => (
                <TouchableOpacity
                  key={rating}
                  style={[
                    styles.option,
                    tempFilters.rating === rating && styles.selectedOption
                  ]}
                  onPress={() => setTempFilters({
                    ...tempFilters,
                    rating: tempFilters.rating === rating ? undefined : rating
                  })}
                >
                  <Text style={[
                    styles.optionText,
                    tempFilters.rating === rating && styles.selectedOptionText
                  ]}>
                    {rating}+ Stars
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>

        <View style={styles.buttonContainer}>
          <Button
            text="Apply Filters"
            onPress={handleApply}
            style={buttonStyles.primary}
            textStyle={{ color: colors.background }}
          />
        </View>
      </View>
    </SimpleBottomSheet>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    maxHeight: '80%',
  },
  content: {
    flex: 1,
    marginVertical: 16,
  },
  clearText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  optionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  optionsColumn: {
    gap: 8,
    marginTop: 12,
  },
  option: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
  },
  selectedOption: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  optionText: {
    fontSize: 14,
    color: colors.text,
    textAlign: 'center',
  },
  selectedOptionText: {
    color: colors.background,
    fontWeight: '600',
  },
  buttonContainer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
