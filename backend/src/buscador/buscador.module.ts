import { Module } from '@nestjs/common';
import { BuscadorService } from './buscador.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  providers: [BuscadorService],
  exports: [BuscadorService]
})
export class BuscadorModule {}
