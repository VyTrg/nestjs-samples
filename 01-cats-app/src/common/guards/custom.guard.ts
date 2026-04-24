import { ThrottlerGuard } from "@nestjs/throttler";
import { CanActivate } from "@nestjs/common";
import { Logger } from "@nestjs/common";
export class CustomGuard extends ThrottlerGuard implements CanActivate {
  canActivate(context: any) {
    Logger.log("CustomGuard canActivate", CustomGuard.name);
    return super.canActivate(context);
  }
}
