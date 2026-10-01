import { Reseña } from "src/reseña/entities/reseña.entity";
import { Restaurante } from "src/restaurante/entities/restaurante.entity";
import { Reserva } from "src/reserva/entities/reverva.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "src/role/entities/role.entity";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  provincia: string;

  @Column({ nullable: true })
  nacionalidad: string;


  @Column({ type: 'enum', enum: ['turista', 'restaurante'] })
  tipo: 'turista' | 'restaurante';

  @OneToMany(() => Reserva, reserva => reserva.usuario)
  reservas: Reserva[];

  @OneToMany(() => Reseña, resena => resena.usuario)
  resenas: Reseña[];

  @OneToOne(() => Restaurante, restaurante => restaurante.usuario ,{
  cascade: true,
  onDelete: 'CASCADE',
 })
  restaurante: Restaurante;

  @ManyToOne(() => Role, role => role.usuarios)
  @JoinColumn({ name: 'role_id' })
  role: Role;
}
