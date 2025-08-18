// Country types and interfaces
export interface ICountry {
  id: string;
  name: string;
  code: string;
  code3?: string;
  language?: string;
  numericCode?: string;
  phoneCode?: string;
  flag?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

// Country creation interface (for seeds/creation)
export interface ICountryCreation {
  name: string;
  code: string;
  code3?: string;
  language?: string;
  numericCode?: string;
  phoneCode?: string;
  flag?: string;
  isActive?: boolean;
}

export interface ICountryUpdate {
  name?: string;
  code?: string;
  code3?: string;
  language?: string;
  numericCode?: string;
  phoneCode?: string;
  flag?: string;
  isActive?: boolean;
}
