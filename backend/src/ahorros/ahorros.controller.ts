import { Controller, Get, Query } from '@nestjs/common';
import { AhorrosService } from './ahorros.service';

@Controller('ahorros')
export class AhorrosController {
  constructor(private readonly ahorrosService: AhorrosService) {}

  @Get('buscar')
  buscar(@Query('q') q: string) {
    return this.ahorrosService.buscarProducto(q);
  }
}