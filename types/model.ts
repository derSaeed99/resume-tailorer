import {
  PaymentMethod,
  PaymentStatus,
  SubscriptionPlan,
  SubscriptionStatus,
  UserRole,
} from "./enum";

// Theme-related types
export type Theme = "light" | "dark";
export type ThemeColors = {
  primary: string;
  secondary: string;
  background: string;
  surface: string;
  border: string;
  text: string;
  success: string;
  warning: string;
  error: string;
  info: string;
};

export interface NavbarProps {
  logo: {
    src: string;
    alt: string;
  };
  items: NavItem[];
  className?: string;
}

export interface NavItem {
  href: string;
  label: string;
  icon?: React.ReactNode;
}

export interface ApiResponse<T> {
  data: T;
  error?: string;
  status: number;
}

export interface ParsedResumeSpec {
  personalInfo: any;
  workExperience: any[];
  education: any[];
  skills: string[];
}

export interface TailoredResumeSpec {
  parsedResume: ParsedResumeSpec;
  jobDescription: string;
}

export type Optional<T, K extends keyof T> = Pick<Partial<T>, K> & Omit<T, K>;

export interface UserId {
  userId: string;
}

export interface User extends UserId {
  email: string;
  firstName: string;
  lastName: string;
  displayName: string;
  avatarUrl?: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  preferences?: UserPreferences;
  metadata?: UserMetadata;
}

export interface UserPreferences {
  theme: Theme;
  notifications: {
    email: boolean;
    push: boolean;
  };
  language: string;
}

export interface UserMetadata {
  bio?: string;
  location?: string;
  website?: string;
  socialMedia?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export interface AuthUser extends User {
  accessToken: string;
  refreshToken: string;
}

export interface SubscriptionId {
  subscribtionId: string;
}

export interface Subscription extends SubscriptionId {
  plan: SubscriptionPlan;
  status: SubscriptionStatus;
  startDate: Date;
  endDate?: Date;
  renewalDate?: Date;
  paymentMethod: PaymentMethod;
}

export interface SubscribedUser extends User {
  subscription: Subscription;
  billingInfo?: {
    address: string;
    city: string;
    country: string;
  };
  paymentHistory?: Array<{
    date: Date;
    amount: number;
    currency: string;
    status: PaymentStatus;
  }>;
}

export interface UserResumeId {
  userResumeId: string;
}

export interface UserResume extends UserResumeId {
  personalInfo: any;
  workExperience: any[];
  education: any[];
  skills: string[];
}
