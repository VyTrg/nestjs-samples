import {
  Body,
  Controller,
  Get,
  Inject,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { Roles } from "../common/decorators/roles.decorator";
import { RolesGuard } from "../common/guards/roles.guard";
import { ParseIntPipe } from "../common/pipes/parse-int.pipe";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./dto/create-cat.dto";
import { Cat } from "./interfaces/cat.interface";
import { JwtGuard } from "../common/guards/jwt.guard";
import { Logger } from "@nestjs/common";
import { LoggingInterceptor } from "../common/interceptors/logging.interceptor";
import { UseInterceptors } from "@nestjs/common";

// @UseGuards(RolesGuard)
@Controller("cats")
// @UseInterceptors(LoggingInterceptor)
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  @Post()
  @Roles(["admin"])
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  @UseGuards(JwtGuard)
  @Get()
  // @UseInterceptors(LoggingInterceptor)
  async findAll(): Promise<Cat[]> {
    Logger.log("CatsController findAll", CatsController.name);
    return this.catsService.findAll();
  }

  @Get(":id")
  findOne(
    @Param("id", new ParseIntPipe())
    id: number,
  ) {
    // Retrieve a Cat instance by ID
    console.log(id);
  }
}
