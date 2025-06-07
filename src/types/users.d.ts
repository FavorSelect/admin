export interface User {
  id: number;
  firstName: string;
  lastName: string | null;
  name: string;
  email: string;
  authProvider: string;
  status: string;
  createdAt: string;
}

export interface UserResponse {
  message: string;
  count: number;
  users: User[];
}
