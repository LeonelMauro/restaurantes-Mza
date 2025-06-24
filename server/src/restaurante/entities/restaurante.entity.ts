import { Menu } from "src/menu/entities/menu.entity";
import { Photo } from "src/photos/entities/photo.entity";
import { Promocion } from "src/promocion/entities/promocion.entity";
import { Reseña } from "src/reseña/entities/reseña.entity";
import { Reserva } from "src/reserva/entities/reverva.entity";
import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Bebida } from "src/bebidas/entities/bebida.entity";
import { Evento } from "src/eventos/entities/evento.entity";


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
  
  @Column()
  contacto: string;

  @OneToOne(() => User, user => user.restaurante,{onDelete: 'CASCADE',})
  @JoinColumn()
  usuario: User;

  @OneToMany(() => Photo, (photo) => photo.restaurante, { cascade: true ,onDelete: 'CASCADE',})
  photos: Photo[];


  @OneToMany(() => Menu, menu => menu.restaurante)
  menu: Menu[];

  @OneToMany(() => Promocion, promo => promo.restaurante)
  promociones: Promocion[];

  @OneToMany(() => Reseña, resena => resena.restaurante)
  resenas: Reseña[];

  @OneToMany(() => Reserva, reserva => reserva.restaurante)
  reservas: Reserva[];

  @OneToMany(() => Bebida, bebida => bebida.restaurante)
  bebidas: Bebida[];

  @OneToMany(() => Evento, evento => evento.restaurante)
  eventos: Evento[];

}
