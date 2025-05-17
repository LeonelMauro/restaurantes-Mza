import { Restaurante } from "src/restaurante/entities/restaurante.entity";
import { User } from "src/user/entities/user.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Reseña {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.resenas)
  usuario: User;

  @ManyToOne(() => Restaurante, restaurante => restaurante.resenas)
  restaurante: Restaurante;

  @Column()
  puntuacion: number;

  @Column()
  comentario: string;

  @CreateDateColumn()
  fecha: Date;
}
