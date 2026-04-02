import { Controller, Get, Query } from '@nestjs/common';
import { AhorrosService } from './ahorros.service';

@Controller('ahorros')
export class AhorrosController {
  constructor(private readonly ahorrosService: AhorrosService) {}

  @Get('buscar')
  buscar(
    @Query('q') q: string,
    @Query('lat') lat?: string,
    @Query('lng') lng?: string,
  ) {
    return this.ahorrosService.buscarProducto(q, lat, lng);
  }
}
