import { Controller, Post, Body } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  @Post('registro-rapido')
  async registro(@Body() data: { nombre: string, whatsapp: string }) {
    console.log('--- Nuevo Intento de Registro ---');
    console.log('Usuario:', data.nombre);
    console.log('WhatsApp:', data.whatsapp);

    // TODO: Aquí conectaremos con Neon Cloud para guardar a David como Admin
    return { 
      status: 'success', 
      message: '¡Conexión exitosa con el Backend de ComprAhorro!',
      user: { 
        ...data, 
        role: 'admin', 
        saldo: 0.00,
        codigoReferido: 'DAVID-PRO-001' 
      } 
    };
  }
}
