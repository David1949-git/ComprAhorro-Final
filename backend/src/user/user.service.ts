import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(@InjectRepository(User) private repo: Repository<User>) {}
  async getProfile() {
    let u = await this.repo.findOne({ where: { id: 1 } });
    if (!u) { u = await this.repo.save(this.repo.create({ id: 1 })); }
    return u;
  }
  async gainXP(puntos: number) {
    const u = await this.getProfile();
    u.xp += puntos;
    if (u.xp >= 100) u.nivel = 'GOLD';
    if (u.xp >= 500) u.nivel = 'PREMIUM';
    return this.repo.save(u);
  }
}
