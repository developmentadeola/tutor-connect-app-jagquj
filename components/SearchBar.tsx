
import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, commonStyles, spacing, borderRadius } from '../styles/commonStyles';
import Icon from './Icon';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress: () => void;
  placeholder?: string;
}

export default function SearchBar({ 
  value, 
  onChangeText, 
  onFilterPress, 
  placeholder = "Search tutors, subjects..." 
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);
  
  return (
    <View style={[
      styles.container,
      isFocused && styles.containerFocused
    ]}>
      <Icon name="search" size={20} color={colors.textMuted} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
      />
      <TouchableOpacity 
        onPress={onFilterPress}
        style={styles.filterButton}
        activeOpacity={0.7}
      >
        <Icon name="options" size={20} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundSoft,
    borderRadius: borderRadius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 2,
    borderColor: colors.borderLight,
  },
  containerFocused: {
    borderColor: colors.primary,
    backgroundColor: colors.background,
    boxShadow: `0px 0px 0px 3px ${colors.primary}20`,
  },
  input: {
    flex: 1,
    marginLeft: spacing.md,
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
  filterButton: {
    padding: spacing.xs,
    borderRadius: borderRadius.sm,
    backgroundColor: colors.background,
    marginLeft: spacing.sm,
  },
});
