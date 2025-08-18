// User types and interfaces
export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  birthDate?: Date;
  avatar?: string;
  roleId: string;
  countryId?: string;
  stateId?: string;
  cityId?: string;
  emailVerified: boolean;
  emailVerifiedAt?: Date;
  lastLoginAt?: Date;
  preferences?: Record<string, any>;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

// User creation interface (for registration/admin creation)
export interface IUserCreation {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  birthDate?: Date;
  avatar?: string;
  roleId: string;
  countryId?: string;
  stateId?: string;
  cityId?: string;
  emailVerified?: boolean;
  preferences?: Record<string, any>;
  isActive?: boolean;
}

// User update interface (for profile updates)
export interface IUserUpdate {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
  phone?: string;
  birthDate?: Date;
  avatar?: string;
  roleId?: string;
  countryId?: string;
  stateId?: string;
  cityId?: string;
  emailVerified?: boolean;
  emailVerifiedAt?: Date;
  lastLoginAt?: Date;
  preferences?: Record<string, any>;
  isActive?: boolean;
}

// User public profile (without sensitive data)
export interface IUserPublic {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  avatar?: string;
  emailVerified: boolean;
  lastLoginAt?: Date;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// User login credentials
export interface IUserLogin {
  email: string;
  password: string;
}

// User registration data
export interface IUserRegister {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
  birthDate?: Date;
  countryId?: string;
  stateId?: string;
  cityId?: string;
}
