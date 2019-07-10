export interface User {
  id: string;
  email?: string;
  fname?: string;
  lname?: string;
  badgeNumber?: string;
  birthDate?: string;
  address: string;
  city: string;
  country: string;
  postalCode: string;
  aboutUser: string;
  profileImage: string;
  createdAt: Date;
}

