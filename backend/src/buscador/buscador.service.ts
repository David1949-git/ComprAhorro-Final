import { Injectable } from '@nestjs/common';
import { getJson } from 'serpapi';

@Injectable()
export class BuscadorService {
  private readonly SERPAPI_KEY = 'e531538be0b89765d2dc3f0eeea284e07c4566d9c143d9f66e51122b3073c3af';

  async buscarProducto(query: string) {
    try {
      const tiendasLocales = 'site:rodelag.com OR site:panafoto.com OR site:multimax.net';
      const busquedaExacta = query + ' ' + tiendasLocales;

      const parametros = {
        engine: 'google',
        q: busquedaExacta,
        location: 'Panama',
        hl: 'es',
        gl: 'pa',
        api_key: this.SERPAPI_KEY,
      };

      const respuesta = await getJson(parametros);
      const resultadosOrganicos = respuesta.organic_results || [];
      const resultadosLimitados = resultadosOrganicos.slice(0, 6);

      const resultadosFinales = resultadosLimitados.map(item => {
        let precioBase = 0;
        if (item.price !== undefined) {
           precioBase = parseFloat(item.price.toString().replace(/[^0-9.]/g, ''));
        }
        const comision = 1.15;
        const precioFinal = (precioBase * comision).toFixed(2);

        return {
          titulo: item.title,
          comercio: item.source || 'Comercio Local',
          enlace: item.link,
          precioFinal: precioFinal,
          foto: item.thumbnail || 'ruta/a/imagen-por-defecto.png'
        };
      });

      return resultadosFinales.filter(item => parseFloat(item.precioFinal) > 0);
    } catch (error) {
      console.error('Error en la búsqueda con SerpApi:', error);
      throw new Error('No se pudieron obtener los resultados de búsqueda.');
    }
  }
}
