import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersController } from './users/users.controller';
import { UsersService } from './users/users.service';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest-tasks'),
    TasksModule,
    AuthModule,
    UsersModule,
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class AppModule {}
