import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Restaurante } from 'src/restaurante/entities/restaurante.entity';

@Entity()
export class Departamento {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nombre: string;

  @Column({ nullable: true })
  descripcion: string;

  @Column({ nullable: true })
  imagenUrl: string; // 👈 Solo una imagen por departamento

  @OneToMany(() => Restaurante, restaurante => restaurante.departamento)
  restaurantes: Restaurante[];

}
