export type CreateUserData = {
  email: string;
  password: string;
  username: string;
};

export type UserData = {
  id: string;
  username: string;
  email: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
};
