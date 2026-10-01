import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Role{
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  nombre: string

  @OneToMany(() => User, user => user.role)
  usuarios: User[];
}