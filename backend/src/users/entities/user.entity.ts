import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  nombre: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'Panamá Centro' })
  localidad: string;

  @Column({ unique: true, nullable: true })
  codigoReferido: string;

  @Column({ nullable: true })
  referidoPor: string;

  @Column({ default: 'Silver' })
  nivel: string;

  @Column('decimal', { precision: 10, scale: 2, default: 0 })
  recompensas: number;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  fechaRegistro: Date;
}
