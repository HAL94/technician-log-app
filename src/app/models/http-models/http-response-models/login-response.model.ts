export interface LoginResponse {
  message: string;
  token: string;
  expiresIn: number;
  userId: string;
  email: string;
  fname: string;
  lname: string;
  badgeNumber: string;
  birthDate?: Date;
}
