import { Restaurante } from "src/restaurante/entities/restaurante.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Reserva {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.reservas)
  usuario: User;

  @ManyToOne(() => Restaurante, restaurante => restaurante.reservas)
  restaurante: Restaurante;

  @Column()
  fecha: Date;

  @Column()
  cantidadPersonas: number;

  @Column({ default: 'pendiente' }) // o confirmado
  estado: string;
}
