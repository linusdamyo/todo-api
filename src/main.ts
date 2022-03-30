import { NestFactory } from '@nestjs/core';
import { HttpExceptionFilter } from 'src/common/exception/http-exception.filter';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new HttpExceptionFilter());
  app.setGlobalPrefix('/api');
  await app.listen(3000);
}
bootstrap();
