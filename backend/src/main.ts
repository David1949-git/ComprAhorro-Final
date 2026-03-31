import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitamos CORS para que la PWA y el frontend local se conecten sin bloqueos
  app.enableCors(); 
  
  // Leemos el puerto del .env, si no lo encuentra usa el 10000
  const port = process.env.PORT || 10000;
  
  await app.listen(port);
  console.log('🚀 Motor de ComprAhorro encendido en puerto: ' + port);
}
bootstrap();
