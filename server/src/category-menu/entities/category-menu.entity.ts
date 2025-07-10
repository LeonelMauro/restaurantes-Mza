import { Menu } from "src/menu/entities/menu.entity";
import { Restaurante } from "src/restaurante/entities/restaurante.entity";
import {  Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
@Entity()
export class CategoryMenu {
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    nombre:string;

    @OneToMany(() => Menu , menu => menu.categoryMenu)
    menus: Menu [] ;

    @ManyToOne(() => Restaurante, restaurante => restaurante.categoriasMenu, { onDelete: 'CASCADE' })
    restaurante: Restaurante;

}
