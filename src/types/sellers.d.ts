export interface Seller {
  id: number;
  sellerName: string;
  email: string;
  contactNumber: string;
  status: string;
  shopName: string;
  shopDescription: string;
  shopLogo: string;
  businessType: string;
  businessRegistrationNumber: string;
  businessAddress: string;
  city: string;
  state: string;
  countryName: string;
  zipCode: string;
  taxIdentificationNumber: string;
  taxDocument: string;
  identityProof: string | null;
  businessLicenseDocument: string;
  websiteURL: string | null;
  isVerified: boolean;
  isApproved: boolean;
  password: string;
  createdAt: string;
  updatedAt: string;
  membershipId: number | null;
  membershipStart: string | null;
  membershipEnd: string | null;
  verificationCode: string | null;
  verificationCodeExpiresAt: string | null;
  userId: number;
}

export interface SellersResponse {
  message: string;
  count: number;
  sellers: Seller[];
}
export interface SellersResponseById {
  message: string;
  seller: Seller[];
}

export interface PendingSellersResponse {
  success: boolean;
  pendingSellers: Seller[];
}

export interface PendingSellersResponseById {
  success: boolean;
  seller: Seller[];
}
