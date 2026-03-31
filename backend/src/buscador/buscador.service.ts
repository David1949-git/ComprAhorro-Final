import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class BuscadorService {
  private readonly logger = new Logger(BuscadorService.name);

  constructor(private readonly httpService: HttpService) {}

  async buscarEnInternet(termino: string): Promise<any[]> {
    this.logger.log(`IA: Iniciando rastreo en internet para "${termino}"...`);
    
    try {
      // Aquí conectaremos SerpApi más adelante. 
      // Nota: dejaremos preparado el parámetro gl=pa para priorizar resultados locales.
      // const url = `https://serpapi.com/search.json?engine=google_shopping&q=${termino}&hl=es&gl=pa&api_key=TU_API_KEY`;
      
      // Simulamos los resultados de la IA para que los testers puedan probar la interfaz ya mismo:
      const precioBase = Math.floor(Math.random() * 100) + 50;
      
      return [
        {
          producto: `${termino} (Opción IA - Tienda A)`,
          monto: precioBase.toFixed(2)
        },
        {
          producto: `${termino} (Opción IA - Tienda B)`,
          monto: (precioBase * 0.85).toFixed(2) // 15% más barato
        }
      ];
    } catch (error) {
      this.logger.error(`Error en el motor de IA buscando ${termino}:`, error.message);
      return [];
    }
  }
}
