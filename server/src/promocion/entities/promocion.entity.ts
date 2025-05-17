import { Restaurante } from "src/restaurante/entities/restaurante.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Promocion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titulo: string;

  @Column()
  descripcion: string;

  @Column()
  fechaInicio: Date;

  @Column()
  fechaFin: Date;

  @ManyToOne(() => Restaurante, restaurante => restaurante.promociones)
  restaurante: Restaurante;
}
