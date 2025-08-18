// Enum for role names
export enum RoleName {
  ADMIN = 'admin',
  STUDENT = 'student',
}

// Role types and interfaces
export interface IRole {
  id: string;
  name: RoleName;
  description?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date
}

// Role creation interface (for seeds/creation)
export interface IRoleCreation {
  name: RoleName;
  description?: string;
  isActive?: boolean;
}

export interface IRoleUpdate {
  name?: RoleName;
  description?: string;
  isActive?: boolean;
}