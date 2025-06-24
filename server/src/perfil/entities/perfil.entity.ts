import { User } from "src/user/entities/user.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Perfil {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  foto: string;

  @Column({ nullable: true })
  telefono: string;

  @Column({ nullable: true })
  nacionalidad: string;

  @Column({ nullable: true })
  provincia: string;

  @Column({ type: 'date', nullable: true })
  fechaNacimiento: Date;

  @OneToOne(() => User, { onDelete: 'CASCADE' })
  @JoinColumn()
  usuario: User;
}
