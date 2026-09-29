import { Controller, Get } from '@nestjs/common';

@Controller('hola')
export class HolaController {
  @Get()
  saludar() {
    return { mensaje: 'Ainara Gorría, curso DAM' };
  }
}