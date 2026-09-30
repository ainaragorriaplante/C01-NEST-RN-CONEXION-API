import { Injectable } from '@nestjs/common';

@Injectable()
export class HeroesService {
  private heroes = [
    { id: 1, nombre: 'Nova', poder: 80, universo: 'A' },
    { id: 2, nombre: 'Titan', poder: 95, universo: 'B' },
    { id: 3, nombre: 'Volt', poder: 88, universo: 'A' },
  ];

  findOne(id: number) {
    return this.heroes.find(
      heroe => heroe.id === id
    );
  }
}