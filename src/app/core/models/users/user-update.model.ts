export interface UserUpdateDTO {
  emailAddress: string;
  firstName: string;
  lastName: string;
  password?: string;
  role?: 'USER' | 'ADMIN'; 
}
