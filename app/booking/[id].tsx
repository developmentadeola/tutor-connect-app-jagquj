
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { colors, commonStyles, buttonStyles } from '../../styles/commonStyles';
import { mockTutors } from '../../data/mockData';
import Icon from '../../components/Icon';
import Button from '../../components/Button';

export default function BookingScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedDuration, setSelectedDuration] = useState<number>(60);
  
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

  const dates = [
    'Today',
    'Tomorrow',
    'Jan 15',
    'Jan 16',
    'Jan 17',
    'Jan 18',
    'Jan 19',
  ];

  const times = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
  ];

  const durations = [
    { value: 30, label: '30 min' },
    { value: 60, label: '1 hour' },
    { value: 90, label: '1.5 hours' },
    { value: 120, label: '2 hours' },
  ];

  const calculateTotal = () => {
    return (tutor.hourlyRate! * selectedDuration) / 60;
  };

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) {
      Alert.alert('Missing Information', 'Please select both date and time for your session.');
      return;
    }

    console.log('Booking session:', {
      tutorId: tutor.id,
      date: selectedDate,
      time: selectedTime,
      duration: selectedDuration,
      total: calculateTotal(),
    });

    Alert.alert(
      'Booking Confirmed!',
      `Your session with ${tutor.name} has been booked for ${selectedDate} at ${selectedTime}.`,
      [
        {
          text: 'OK',
          onPress: () => router.push('/'),
        },
      ]
    );
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
        <Text style={commonStyles.subtitle}>Book Session</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {/* Tutor Info */}
        <View style={styles.tutorInfo}>
          <View style={commonStyles.avatar}>
            <Text style={styles.avatarText}>
              {tutor.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          <View style={{ marginLeft: 12 }}>
            <Text style={commonStyles.subtitle}>{tutor.name}</Text>
            <Text style={commonStyles.textLight}>${tutor.hourlyRate}/hour</Text>
          </View>
        </View>

        {/* Date Selection */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Select Date</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ marginTop: 12 }}>
            <View style={styles.optionsRow}>
              {dates.map((date) => (
                <TouchableOpacity
                  key={date}
                  style={[
                    styles.dateOption,
                    selectedDate === date && styles.selectedOption
                  ]}
                  onPress={() => setSelectedDate(date)}
                >
                  <Text style={[
                    styles.optionText,
                    selectedDate === date && styles.selectedOptionText
                  ]}>
                    {date}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Time Selection */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Select Time</Text>
          <View style={styles.timeGrid}>
            {times.map((time) => (
              <TouchableOpacity
                key={time}
                style={[
                  styles.timeOption,
                  selectedTime === time && styles.selectedOption
                ]}
                onPress={() => setSelectedTime(time)}
              >
                <Text style={[
                  styles.optionText,
                  selectedTime === time && styles.selectedOptionText
                ]}>
                  {time}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Duration Selection */}
        <View style={commonStyles.section}>
          <Text style={commonStyles.subtitle}>Session Duration</Text>
          <View style={styles.durationGrid}>
            {durations.map((duration) => (
              <TouchableOpacity
                key={duration.value}
                style={[
                  styles.durationOption,
                  selectedDuration === duration.value && styles.selectedOption
                ]}
                onPress={() => setSelectedDuration(duration.value)}
              >
                <Text style={[
                  styles.optionText,
                  selectedDuration === duration.value && styles.selectedOptionText
                ]}>
                  {duration.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Booking Summary */}
        <View style={styles.summaryCard}>
          <Text style={commonStyles.subtitle}>Booking Summary</Text>
          
          <View style={styles.summaryRow}>
            <Text style={commonStyles.text}>Tutor</Text>
            <Text style={commonStyles.text}>{tutor.name}</Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={commonStyles.text}>Date & Time</Text>
            <Text style={commonStyles.text}>
              {selectedDate && selectedTime ? `${selectedDate}, ${selectedTime}` : 'Not selected'}
            </Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={commonStyles.text}>Duration</Text>
            <Text style={commonStyles.text}>
              {durations.find(d => d.value === selectedDuration)?.label}
            </Text>
          </View>
          
          <View style={styles.summaryRow}>
            <Text style={commonStyles.text}>Rate</Text>
            <Text style={commonStyles.text}>${tutor.hourlyRate}/hour</Text>
          </View>
          
          <View style={[styles.summaryRow, styles.totalRow]}>
            <Text style={[commonStyles.text, { fontWeight: '700' }]}>Total</Text>
            <Text style={[commonStyles.text, { fontWeight: '700', color: colors.primary }]}>
              ${calculateTotal().toFixed(2)}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* Bottom Action */}
      <View style={styles.bottomAction}>
        <Button
          text={`Book Session - $${calculateTotal().toFixed(2)}`}
          onPress={handleBooking}
          style={buttonStyles.primary}
          textStyle={{ color: colors.background }}
        />
      </View>
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
  tutorInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.primary,
  },
  optionsRow: {
    flexDirection: 'row',
    gap: 12,
  },
  dateOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    minWidth: 80,
    alignItems: 'center',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  timeOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    minWidth: 80,
    alignItems: 'center',
  },
  durationGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 12,
  },
  durationOption: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.background,
    minWidth: 80,
    alignItems: 'center',
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
  summaryCard: {
    backgroundColor: colors.card,
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  totalRow: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    marginTop: 8,
    paddingTop: 16,
  },
  bottomAction: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
