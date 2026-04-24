import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable } from "rxjs";
import { Logger } from "@nestjs/common";
import { tap } from "node:test/reporters";

export class LoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    Logger.log(
      "Logging Interceptor",
      context.getClass().name + "::" + context.getHandler().name,
    );

    return next.handle().pipe();
  }
}
