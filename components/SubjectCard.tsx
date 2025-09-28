
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Subject } from '../types';
import { colors, commonStyles } from '../styles/commonStyles';

interface SubjectCardProps {
  subject: Subject;
  onPress: () => void;
}

export default function SubjectCard({ subject, onPress }: SubjectCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.icon}>{subject.icon}</Text>
      <Text style={styles.name}>{subject.name}</Text>
      <Text style={styles.category}>{subject.category}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 120,
    borderWidth: 1,
    borderColor: colors.border,
    boxShadow: `0px 2px 4px ${colors.shadow}`,
    elevation: 1,
  },
  icon: {
    fontSize: 32,
    marginBottom: 8,
  },
  name: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.text,
    textAlign: 'center',
    marginBottom: 4,
  },
  category: {
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
