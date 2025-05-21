import { Restaurante } from "src/restaurante/entities/restaurante.entity";
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";

@Entity()
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  url: string;

  @ManyToOne(() => Restaurante, restaurante => restaurante.photos)
  restaurante: Restaurante;
}
