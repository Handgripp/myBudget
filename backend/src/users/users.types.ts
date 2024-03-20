import { UserRole } from 'src/shared/entities/role/role.enum';

export type CreateUserData = {
  email: string;
  password: string;
  username: string;
  role: UserRole;
};

export type UserData = {
  id: string;
  username: string;
  email: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
  role: UserRole;
};
