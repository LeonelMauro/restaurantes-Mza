import { Restaurante } from "src/restaurante/entities/restaurante.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Menu {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column('decimal')
  precio: number;

  @ManyToOne(() => Restaurante, restaurante => restaurante.menu)
  restaurante: Restaurante;
}
