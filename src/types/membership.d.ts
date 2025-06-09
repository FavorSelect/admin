export interface Membership {
  id: number;
  planName: string;
  durationInDays: string;
  price: number;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface MembershipResponse {
  success: boolean;
  memberships: Membership[];
}
export interface MembershipResponseById {
  success: boolean;
  membership: Membership;
}

export interface MembershipUpdateResponse {
  success: boolean;
  message: string;
  membership: Membership;
}

export interface DeleteMembershipResponse {
  success: boolean;
  message: string;
}
