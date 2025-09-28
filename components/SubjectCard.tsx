
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Subject } from '../types';
import { colors, commonStyles, spacing, borderRadius } from '../styles/commonStyles';
import Icon from './Icon';

interface SubjectCardProps {
  subject: Subject;
  onPress: () => void;
}

export default function SubjectCard({ subject, onPress }: SubjectCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'STEM':
        return colors.primary;
      case 'Languages':
        return colors.success;
      case 'Humanities':
        return colors.accent;
      case 'Business':
        return '#8B5CF6'; // Purple
      case 'Creative':
        return '#EC4899'; // Pink
      default:
        return colors.textMuted;
    }
  };

  const categoryColor = getCategoryColor(subject.category);

  return (
    <TouchableOpacity 
      style={[styles.card, { borderLeftColor: categoryColor }]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconContainer, { backgroundColor: `${categoryColor}15` }]}>
        <Icon 
          name={subject.iconName as any || 'book'} 
          size={28} 
          color={categoryColor} 
        />
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {subject.name}
        </Text>
        <Text style={styles.category}>
          {subject.category}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 140,
    borderWidth: 1,
    borderColor: colors.borderLight,
    borderLeftWidth: 4,
    boxShadow: `0px 2px 8px ${colors.shadow}`,
    elevation: 2,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: borderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  content: {
    alignItems: 'center',
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: spacing.xs,
    lineHeight: 22,
  },
  category: {
    fontSize: 12,
    fontWeight: '500',
    color: colors.textMuted,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
