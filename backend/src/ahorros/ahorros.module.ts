import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AhorrosController } from './ahorros.controller';
import { AhorrosService } from './ahorros.service';
import { Ahorro } from './ahorro.entity';
import { BuscadorModule } from '../buscador/buscador.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Ahorro]),
    BuscadorModule // Esto es lo que le faltaba para reconocer al "vecino"
  ],
  controllers: [AhorrosController],
  providers: [AhorrosService],
})
export class AhorrosModule {}
