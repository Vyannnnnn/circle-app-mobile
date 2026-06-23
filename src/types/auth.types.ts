export interface LoginRequest {
  email: string;
  password: string;
}

export interface UserData {
  id: number;
  username: string;
  email: string;
  full_Name: string;
  photo_profile: string;
  bio: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data: UserData;
  token: string;
}
