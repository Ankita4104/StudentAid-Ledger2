
export enum UrgencyLevel {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export enum RequestCategory {
  FEES = 'Tuition Fees',
  MEDICAL = 'Medical Expenses',
  HOUSING = 'Housing & Rent',
  BOOKS = 'Books & Supplies',
  OTHER = 'Other'
}

export type UserRole = 'STUDENT' | 'ADMIN';
export type VerificationStatus = 'NONE' | 'PENDING' | 'VERIFIED' | 'REJECTED';

export interface Student {
  id: string;
  name: string;
  email: string;
  university: string;
  studentId: string;
  passcode: string;
  verificationStatus: VerificationStatus;
  idCardImage?: string;
  avatar: string;
  role: UserRole;
}

export interface FinancialRequest {
  id: string;
  studentId: string;
  studentName: string; 
  studentUniversity?: string;
  studentEmail?: string;
  studentIdCardNumber?: string;
  title: string;
  category: RequestCategory;
  description: string;
  requestedAmount: number;
  raisedAmount: number;
  urgency: UrgencyLevel;
  imageUrl?: string;
  deadline?: string;
  isAnonymous: boolean;
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'COMPLETED';
  createdAt: string;
}

export interface Donation {
  id: string;
  requestId: string;
  donorId: string;
  donorName: string;
  amount: number;
  timestamp: string;
}

export interface AppState {
  currentUser: Student | null;
  requests: FinancialRequest[];
  donations: Donation[];
}
