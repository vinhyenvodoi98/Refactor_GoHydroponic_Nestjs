import { Module, NestModule, MiddlewareConsumer, Logger } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './ormconfig';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import * as morgan from 'morgan';
@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    MongooseModule.forRoot('mongodb://mongo:27017/hydroData'),
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [Logger],
})
export class AppModule {
  constructor(private logger: Logger) {}

  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(
        morgan('dev', {
          stream: {
            write: message =>
              this.logger.log(
                message.substring(0, message.lastIndexOf('\n')),
                'HTTP Request',
              ),
          },
        }),
      )
      .forRoutes('*');
  }
}
