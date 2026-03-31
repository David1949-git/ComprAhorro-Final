import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('ahorros')
export class Ahorro {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  producto: string;

  @Column('decimal', { precision: 10, scale: 2 })
  monto: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fecha: Date;
}
