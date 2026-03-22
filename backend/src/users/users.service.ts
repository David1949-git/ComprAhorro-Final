import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(userData: Partial<User>) {
    const nuevoCodigo = Math.random().toString(36).substring(2, 8).toUpperCase();
    const user = this.usersRepository.create({
      ...userData,
      codigoReferido: nuevoCodigo,
    });
    return this.usersRepository.save(user);
  }

  async registrarCompra(userId: number, montoBase: number) {
    const comisionEnlace = montoBase * 0.10;
    return { itbm: montoBase * 0.07, servicioEnlace: comisionEnlace };
  }
}
