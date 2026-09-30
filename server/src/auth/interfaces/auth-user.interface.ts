export interface AuthUser {
  sub: number;
  email: string;
  tipo: 'turista' | 'restaurante';
}