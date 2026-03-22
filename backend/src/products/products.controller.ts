import { Controller, Get, Query } from '@nestjs/common';
import { ScraperService } from './scraper.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly scraperService: ScraperService) {}

  @Get('scrape')
  async scrape(@Query('query') query: string) {
    return await this.scraperService.scrape(query);
  }
}
