import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ default: 'Usuario' })
  nombre: string;
  @Column({ default: 0 })
  xp: number;
  @Column({ default: 'SILVER' })
  nivel: string;
}
