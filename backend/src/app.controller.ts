import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return '¡ComprAhorro 🐷 está en línea y funcionando para David y su familia! ⚡';
  }
}