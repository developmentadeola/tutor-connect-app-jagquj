
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { User } from '../types';
import { colors, commonStyles, spacing, borderRadius } from '../styles/commonStyles';
import Icon from './Icon';

interface TutorCardProps {
  tutor: User;
  onPress: () => void;
}

export default function TutorCard({ tutor, onPress }: TutorCardProps) {
  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  const renderRating = () => {
    if (!tutor.rating) return null;
    
    const stars = [];
    const fullStars = Math.floor(tutor.rating);
    const hasHalfStar = tutor.rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Icon key={i} name="star" size={14} color={colors.accent} />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <Icon key="half" name="star-half" size={14} color={colors.accent} />
      );
    }
    
    return (
      <View style={commonStyles.row}>
        <View style={[commonStyles.row, { marginRight: spacing.xs }]}>
          {stars}
        </View>
        <Text style={styles.ratingText}>
          {tutor.rating.toFixed(1)} ({tutor.totalSessions} sessions)
        </Text>
      </View>
    );
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={commonStyles.row}>
        <View style={styles.avatarContainer}>
          <View style={commonStyles.avatarLarge}>
            <Text style={styles.avatarText}>
              {getInitials(tutor.name)}
            </Text>
          </View>
          {tutor.verified && (
            <View style={styles.verifiedBadge}>
              <Icon name="checkmark" size={12} color={colors.background} />
            </View>
          )}
        </View>
        
        <View style={styles.info}>
          <View style={[commonStyles.spaceBetween, { marginBottom: spacing.xs }]}>
            <Text style={styles.name} numberOfLines={1}>
              {tutor.name}
            </Text>
            <View style={styles.priceContainer}>
              <Text style={styles.price}>${tutor.hourlyRate}</Text>
              <Text style={styles.priceUnit}>/hr</Text>
            </View>
          </View>
          
          {renderRating()}
          
          <Text style={styles.bio} numberOfLines={2}>
            {tutor.bio}
          </Text>
          
          <View style={styles.subjectsContainer}>
            {tutor.subjects?.slice(0, 3).map((subject, index) => (
              <View key={index} style={commonStyles.badgeSecondary}>
                <Text style={commonStyles.badgeTextSecondary}>{subject}</Text>
              </View>
            ))}
            {tutor.subjects && tutor.subjects.length > 3 && (
              <Text style={styles.moreSubjects}>
                +{tutor.subjects.length - 3} more
              </Text>
            )}
          </View>
          
          <View style={[commonStyles.spaceBetween, { marginTop: spacing.md }]}>
            <View style={commonStyles.row}>
              <Icon name="location-outline" size={16} color={colors.textMuted} />
              <Text style={styles.location}>
                {tutor.location}
              </Text>
            </View>
            <Text style={styles.experience}>
              {tutor.experience}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: borderRadius.lg,
    padding: spacing.lg,
    marginBottom: spacing.md,
    boxShadow: `0px 4px 12px ${colors.shadow}`,
    elevation: 3,
    borderWidth: 1,
    borderColor: colors.borderLight,
  },
  avatarContainer: {
    position: 'relative',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  verifiedBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.success,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: colors.background,
  },
  info: {
    flex: 1,
    marginLeft: spacing.lg,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.text,
    flex: 1,
    marginRight: spacing.sm,
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: 20,
    fontWeight: '800',
    color: colors.primary,
  },
  priceUnit: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textMuted,
    marginLeft: 2,
  },
  ratingText: {
    fontSize: 13,
    color: colors.textMuted,
    fontWeight: '500',
  },
  bio: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginVertical: spacing.sm,
  },
  subjectsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
    alignItems: 'center',
    marginBottom: spacing.xs,
  },
  moreSubjects: {
    fontSize: 12,
    color: colors.textMuted,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  location: {
    fontSize: 13,
    color: colors.textMuted,
    marginLeft: spacing.xs,
    fontWeight: '500',
  },
  experience: {
    fontSize: 13,
    color: colors.primary,
    fontWeight: '600',
  },
});
