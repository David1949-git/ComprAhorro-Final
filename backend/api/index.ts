import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from '../src/app.module';
import express from 'express';

interface VercelRequest {
  method?: string;
  url?: string;
  headers?: any;
  body?: any;
  query?: any;
}

interface VercelResponse {
  status(code?: number): VercelResponse;
  json(data: any): void;
  send(data: any): void;
  setHeader(name: string, value: string): void;
}

let app: any;

async function bootstrap() {
  if (!app) {
    const expressApp = express();
    const adapter = new ExpressAdapter(expressApp);
    app = await NestFactory.create(AppModule, adapter, { logger: false });
    
    app.enableCors({
      origin: ['http://localhost:8080', 'http://localhost:5173', 'https://your-frontend-domain.vercel.app'],
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
      allowedHeaders: ['Content-Type', 'Authorization'],
      credentials: true,
    });
    
    await app.init();
    return expressApp;
  }
  return app;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const app = await bootstrap();
  app(req, res);
}
