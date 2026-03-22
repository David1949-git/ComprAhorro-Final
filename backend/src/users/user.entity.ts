import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('usuarios')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ default: 'Bronce' })
  nivel: string;

  @Column({ default: 0 })
  referidos_activos: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, default: 0 })
  saldo_bonos: number;

  @Column({ nullable: true })
  codigo_referido_padre: string;

  @CreateDateColumn()
  fecha_registro: Date;
}
