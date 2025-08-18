// State types and interfaces
export interface IState {
  id: string;
  name: string;
  code: string;
  countryId: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

// State creation interface (for seeds/creation)
export interface IStateCreation {
  name: string;
  code: string;
  countryId: string;
  isActive?: boolean;
}

export interface IStateUpdate {
  name?: string;
  code?: string;
  countryId?: string;
  isActive?: boolean;
}
