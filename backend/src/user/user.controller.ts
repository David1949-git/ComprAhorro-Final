import { Controller, Get, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}
  @Get('profile') getProfile() { return this.service.getProfile(); }
  @Post('gain-xp') gainXP(@Body() body: { puntos: number }) { 
    return this.service.gainXP(body.puntos); 
  }
}
