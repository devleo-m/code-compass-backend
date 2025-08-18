// City types and interfaces
export interface ICity {
  id: string;
  name: string;
  stateId: string;
  countryId: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
  population?: number;
  isCapital: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

// City creation interface (for seeds/creation)
export interface ICityCreation {
  name: string;
  stateId: string;
  countryId: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
  population?: number;
  isCapital?: boolean;
  isActive?: boolean;
}

export interface ICityUpdate {
  name?: string;
  stateId?: string;
  countryId?: string;
  zipCode?: string;
  latitude?: number;
  longitude?: number;
  population?: number;
  isCapital?: boolean;
  isActive?: boolean;
}
