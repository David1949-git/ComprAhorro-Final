import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class ScraperService {
  private apiKey = 'e531538be0b89765d2dc3f0eeea284e07c4566d9c143d9f66e51122b3073c3af';

  async scrape(query: string) {
    try {
      const res = await axios.get('https://serpapi.com/search', {
        params: { 
          api_key: this.apiKey, 
          q: query + ' Panama', 
          location: 'Panama', 
          engine: 'google',
          gl: 'pa', hl: 'es',
          tbm: 'shop' // Intentar modo "Shopping" para mejores fotos si está disponible
        }
      });

      // Si el modo shopping falla, intentamos búsqueda orgánica normal
      let results = res.data.shopping_results || res.data.organic_results || [];

      return results.slice(0, 6).map(r => {
        let precio = r.price || r.rich_snippet?.top?.detected_extensions?.price_str;
        if (!precio) {
            const match = r.snippet?.match(/\$\s?([0-9,.]+)/);
            precio = match ? match[0] : 'Ver Precio';
        }

        return {
          supermercado: r.source || r.display_link || 'Comercio PA',
          nombre: r.title,
          descripcion: r.snippet || 'Calidad garantizada.',
          precio: precio,
          // Buscamos la imagen en 3 lugares diferentes por si acaso
          imagen: r.thumbnail || r.rich_snippet?.top?.detected_extensions?.image || r.pagemap?.cse_image?.[0]?.src || 'https://via.placeholder.com/200?text=ComprAhorro',
          link: r.link
        };
      });
    } catch { return []; }
  }
}
