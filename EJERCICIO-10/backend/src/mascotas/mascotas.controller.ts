import {
  Controller,
  Param,
  Patch,
} from '@nestjs/common';
import { MascotasService } from './mascotas.service.js';

@Controller('mascotas')
export class MascotasController {
  constructor(
    private readonly mascotasService: MascotasService,
  ) {}

  @Patch(':id/like')
  darLike(@Param('id') id: string) {
    return this.mascotasService.darLike(
      Number(id)
    );
  }
}