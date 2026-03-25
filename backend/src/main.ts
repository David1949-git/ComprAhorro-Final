require('dotenv').config();
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 1. Prefijo Global: Todas tus rutas serán ahora midominio.com/api/...
  // Esto es estándar en la industria y separa la API del contenido estático.
  app.setGlobalPrefix('api');

  // 2. CORS: Ya lo tienes, es vital para que tu Dashboard se conecte.
  app.enableCors();

  // 3. Puerto para Render: Usamos el 10000 como fallback profesional.
  // Render suele preferir este puerto si no detecta la variable de entorno.
  const port = process.env.PORT || 10000;
  
  await app.listen(port);
  console.log(`--- SERVIDOR ComprAhorro: ONLINE EN PUERTO ${port} ---`);
  console.log(`--- RUTAS DISPONIBLES EN: http://localhost:${port}/api ---`);
}
bootstrap();