import { CanActivate } from "@nestjs/common";
import { Logger } from "@nestjs/common";

export class JwtGuard implements CanActivate {
  canActivate(context) {
    Logger.log("CustomGuard canActivate", JwtGuard.name);

    return true;
  }
}
