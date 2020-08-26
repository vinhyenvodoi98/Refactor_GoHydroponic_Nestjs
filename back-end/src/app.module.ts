import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(config),
    MongooseModule.forRoot('mongodb://mongo:27017/hydroData'),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
