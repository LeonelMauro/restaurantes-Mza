import { Restaurante } from "src/restaurante/entities/restaurante.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Evento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column()
  fecha: Date;

  @Column()
  hora: string;

  @ManyToOne(() => Restaurante, restaurante => restaurante.eventos)
  restaurante: Restaurante;
}
