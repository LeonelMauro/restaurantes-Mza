import { Menu } from "src/menu/entities/menu.entity";
import { Promocion } from "src/promocion/entities/promocion.entity";
import { Reseña } from "src/reseña/entities/reseña.entity";
import { Reserva } from "src/reverva/entities/reverva.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Restaurante {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column()
  direccion: string;

  @Column()
  horario: string;

  @OneToOne(() => User, user => user.restaurante)
  @JoinColumn()
  usuario: User;

  @OneToMany(() => Menu, menu => menu.restaurante)
  menu: Menu[];

  @OneToMany(() => Promocion, promo => promo.restaurante)
  promociones: Promocion[];

  @OneToMany(() => Reseña, resena => resena.restaurante)
  resenas: Reseña[];

  @OneToMany(() => Reserva, reserva => reserva.restaurante)
  reservas: Reserva[];
}
