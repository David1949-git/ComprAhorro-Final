import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  // Esta es la función que te estaba pidiendo el error
  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  // Tu motor de búsqueda inteligente
  async search(query: string): Promise<Product[]> {
    return this.productRepository.find({
      where: [
        { nombre: Like(`%${query}%`) },
        { establecimiento: Like(`%${query}%`) }
      ]
    });
  }
}