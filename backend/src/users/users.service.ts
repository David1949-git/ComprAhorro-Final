import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  // Este es el método que el Controller está pidiendo a gritos
  async crearUsuario(datos: any) {
    console.log('--- GUARDANDO EN NEON: ' + datos.email + ' ---');
    const nuevoUsuario = this.usersRepository.create({
      ...datos,
      nivel: 'Bronce',
      referidos_activos: 0,
      saldo_bonos: 5.00 // Tu pilar de transparencia: bono de bienvenida
    });
    return await this.usersRepository.save(nuevoUsuario);
  }

  // Lógica de niveles para el futuro cercano
  calcularNivel(numeroReferidos: number) {
    if (numeroReferidos >= 50) return 'Diamante';
    if (numeroReferidos >= 15) return 'Oro';
    if (numeroReferidos >= 5) return 'Plata';
    return 'Bronce';
  }
}
