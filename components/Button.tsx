
import React from 'react';
import { Text, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, ActivityIndicator } from 'react-native';
import { colors, buttonStyles, spacing, borderRadius } from '../styles/commonStyles';

interface ButtonProps {
  text: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  style?: ViewStyle | ViewStyle[];
  textStyle?: TextStyle;
  icon?: React.ReactNode;
}

export default function Button({ 
  text, 
  onPress, 
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  style, 
  textStyle,
  icon
}: ButtonProps) {
  
  const getButtonStyle = () => {
    let baseStyle = buttonStyles.primary;
    
    switch (variant) {
      case 'secondary':
        baseStyle = buttonStyles.secondary;
        break;
      case 'outline':
        baseStyle = buttonStyles.outline;
        break;
      case 'ghost':
        baseStyle = buttonStyles.ghost;
        break;
      default:
        baseStyle = buttonStyles.primary;
    }
    
    const sizeStyle = size === 'small' ? buttonStyles.small : 
                     size === 'large' ? buttonStyles.large : {};
    
    return [baseStyle, sizeStyle];
  };
  
  const getTextStyle = () => {
    const baseTextStyle = {
      fontSize: size === 'small' ? 14 : size === 'large' ? 18 : 16,
      fontWeight: '600' as const,
    };
    
    let colorStyle = { color: colors.background };
    
    switch (variant) {
      case 'secondary':
        colorStyle = { color: colors.text };
        break;
      case 'outline':
        colorStyle = { color: colors.primary };
        break;
      case 'ghost':
        colorStyle = { color: colors.primary };
        break;
    }
    
    if (disabled) {
      colorStyle = { color: colors.textMuted };
    }
    
    return [baseTextStyle, colorStyle];
  };
  
  const buttonOpacity = disabled ? 0.5 : 1;
  const activeOpacity = disabled ? 1 : 0.7;
  
  return (
    <TouchableOpacity 
      style={[
        getButtonStyle(),
        { opacity: buttonOpacity },
        disabled && styles.disabled,
        style
      ]} 
      onPress={disabled || loading ? undefined : onPress}
      activeOpacity={activeOpacity}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' ? colors.background : colors.primary} 
        />
      ) : (
        <>
          {icon && <>{icon}</>}
          <Text style={[getTextStyle(), textStyle, icon && { marginLeft: spacing.sm }]}>
            {text}
          </Text>
        </>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  disabled: {
    backgroundColor: colors.backgroundSoft,
    borderColor: colors.border,
  },
});
