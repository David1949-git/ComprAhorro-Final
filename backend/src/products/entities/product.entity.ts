import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string; // Antes decía 'name'

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precio: number; // Antes decía 'price'

  @Column()
  establecimiento: string; // Antes decía 'store'

  @Column({ nullable: true })
  imagen_real: string;

  @Column({ nullable: true })
  link_vendedor: string;

  @Column({ nullable: true })
  detalles: string;
}