import { Reserva } from "src/reserva/entities/reverva.entity";
import { Restaurante } from "src/restaurante/entities/restaurante.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Evento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column({ type: 'timestamp' })
  fecha: Date;

  
  @Column()
  imagenUrl:string;

  @ManyToOne(() => Restaurante, restaurante => restaurante.eventos)
  restaurante: Restaurante;

  @OneToMany(()=> Reserva ,reservas => reservas.evento)
  reservas: Reserva[];
}
