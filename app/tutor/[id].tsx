
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { colors, commonStyles, buttonStyles } from '../styles/commonStyles';
import { mockTutors } from '../data/mockData';
import Icon from '../components/Icon';
import Button from '../components/Button';
import SimpleBottomSheet from '../components/BottomSheet';

export default function TutorProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [showBookingSheet, setShowBookingSheet] = useState(false);
  
  const tutor = mockTutors.find(t => t.id === id);

  if (!tutor) {
    return (
      <SafeAreaView style={commonStyles.centerContent}>
        <Text style={commonStyles.title}>Tutor not found</Text>
        <Button
          text="Go Back"
          onPress={() => router.back()}
          style={buttonStyles.primary}
          textStyle={{ color: colors.background }}
        />
      </SafeAreaView>
    );
  }

  const handleBack = () => {
    router.back();
  };

  const handleBookSession = () => {
    console.log('Book session with tutor:', tutor.id);
    setShowBookingSheet(true);
  };

  const handleMessage = () => {
    console.log('Message tutor:', tutor.id);
    router.push(`/chat/${tutor.id}`);
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.favoriteButton}>
          <Icon name="heart-outline" size={24} color={colors.text} />
        </TouchableOpacity>
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <View style={styles.profileHeader}>
          <View style={commonStyles.avatarLarge}>
            <Text style={styles.avatarText}>
              {tutor.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          
          <View style={styles.profileInfo}>
            <View style={commonStyles.row}>
              <Text style={commonStyles.title}>{tutor.name}</Text>
              {tutor.verified && (
                <Icon name="checkmark-circle" size={24} color={colors.success} style={{ marginLeft: 8 }} />
              )}
            </View>
            
            <View style={[commonStyles.row, { marginVertical: 8 }]}>
              <Icon name="star" size={18} color={colors.warning} />
              <Text style={[commonStyles.text, { marginLeft: 4 }]}>
                {tutor.rating?.toFixed(1)} ({tutor.totalSessions} sessions)
              </Text>
            </View>
            
            <View style={[commonStyles.row, { marginBottom: 8 }]}>
              <Icon name="location-outline" size={16} color={colors.textMuted} />
              <Text style={[commonStyles.textLight, { marginLeft: 4 }]}>
                {tutor.location}
              </Text>
            </View>
            
            <Text style={styles.price}>${tutor.hourlyRate}/hour</Text>
          </View>
        </View>

        {/* Quick Stats */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{tutor.totalSessions}</Text>
            <Text style={styles.statLabel}>Sessions</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{tutor.experience}</Text>
            <Text style={styles.statLabel}>Experience</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{tutor.subjects?.length}</Text>
            <Text style={styles.statLabel}>Subjects</Text>
          </View>
        </View>

        {/* About */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>About</Text>
          <Text style={[commonStyles.text, { marginTop: 8, lineHeight: 24 }]}>
            {tutor.bio}
          </Text>
        </View>

        {/* Subjects */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Subjects</Text>
          <View style={styles.subjectsContainer}>
            {tutor.subjects?.map((subject, index) => (
              <View key={index} style={styles.subjectChip}>
                <Text style={styles.subjectText}>{subject}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Education */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Education</Text>
          <View style={[commonStyles.row, { marginTop: 8 }]}>
            <Icon name="school-outline" size={20} color={colors.primary} />
            <Text style={[commonStyles.text, { marginLeft: 8 }]}>
              {tutor.education}
            </Text>
          </View>
        </View>

        {/* Languages */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Languages</Text>
          <View style={styles.languagesContainer}>
            {tutor.languages?.map((language, index) => (
              <View key={index} style={styles.languageChip}>
                <Text style={styles.languageText}>{language}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Availability */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Availability</Text>
          <View style={styles.availabilityContainer}>
            {tutor.availability?.map((day, index) => (
              <View key={index} style={styles.dayChip}>
                <Text style={styles.dayText}>{day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Reviews Section */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Reviews</Text>
          <View style={styles.reviewsPlaceholder}>
            <Icon name="star-outline" size={48} color={colors.textMuted} />
            <Text style={[commonStyles.textMuted, { marginTop: 8 }]}>
              Reviews coming soon
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity style={styles.messageButton} onPress={handleMessage}>
          <Icon name="chatbubble-outline" size={20} color={colors.primary} />
          <Text style={styles.messageButtonText}>Message</Text>
        </TouchableOpacity>
        
        <Button
          text="Book Session"
          onPress={handleBookSession}
          style={[buttonStyles.primary, { flex: 1 }]}
          textStyle={{ color: colors.background }}
        />
      </View>

      {/* Booking Bottom Sheet */}
      <SimpleBottomSheet
        isVisible={showBookingSheet}
        onClose={() => setShowBookingSheet(false)}
      >
        <View style={styles.bookingContainer}>
          <Text style={commonStyles.title}>Book a Session</Text>
          <Text style={[commonStyles.textLight, { marginBottom: 24 }]}>
            Schedule a session with {tutor.name}
          </Text>
          
          <View style={styles.bookingInfo}>
            <View style={commonStyles.spaceBetween}>
              <Text style={commonStyles.text}>Hourly Rate</Text>
              <Text style={styles.price}>${tutor.hourlyRate}</Text>
            </View>
            <View style={[commonStyles.spaceBetween, { marginTop: 12 }]}>
              <Text style={commonStyles.text}>Duration</Text>
              <Text style={commonStyles.text}>1 hour</Text>
            </View>
            <View style={[commonStyles.spaceBetween, { marginTop: 12 }]}>
              <Text style={[commonStyles.text, { fontWeight: '600' }]}>Total</Text>
              <Text style={[styles.price, { fontWeight: '700' }]}>${tutor.hourlyRate}</Text>
            </View>
          </View>
          
          <Button
            text="Continue to Booking"
            onPress={() => {
              setShowBookingSheet(false);
              router.push(`/booking/${tutor.id}`);
            }}
            style={[buttonStyles.primary, { marginTop: 24 }]}
            textStyle={{ color: colors.background }}
          />
        </View>
      </SimpleBottomSheet>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  favoriteButton: {
    padding: 8,
    marginRight: -8,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  profileInfo: {
    alignItems: 'center',
    marginTop: 16,
  },
  avatarText: {
    fontSize: 32,
    fontWeight: '600',
    color: colors.primary,
  },
  price: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primary,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.text,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: colors.textMuted,
  },
  subjectsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  subjectChip: {
    backgroundColor: colors.accent,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  subjectText: {
    color: colors.background,
    fontSize: 12,
    fontWeight: '600',
  },
  languagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  languageChip: {
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  languageText: {
    color: colors.text,
    fontSize: 12,
    fontWeight: '500',
  },
  availabilityContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 12,
  },
  dayChip: {
    backgroundColor: colors.success,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  dayText: {
    color: colors.background,
    fontSize: 12,
    fontWeight: '600',
  },
  reviewsPlaceholder: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  bottomActions: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: 12,
  },
  messageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    gap: 8,
  },
  messageButtonText: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: '600',
  },
  bookingContainer: {
    padding: 20,
  },
  bookingInfo: {
    backgroundColor: colors.backgroundAlt,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
});
