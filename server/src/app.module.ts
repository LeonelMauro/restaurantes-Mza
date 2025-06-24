import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestauranteModule } from './restaurante/restaurante.module';
import { ReseñaModule } from './reseña/reseña.module';
import { PromocionModule } from './promocion/promocion.module';
import { UserModule } from './user/user.module';
import { MenuModule } from './menu/menu.module';
import { PhotosModule } from './photos/photos.module';
import { ReservaModule } from './reserva/reserva.module';
import { PerfilModule } from './perfil/perfil.module';
import { ScheduleModule } from '@nestjs/schedule';
import { BebidasModule } from './bebidas/bebidas.module';
import { EventosModule } from './eventos/eventos.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: parseInt(config.get<string>('DB_PORT') || '5432', 10),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],  // Lista de tus entidades
        synchronize: true,
      }),
      inject: [ConfigService],
    }),
    RestauranteModule,
    ReservaModule,
    ReseñaModule,
    PromocionModule,
    UserModule,
    MenuModule,
    PhotosModule,
    PerfilModule,
    BebidasModule,
    EventosModule,
  ],
})
export class AppModule {}
