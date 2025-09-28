
import React from 'react';
import { View, TextInput, TouchableOpacity } from 'react-native';
import { colors, commonStyles } from '../styles/commonStyles';
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
  return (
    <View style={commonStyles.searchBar}>
      <Icon name="search" size={20} color={colors.textMuted} />
      <TextInput
        style={{
          flex: 1,
          marginLeft: 12,
          fontSize: 16,
          color: colors.text,
        }}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
      />
      <TouchableOpacity onPress={onFilterPress}>
        <Icon name="options" size={20} color={colors.primary} />
      </TouchableOpacity>
    </View>
  );
}
