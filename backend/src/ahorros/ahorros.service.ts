import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { getJson } from 'serpapi';
import Groq from 'groq-sdk';

@Injectable()
export class AhorrosService {
  async buscarProducto(q: string, lat?: string, lon?: string) {
    const serpKey = process.env.SERPAPI_KEY;
    const groqKey = process.env.GROQ_API_KEY;
    if (!serpKey) throw new InternalServerErrorException('SERPAPI_KEY no configurada');

    const ubicacion = lat && lon
      ? `El usuario esta ubicado en coordenadas ${lat}, ${lon} en Panama. Prioriza negocios cercanos a esa ubicacion.`
      : 'El usuario esta en Panama.';

    // ── Búsqueda 1: tiendas panameñas con catálogo web ────────────────
    let resultadosTiendas: any[] = [];
    try {
      const response = await getJson({
        engine: 'google',
        q: `${q} site:pricesmart.com/es-pa OR site:rey.com.pa OR site:super99.com.pa OR site:machetazo.com OR site:ribasmith.com.pa OR site:arrocha.com`,
        api_key: serpKey,
        hl: 'es',
        gl: 'pa',
        num: 6,
      });
      resultadosTiendas = (response.organic_results || []).slice(0, 3).map((item: any) => ({
        producto: item.title,
        tienda: extraerTienda(item.link),
        precioFinal: extraerPrecio(item.snippet) || 'Ver precio en tienda',
        link: item.link,
        imagen: item.thumbnail || '',
        telefono: '',
        direccion: '',
        horario: '',
        categoria: '',
        tipo: 'tienda',
      }));
    } catch (e) {
      console.warn('Error busqueda tiendas:', e);
    }

    // Siempre combinamos tiendas + Groq

    // ── Búsqueda 2: Groq con conocimiento propio + ubicación ──────────
    if (groqKey) {
      try {
        const groq = new Groq({ apiKey: groqKey });
        const chat = await groq.chat.completions.create({
          model: 'llama-3.3-70b-versatile',
          messages: [{
            role: 'system',
            content: `Eres un asistente experto en comercios y negocios de Panama.
Cuando te pregunten sobre un producto o servicio, respondes con negocios reales en Panama donde se puede conseguir.
SIEMPRE respondes en formato JSON array. NUNCA texto adicional.`
          }, {
            role: 'user',
            content: `Busco: "${q}" en Panama.
${ubicacion}
Dame hasta 6 negocios reales y cercanos donde pueda conseguirlo.
Para cada negocio incluye:
- producto: descripcion del producto o servicio
- tienda: nombre del negocio
- precioFinal: precio aproximado si lo conoces, sino "Consultar precio"
- link: sitio web o pagina de Facebook/Instagram si tiene, sino ""
- imagen: ""
- telefono: telefono real del negocio incluyendo WhatsApp si lo tiene, sino ""
- direccion: direccion fisica en Panama lo mas especifica posible, sino ""
- horario: horario de atencion si lo conoces, sino ""
- categoria: tipo de negocio como Repuestos, Farmacia, Supermercado, Electronica, Ferreteria, Ropa, Servicios
- tipo: "local"

Responde SOLO con el JSON array, sin explicaciones ni markdown.`
          }],
          max_tokens: 1500,
        });

        const texto = chat.choices[0]?.message?.content || '[]';
        try {
          const parsed = JSON.parse(texto.replace(/```json|```/g, '').trim());
          const resultadosGroq = Array.isArray(parsed) ? parsed : [];
          if (resultadosGroq.length > 0) {
            return [...resultadosTiendas, ...resultadosGroq].slice(0, 6);
          }
        } catch (e) {
          console.warn('Error parseando Groq:', e);
        }
      } catch (e) {
        console.warn('Error Groq:', e);
      }
    }

    // ── Búsqueda 3: fallback SerpAPI general ──────────────────────────
    try {
      const responseGeneral = await getJson({
        engine: 'google',
        q: `${q} Panama precio comprar`,
        api_key: serpKey,
        hl: 'es',
        gl: 'pa',
        num: 6,
      });
      return (responseGeneral.organic_results || []).slice(0, 3).map((item: any) => ({
        producto: item.title,
        tienda: extraerDominio(item.link),
        precioFinal: extraerPrecio(item.snippet) || 'Consultar precio',
        link: item.link,
        imagen: item.thumbnail || '',
        telefono: '',
        direccion: '',
        horario: '',
        categoria: '',
        tipo: 'local',
      }));
    } catch (e) {
      console.warn('Error busqueda general:', e);
      return [];
    }
  }
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

function extraerDominio(url: string): string {
  try { return new URL(url).hostname.replace('www.', ''); }
  catch { return 'Ver enlace'; }
}

function extraerPrecio(snippet: string): string {
  if (!snippet) return '';
  const match = snippet.match(/\$[\d,]+\.?\d*/);
  return match ? match[0] : '';
}



