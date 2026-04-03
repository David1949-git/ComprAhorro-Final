import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../users/user.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async register(userData: any) {
    const newUser = this.userRepository.create(userData);
    const savedUser = (await this.userRepository.save(newUser)) as unknown as User;
    return { status: "success", message: "Usuario guardado en Neon", id: savedUser.id };
  }

  async login(credentials: any) {
    const user = await this.userRepository
      .createQueryBuilder("user")
      .addSelect("user.password")
      .where("user.email = :email", { email: credentials.email })
      .getOne();

    if (!user || user.password !== credentials.password) {
      throw new UnauthorizedException("Credenciales incorrectas en la DB");
    }

    return {
      status: "success",
      message: "Login REAL exitoso",
      user: { id: user.id, email: user.email }
    };
  }
}
