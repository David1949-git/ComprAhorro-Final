import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { getJson } from 'serpapi';

@Injectable()
export class AhorrosService {
  async buscarProducto(q: string, lat?: string, lng?: string) {
    const apiKey = process.env.SERPAPI_KEY;
    if (!apiKey || apiKey === 'TU_LLAVE_AQUI') {
      throw new InternalServerErrorException('Error: SERPAPI_KEY no configurada en el .env');
    }
    const location = (lat && lng)
      ? `${lat},${lng},15km`
      : 'Panama City, Panama';
    try {
      const response = await getJson({
        engine: "google_shopping",
        q: q,
        api_key: apiKey,
        hl: "es",
        gl: "us",
        location: location,
        num: 6,
      });
      const resultados = (response.shopping_results || [])
        .slice(0, 6)
        .map((item: any) => ({
          producto: item.title,
          tienda: item.source,
          precioFinal: item.price ? item.price.replace(/^\$+/, '$') : 'Precio no disponible',
          link: item.product_link || item.link || '#',   // ← LÍNEA CORREGIDA
          imagen: item.thumbnail || '',
        }));
      return resultados;
    } catch (error) {
      console.error('Error en SerpApi:', error);
      throw new InternalServerErrorException('Error al conectar con el motor de busqueda');
    }
  }
}