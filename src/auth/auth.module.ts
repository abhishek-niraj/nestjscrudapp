import { Module } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategy";
import { UserModule } from "src/user/user.module";
import { JwtGuard } from "./guard";

@Module({
    imports:[PrismaModule,JwtModule.register({ }),UserModule,],
    controllers:[AuthController],
    providers:[AuthService,JwtStrategy,JwtGuard]
})
export class AuthModule {

}