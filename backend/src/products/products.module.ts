import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ScraperService } from './scraper.service';

@Module({
  controllers: [ProductsController],
  providers: [ScraperService],
})
export class ProductsModule {}
