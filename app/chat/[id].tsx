
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { colors, commonStyles } from '../styles/commonStyles';
import { mockTutors } from '../data/mockData';
import Icon from '../components/Icon';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'me' | 'tutor';
  timestamp: Date;
}

export default function ChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: '1',
      text: 'Hi! I&apos;m interested in booking a session with you.',
      sender: 'me',
      timestamp: new Date(Date.now() - 3600000),
    },
    {
      id: '2',
      text: 'Hello! I&apos;d be happy to help you. What subject are you looking to work on?',
      sender: 'tutor',
      timestamp: new Date(Date.now() - 3500000),
    },
    {
      id: '3',
      text: 'I need help with calculus, specifically derivatives and integrals.',
      sender: 'me',
      timestamp: new Date(Date.now() - 3400000),
    },
    {
      id: '4',
      text: 'Perfect! I specialize in calculus. We can start with the fundamentals and work our way up. When would you like to schedule our first session?',
      sender: 'tutor',
      timestamp: new Date(Date.now() - 3300000),
    },
  ]);
  
  const tutor = mockTutors.find(t => t.id === id);

  if (!tutor) {
    return (
      <SafeAreaView style={commonStyles.centerContent}>
        <Text style={commonStyles.title}>Chat not found</Text>
      </SafeAreaView>
    );
  }

  const handleBack = () => {
    router.back();
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        text: message.trim(),
        sender: 'me',
        timestamp: new Date(),
      };
      
      setMessages([...messages, newMessage]);
      setMessage('');
      
      console.log('Message sent:', newMessage);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <SafeAreaView style={commonStyles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Icon name="arrow-back" size={24} color={colors.text} />
        </TouchableOpacity>
        
        <View style={styles.headerInfo}>
          <View style={styles.headerAvatar}>
            <Text style={styles.headerAvatarText}>
              {tutor.name.split(' ').map(n => n[0]).join('')}
            </Text>
          </View>
          <View>
            <Text style={styles.headerName}>{tutor.name}</Text>
            <Text style={styles.headerStatus}>Online</Text>
          </View>
        </View>
        
        <TouchableOpacity style={styles.callButton}>
          <Icon name="videocam-outline" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {/* Messages */}
      <ScrollView style={styles.messagesContainer} showsVerticalScrollIndicator={false}>
        {messages.map((msg) => (
          <View
            key={msg.id}
            style={[
              styles.messageWrapper,
              msg.sender === 'me' ? styles.myMessageWrapper : styles.tutorMessageWrapper
            ]}
          >
            <View
              style={[
                styles.messageBubble,
                msg.sender === 'me' ? styles.myMessage : styles.tutorMessage
              ]}
            >
              <Text
                style={[
                  styles.messageText,
                  msg.sender === 'me' ? styles.myMessageText : styles.tutorMessageText
                ]}
              >
                {msg.text}
              </Text>
            </View>
            <Text style={styles.messageTime}>
              {formatTime(msg.timestamp)}
            </Text>
          </View>
        ))}
      </ScrollView>

      {/* Input */}
      <View style={styles.inputContainer}>
        <View style={styles.inputWrapper}>
          <TextInput
            style={styles.textInput}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message..."
            placeholderTextColor={colors.textMuted}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[
              styles.sendButton,
              message.trim() ? styles.sendButtonActive : styles.sendButtonInactive
            ]}
            onPress={handleSendMessage}
            disabled={!message.trim()}
          >
            <Icon
              name="send"
              size={20}
              color={message.trim() ? colors.background : colors.textMuted}
            />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    backgroundColor: colors.background,
  },
  backButton: {
    padding: 8,
    marginLeft: -8,
  },
  headerInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 12,
  },
  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.backgroundAlt,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  headerAvatarText: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.primary,
  },
  headerName: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
  },
  headerStatus: {
    fontSize: 12,
    color: colors.success,
  },
  callButton: {
    padding: 8,
    marginRight: -8,
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  messageWrapper: {
    marginBottom: 16,
  },
  myMessageWrapper: {
    alignItems: 'flex-end',
  },
  tutorMessageWrapper: {
    alignItems: 'flex-start',
  },
  messageBubble: {
    maxWidth: '80%',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
  },
  myMessage: {
    backgroundColor: colors.primary,
    borderBottomRightRadius: 4,
  },
  tutorMessage: {
    backgroundColor: colors.backgroundAlt,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: colors.border,
  },
  messageText: {
    fontSize: 16,
    lineHeight: 22,
  },
  myMessageText: {
    color: colors.background,
  },
  tutorMessageText: {
    color: colors.text,
  },
  messageTime: {
    fontSize: 12,
    color: colors.textMuted,
    marginTop: 4,
  },
  inputContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    backgroundColor: colors.background,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    backgroundColor: colors.backgroundAlt,
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: colors.border,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: colors.text,
    maxHeight: 100,
    paddingVertical: 8,
  },
  sendButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  sendButtonActive: {
    backgroundColor: colors.primary,
  },
  sendButtonInactive: {
    backgroundColor: colors.border,
  },
});
