import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  nombre: string;
  @Column('decimal', { precision: 10, scale: 2 })
  precio: number;
  @Column({ nullable: true })
  supermercado: string;
}
