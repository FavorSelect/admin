export interface Banner {
  id: number;
  title: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

export interface AddBannerResponse {
  success: boolean;
  message: string;
  banner: Banner;
}
