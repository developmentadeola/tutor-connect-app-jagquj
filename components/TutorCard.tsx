
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { User } from '../types';
import { colors, commonStyles } from '../styles/commonStyles';
import Icon from './Icon';

interface TutorCardProps {
  tutor: User;
  onPress: () => void;
}

export default function TutorCard({ tutor, onPress }: TutorCardProps) {
  return (
    <TouchableOpacity style={[commonStyles.card, styles.card]} onPress={onPress}>
      <View style={commonStyles.row}>
        <View style={commonStyles.avatarLarge}>
          <Text style={styles.avatarText}>
            {tutor.name.split(' ').map(n => n[0]).join('')}
          </Text>
        </View>
        
        <View style={styles.info}>
          <View style={commonStyles.spaceBetween}>
            <Text style={commonStyles.subtitle}>{tutor.name}</Text>
            {tutor.verified && (
              <Icon name="checkmark-circle" size={20} color={colors.success} />
            )}
          </View>
          
          <View style={[commonStyles.row, { marginVertical: 4 }]}>
            <Icon name="star" size={16} color={colors.warning} />
            <Text style={[commonStyles.textMuted, { marginLeft: 4 }]}>
              {tutor.rating?.toFixed(1)} ({tutor.totalSessions} sessions)
            </Text>
          </View>
          
          <Text style={[commonStyles.textLight, { marginBottom: 8 }]} numberOfLines={2}>
            {tutor.bio}
          </Text>
          
          <View style={styles.subjectsContainer}>
            {tutor.subjects?.slice(0, 3).map((subject, index) => (
              <View key={index} style={commonStyles.badge}>
                <Text style={commonStyles.badgeText}>{subject}</Text>
              </View>
            ))}
            {tutor.subjects && tutor.subjects.length > 3 && (
              <Text style={commonStyles.textMuted}>+{tutor.subjects.length - 3} more</Text>
            )}
          </View>
          
          <View style={[commonStyles.spaceBetween, { marginTop: 12 }]}>
            <Text style={styles.price}>${tutor.hourlyRate}/hour</Text>
            <View style={[commonStyles.row, { alignItems: 'center' }]}>
              <Icon name="location-outline" size={14} color={colors.textMuted} />
              <Text style={[commonStyles.textMuted, { marginLeft: 4 }]}>
                {tutor.location}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 16,
  },
  info: {
    flex: 1,
    marginLeft: 16,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.primary,
  },
  subjectsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    alignItems: 'center',
  },
  price: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
});
