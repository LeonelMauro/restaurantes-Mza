import { Bebida } from "src/bebidas/entities/bebida.entity";
import { Restaurante } from "src/restaurante/entities/restaurante.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class CategoryBebida {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @OneToMany(()=>Bebida, bebidas => bebidas.categoryBebidas)
    bebidas: Bebida[];

    @ManyToOne(()=> Restaurante, restaurante => restaurante.categoryBebidas)
    restaurante: Restaurante


}
