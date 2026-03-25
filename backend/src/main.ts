import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // *** LÍNEA CLAVE PARA QUE EL FRONTEND HABLE CON RENDER ***
  // Esto habilita los permisos Cross-Origin Resource Sharing (CORS)
  app.enableCors({
    origin: '*', // Permite llamadas desde CUALQUIER URL (temporalmente para testing)
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  // Escucha en el puerto 10000 (el que pide Render) o el 3000 local
  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Motor de ComprAhorro encendido en puerto: ${port}`);
}
bootstrap();