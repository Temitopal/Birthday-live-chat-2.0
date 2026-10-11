export interface RegistrationData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  referralSource: string;
  interestReason?: string;
  attendanceMode?: string;
  agreeToUpdates: boolean;
  registeredAt: string;
  seatNumber?: string;
  accessPassCode: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'logistics' | 'materials';
}
