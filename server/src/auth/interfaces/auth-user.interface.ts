export interface AuthUser {
  sub: number;
  email: string;
  role: 'turista' | 'restaurante' | 'admin';
}