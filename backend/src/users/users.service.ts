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

  async crearUsuario(datos: any) {
    console.log('--- PROCESANDO REGISTRO: ' + datos.email + ' ---');

    // 1. ¿Viene con un referido? Buscamos al "padre" por su email
    if (datos.codigo_referido_padre) {
      const padre = await this.usersRepository.findOne({ 
        where: { email: datos.codigo_referido_padre } 
      });

      if (padre) {
        console.log('--- PADRE ENCONTRADO: ' + padre.email + ' (Sumando...) ---');
        // Sumamos el referido
        padre.referidos_activos += 1;
        // Le damos un pequeño bono al padre (ejemplo: $1.00 por invitar)
        padre.saldo_bonos = Number(padre.saldo_bonos) + 1.00; 
        // Actualizamos su nivel automáticamente
        padre.nivel = this.calcularNivel(padre.referidos_activos);
        
        await this.usersRepository.save(padre);
      }
    }

    // 2. Creamos al nuevo usuario con su bono de bienvenida
    const nuevoUsuario = this.usersRepository.create({
      ...datos,
      nivel: 'Bronce',
      referidos_activos: 0,
      saldo_bonos: 5.00 
    });

    return await this.usersRepository.save(nuevoUsuario);
  }

  calcularNivel(numeroReferidos: number) {
    if (numeroReferidos >= 50) return 'Diamante';
    if (numeroReferidos >= 15) return 'Oro';
    if (numeroReferidos >= 5) return 'Plata';
    return 'Bronce';
  }
}