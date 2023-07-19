import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserService } from './auth/user.service';

async function start() {
  const app = await NestFactory.create(AppModule);
  const userService = app.get(UserService);

  await userService.createUser('user', 'password');
  await app.listen(3000); // Змініть порт на відповідний значення
}
start();
