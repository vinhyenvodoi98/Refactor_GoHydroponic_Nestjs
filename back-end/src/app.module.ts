import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './ormconfig';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    MongooseModule.forRoot('mongodb://mongo:27017/hydroData'),
    AuthModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
