import { Controller, Get, Query } from '@nestjs/common';
import { AhorrosService } from './ahorros.service';

@Controller('ahorros')
export class AhorrosController {
  constructor(private readonly ahorrosService: AhorrosService) {}

  @Get('buscar')
  async buscar(@Query('q') q: string) {
    return await this.ahorrosService.buscarProducto(q);
  }
}
