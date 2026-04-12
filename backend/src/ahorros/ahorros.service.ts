import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { getJson } from 'serpapi';
import Groq from 'groq-sdk';

@Injectable()
export class AhorrosService {
  async buscarProducto(q: string, lat?: string, lon?: string) {
    const serpKey = process.env.SERPAPI_KEY;
    const groqKey = process.env.GROQ_API_KEY;
    if (!serpKey) throw new InternalServerErrorException('SERPAPI_KEY no configurada');

    // Ubicación para análisis y búsqueda geolocalizada
    const ubicacion = lat && lon
      ? `El usuario esta ubicado en coordenadas ${lat}, ${lon} en Panama. Prioriza negocios cercanos a esa ubicacion.`
      : 'El usuario esta en Panama.';

    let resultadosTiendas: any[] = [];
    
    // Búsqueda 1: Tiendas panameñas con geolocalización
    try {
      const searchQuery = lat && lon 
        ? `${q} near ${lat},${lon} site:pricesmart.com/es-pa OR site:rey.com.pa OR site:super99.com.pa OR site:machetazo.com OR site:ribasmith.com.pa OR site:arrocha.com`
        : `${q} Panama site:pricesmart.com/es-pa OR site:rey.com.pa OR site:super99.com.pa OR site:machetazo.com OR site:ribasmith.com.pa OR site:arrocha.com`;
      
      const response = await getJson({
        engine: 'google',
        q: searchQuery,
        api_key: serpKey,
        hl: 'es',
        gl: 'pa',
        location: lat && lon ? `${lat},${lon}` : 'Panama',
        num: 6,
      });
      resultadosTiendas = (response.organic_results || []).slice(0, 3).map((item: any) => ({
        producto: item.title,
        tienda: extraerTienda(item.link),
        precioFinal: extraerPrecio(item.snippet) || 'Ver precio en tienda',
        link: item.link,
        imagen: item.thumbnail || '',
        tipo: 'tienda',
      }));
    } catch (e) {
      console.warn('Error busqueda tiendas:', e);
    }

    // ── Búsqueda 2: Groq ────────────────
    let resultadosGroq: any[] = [];
    if (groqKey) {
      try {
        const groq = new Groq({ apiKey: groqKey });
        const chat = await groq.chat.completions.create({
          model: 'llama-3.3-70b-versatile',
          messages: [{
            role: 'system',
            content: `Eres un asistente experto en comercios de Panama. Responde SIEMPRE en formato JSON array.`
          }, {
            role: 'user',
            content: `Busco: "${q}" en Panama. ${ubicacion} Dame hasta 4 negocios reales.`
          }],
          max_tokens: 1000,
        });

        const texto = chat.choices[0]?.message?.content || '[]';
        const parsed = JSON.parse(texto.replace(/```json|```/g, '').trim());
        resultadosGroq = Array.isArray(parsed) ? parsed : [];
      } catch (e) {
        console.warn('Error Groq:', e);
      }
    }

    // ── Combinar y Generar Veredicto ────────────────
    const todosLosResultados = [...resultadosTiendas, ...resultadosGroq].slice(0, 6);
    const veredicto = generarVeredictoComprAhorro(todosLosResultados, q);

    return {
      resultados: todosLosResultados,
      veredicto: veredicto
    };
  }
}

// --- Funciones de Apoyo ---

function generarVeredictoComprAhorro(items: any[], producto: string): string {
  // Filtrar los que tienen precio numérico
  const conPrecio = items.filter(i => i.precioFinal && i.precioFinal.includes('$'));
  
  if (conPrecio.length === 0) {
    return `ComprAhorro recomienda revisar el Super 99 o Riba Smith por su inventario constante para "${producto}" en las principales tiendas de Panamá. No detectamos un precio de oferta hoy.`;
  }

  // Encontrar el más barato
  const mejorOpcion = conPrecio.reduce((min, p) => {
    const precioActual = parseFloat(p.precioFinal.replace('$', '').replace(',', ''));
    const precioMin = parseFloat(min.precioFinal.replace('$', '').replace(',', ''));
    return precioActual < precioMin ? p : min;
  });

  return `ComprAhorro encuentra que para "${producto}", tu mejor opción hoy es ${mejorOpcion.tienda} con un precio de ${mejorOpcion.precioFinal}. ¡ComprAhorro busca, tú ahorras! 🐷`;
}

function extraerTienda(url: string): string {
  if (url.includes('pricesmart')) return 'PriceSmart';
  if (url.includes('rey.com.pa')) return 'El Rey';
  if (url.includes('super99')) return 'Super 99';
  if (url.includes('machetazo')) return 'Machetazo';
  if (url.includes('ribasmith')) return 'Riba Smith';
  if (url.includes('arrocha')) return 'Farmacia Arrocha';
  return 'Tienda Panama';
}

function extraerPrecio(snippet: string): string {
  if (!snippet) return '';
  const match = snippet.match(/\$[\d,]+\.?\d*/);
  return match ? match[0] : '';
}
