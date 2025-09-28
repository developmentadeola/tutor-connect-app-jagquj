
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  type: 'student' | 'tutor';
  bio?: string;
  subjects?: string[];
  hourlyRate?: number;
  rating?: number;
  totalSessions?: number;
  availability?: string[];
  location?: string;
  experience?: string;
  education?: string;
  languages?: string[];
  verified?: boolean;
}

export interface TutorSession {
  id: string;
  tutorId: string;
  studentId: string;
  subject: string;
  duration: number; // in minutes
  hourlyRate: number;
  totalAmount: number;
  scheduledDate: Date;
  status: 'pending' | 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  rating?: number;
  review?: string;
}

export interface Subject {
  id: string;
  name: string;
  category: string;
  icon?: string;
}

export interface SearchFilters {
  subject?: string;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  availability?: string;
  location?: string;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  content: string;
  timestamp: Date;
  read: boolean;
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage?: Message;
  updatedAt: Date;
}
