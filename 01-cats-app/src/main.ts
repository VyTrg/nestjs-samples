/*

all from global to pound function

request lifecycle
first: middleware (next() -> allow request go to next stage)
handle information of request before route handler, BUT DONT KNOW ACTUALLY ROUTE
-> guard
like middleware in typically but know actually route, authenticate,...
-> interceptor (pre-controller)
handle request and response before controller or client: log, cache, transform, error handling
POST: GLOBAL -> controller -> route
PRE: Route -> Controller -> GLOBAL
-> pipes
validate, filter, ... data
-> controller
-> service
-> (interceptor)
-> exception filter
return exception to client
*/
declare const module: any;

import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { MainModule } from "./main.module";
import { Logger } from "@nestjs/common";
import { LoggingInterceptor } from "./common/interceptors/logging.interceptor";

async function bootstrap() {
  const app = await NestFactory.create(MainModule, {
    logger: ["error", "warn", "log"],
  });
  app.use((req: Request, res: Response, next) => {
    Logger.log(`GlobalMiddleware`);
    next();
  });
  // app.useGlobalInterceptors(new LoggingInterceptor());
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
  console.log(`Application is running on: ${await app.getUrl()}`);

  if (module.hot) {
    module.hot.accept(() => {
      console.log("Module hot accepted");
    });
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
