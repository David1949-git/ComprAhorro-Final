import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { User } from "../users/user.entity";

@Module({
  imports: [
    TypeOrmModule.forFeature([User]) // <-- Esto es lo que NestJS está pidiendo
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [AuthService],
})
export class AuthModule {}
