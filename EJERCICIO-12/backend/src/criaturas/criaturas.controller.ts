import {
  Controller,
  Get,
  Param,
  Patch,
} from '@nestjs/common';
import { CriaturasService } from './criaturas.service.js';

@Controller('criaturas')
export class CriaturasController {
  constructor(
    private readonly criaturasService: CriaturasService,
  ) {}

  @Get()
  findAll() {
    return this.criaturasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.criaturasService.findOne(
      Number(id)
    );
  }

  @Patch(':id/like')
  darLike(@Param('id') id: string) {
    return this.criaturasService.darLike(
      Number(id)
    );
  }
}