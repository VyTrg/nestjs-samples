import { Module } from "@nestjs/common";
// import { CatsModule } from "./cats/cats.module";
// import { CoreModule } from "./core/core.module";
import { NestModule } from "@nestjs/common/interfaces";
import { MiddlewareConsumer } from "@nestjs/common/interfaces/middleware/middleware-consumer.interface";
import { LoggerMiddleware } from "./common/middleware/logger.middleware";
import { CatsController } from "./cats/cats.controller";
import { CatsService } from "./cats/cats.service";
import { ThrottlerModule } from "@nestjs/throttler";
import { APP_GUARD } from "@nestjs/core";
import { CustomGuard } from "./common/guards/custom.guard";
import { CatsModule } from "./cats/cats.module";
import { JwtGuard } from "./common/guards/jwt.guard";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { LoggingInterceptor } from "./common/interceptors/logging.interceptor";
import { APP_FILTER } from "@nestjs/core";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        name: "default",
        ttl: 60000,
        limit: 2,
      },
    ]),
    JwtGuard,
  ],
  controllers: [CatsController],
  providers: [
    CatsService,
    {
      provide: APP_GUARD,
      useClass: CustomGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class MainModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(CatsController);
  }
}
