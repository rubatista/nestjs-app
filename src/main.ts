import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3001', // Atualiza para a porta do teu frontend NuxtJS
    credentials: true, // Se estiveres a usar cookies ou autenticação com credenciais
  });

  await app.listen(3000); // backend will runn at port 3000
}
bootstrap();
