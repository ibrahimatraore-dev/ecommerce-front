// src/app/core/models/users/user.model.ts

export interface UserDTO {
  id: number;
  emailAddress: string;
  firstName: string;
  lastName: string;
  role: 'USER' | 'ADMIN'; // adapte selon les rôles disponibles
}
