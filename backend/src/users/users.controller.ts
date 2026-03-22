import { Controller, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async register(@Body() userData: any) {
    console.log('--- RECIBIENDO REGISTRO: ' + userData.email + ' ---');
    return await this.usersService.crearUsuario(userData);
  }
}
