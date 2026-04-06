import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { getJson } from 'serpapi';

@Injectable()
export class AhorrosService {
  async buscarProducto(q: string) {
    const serpKey = process.env.SERPAPI_KEY;

    if (!serpKey) {
      throw new InternalServerErrorException('Error: SERPAPI_KEY no configurada');
    }

    try {
      const response = await getJson({
        engine: 'google',
        q: `${q} site:pricesmart.com/es-pa OR site:rey.com.pa OR site:super99.com.pa OR site:machetazo.com OR site:ribasmith.com.pa OR site:arrocha.com`,
        api_key: serpKey,
        hl: 'es',
        gl: 'pa',
        num: 6,
      });

      const resultados = (response.organic_results || [])
        .slice(0, 6)
        .map((item: any) => ({
          producto: item.title,
          tienda: extraerTienda(item.link),
          precioFinal: extraerPrecio(item.snippet) || 'Ver precio en tienda',
          link: item.link,
          imagen: item.thumbnail || '',
        }));

      return resultados;

    } catch (error) {
      console.error('Error en SerpAPI:', error);
      throw new InternalServerErrorException('Error al conectar con el motor de busqueda');
    }
  }
}

function extraerTienda(url: string): string {
  if (url.includes('pricesmart')) return 'PriceSmart';
  if (url.includes('rey.com.pa')) return 'Rey';
  if (url.includes('super99')) return 'Super 99';
  if (url.includes('machetazo')) return 'Machetazo';
  if (url.includes('ribasmith')) return 'Riba Smith';
  if (url.includes('arrocha')) return 'Farmacia Arrocha';
  return 'Tienda Panamá';
}

function extraerPrecio(snippet: string): string {
  if (!snippet) return '';
  const match = snippet.match(/\$[\d,]+\.?\d*/);
  return match ? match[0] : '';
}