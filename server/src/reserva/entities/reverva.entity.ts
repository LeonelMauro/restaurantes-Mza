import { Evento } from "src/eventos/entities/evento.entity";
import { Restaurante } from "src/restaurante/entities/restaurante.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

export enum EstadoReserva {
  Pendiente = 'pendiente',
  Confirmada = 'confirmada',
  Asistido = 'asistido',
  Cancelada = 'cancelada',
  NoAsistio = 'no-asistio',
  Finalizada = 'Finalizada',
}
@Entity()
export class Reserva {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.reservas)
  usuario: User;

  @ManyToOne(() => Restaurante, restaurante => restaurante.reservas)
  restaurante: Restaurante;

  @ManyToOne(()=>Evento , evento => evento.reservas)
  evento: Evento;

  @Column({ type: 'timestamp' })
  fecha: Date;

  @Column()
  cantidadPersonas: number;

  @Column({
    type: 'enum',
    enum: EstadoReserva,
    default: EstadoReserva.Pendiente,
  })
  estado: EstadoReserva;
}
