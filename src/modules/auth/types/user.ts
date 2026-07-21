export interface User {
  id: number;
  full_name: string;
  email: string;
  status: string;
  roles: Role[];
}

export interface Role {
  id: number;
  name: string;
}
