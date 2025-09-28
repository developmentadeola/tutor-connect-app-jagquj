
import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { colors, commonStyles } from '../styles/commonStyles';
import { subjects } from '../data/mockData';
import SubjectCard from '../components/SubjectCard';
import Icon from '../components/Icon';

export default function SubjectsScreen() {
  const categories = [...new Set(subjects.map(s => s.category))];

  const handleBack = () => {
    router.back();
  };

  const handleSubjectPress = (subject: string) => {
    console.log('Subject pressed:', subject);
    router.push({
      pathname: '/search',
      params: { subject }
    });
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        <Text style={commonStyles.subtitle}>All Subjects</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={commonStyles.content} showsVerticalScrollIndicator={false}>
        {categories.map((category) => (
          <View key={category} style={commonStyles.section}>
            <Text style={commonStyles.subtitle}>{category}</Text>
            
            <View style={styles.subjectsGrid}>
              {subjects
                .filter(subject => subject.category === category)
                .map((subject) => (
                  <View key={subject.id} style={styles.subjectItem}>
                    <SubjectCard
                      subject={subject}
                      onPress={() => handleSubjectPress(subject.name)}
                    />
                  </View>
                ))}
            </View>
          </View>
        ))}
      </ScrollView>
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
  subjectsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 16,
  },
  subjectItem: {
    width: '48%',
  },
});
