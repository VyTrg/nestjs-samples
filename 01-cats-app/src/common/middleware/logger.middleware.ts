import { Injectable, NestMiddleware } from "@nestjs/common";
import { Logger } from "@nestjs/common";

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: any, res: any, next: () => void) {
    Logger.log(`LoggerMiddleware: Request...`);
    const appVersion = req.headers["app-version"];
    if (!appVersion) {
      Logger.error(
        "LoggerMiddleware: App version header is missing",
        LoggerMiddleware.name,
      );
    } else {
      next();
      Logger.log(`LoggerMiddleware: Change to Route...`, LoggerMiddleware.name);
    }
  }
}
