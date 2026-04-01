import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { getJson } from 'serpapi';
@Injectable()
export class AhorrosService {
  async buscarProducto(q: string) {
    const apiKey = process.env.SERPAPI_KEY;
    if (!apiKey || apiKey === 'TU_LLAVE_AQUI') {
      throw new InternalServerErrorException('Error: SERPAPI_KEY no configurada en el .env');
    }
    try {
      const response = await getJson({
        engine: "google_shopping",
        q: q + " Panama",
        api_key: apiKey,
        hl: "es",
        gl: "us",
        location: "Panama City, Panama",
      });
      const resultados = (response.shopping_results || []).map((item: any) => ({
        producto: item.title,
        tienda: item.source,
        precioFinal: item.price,
        link: item.link,
      }));
      return resultados;
    } catch (error) {
      console.error('Error en SerpApi:', error);
      throw new InternalServerErrorException('Error al conectar con el motor de busqueda');
    }
  }
}
