import { Controller, Get, Query } from '@nestjs/common';
import { AhorrosService } from './ahorros.service';

@Controller('ahorros')
export class AhorrosController {
  constructor(private readonly ahorrosService: AhorrosService) {}

  @Get('buscar')
  async buscar(
    @Query('q') q: string,
    @Query('lat') lat?: string,
    @Query('lng') lng?: string,
  ) {
    // Aquí llamamos al método que Claude ajustó
    return await this.ahorrosService.buscarProducto(q, lat, lng);
  }
}