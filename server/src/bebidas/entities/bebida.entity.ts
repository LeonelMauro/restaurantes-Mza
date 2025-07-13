import { CategoryBebida } from "src/category-bebidas/entities/category-bebida.entity";
import { Restaurante } from "src/restaurante/entities/restaurante.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Bebida {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @Column()
  descripcion: string;

  @Column('decimal')
  precio: number;

  @ManyToOne(() => Restaurante, restaurante => restaurante.bebidas)
  restaurante: Restaurante;

  @ManyToOne(()=> CategoryBebida,categoryBebidas => categoryBebidas.bebidas,{ onDelete: 'CASCADE' })
  categoryBebidas: CategoryBebida
}
