import { AdminUsersModule } from "./adminUsers/admin.users.module";
import { CacheModule, Module } from "@nestjs/common";
import { UsersModule } from "./users/users.module";
import { MovesModule } from "./moves/moves.module";
import { AppController } from "./app.controller";
import { AuthModule } from "./auth/auth.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppService } from "./app.service";
@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      host: process.env.HOST_REDIS,
      port: process.env.PORT_REDIS,
    }),
    TypeOrmModule.forRoot({
      type: "postgres",
      host: process.env.HOST,
      port: 5432,
      username: process.env.USERNAME,
      password: process.env.PASSWORD,
      database: process.env.DATABASE,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
      synchronize: true,
      autoLoadEntities: true
    }),
    AuthModule,
    AdminUsersModule,
    UsersModule,
    MovesModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
