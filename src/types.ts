export type OperationType = 'provincial' | 'federal' | 'crossBorder';

export interface CompanyInfo {
  businessName: string;
  contactName: string;
  email: string;
  phone: string;
  fax?: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  postalCode: string;
  country: string;
}

export interface HUTAccount {
  state: string;
  accountNumber: string;
}

export interface OnboardingData {
  companyInfo: CompanyInfo;
  operationType: OperationType | null;
  documents: File[];
  hutAccounts: {
    hasAccounts: boolean;
    accounts: HUTAccount[];
  };
}