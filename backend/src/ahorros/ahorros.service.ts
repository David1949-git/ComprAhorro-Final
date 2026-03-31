import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
const SerpApi = require('google-search-results-nodejs');

@Injectable()
export class AhorrosService {
  constructor(private configService: ConfigService) {}

  async buscarProducto(query: string) {
    const apiKey = this.configService.get<string>('SERPAPI_KEY');
    const search = new SerpApi.GoogleSearch(apiKey);

    return new Promise((resolve, reject) => {
      search.json({
        engine: "google_shopping",
        q: `${query} Panama`, // Aquí ya garantizamos que busque en Panamá
        hl: "es" 
        // Eliminamos el parámetro 'gl' que causaba el rechazo
      }, (data) => {
        if (data.shopping_results) {
          const resultadosProcesados = data.shopping_results.map(prod => {
            const precioString = prod.price || "0"; 
            const precioBase = parseFloat(precioString.replace(/[^0-9.]/g, ''));
            
            // Aplicamos la comisión invisible del 15% (Nivel 1)
            const precioConComision = precioBase * 1.15;

            return {
              tienda: prod.source,
              producto: prod.title,
              precioFinal: precioConComision.toFixed(2),
              link: prod.link,
              imagen: prod.thumbnail,
              mensaje: "Servicio de búsqueda y gestión de ahorro incluido"
            };
          });
          resolve(resultadosProcesados);
        } else {
          resolve([]);
        }
      });
    });
  }
}
