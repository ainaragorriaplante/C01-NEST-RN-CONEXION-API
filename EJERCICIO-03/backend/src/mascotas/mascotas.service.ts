import { Injectable } from '@nestjs/common';

@Injectable()
export class MascotasService {
  private mascotas = [
    { id: 1, nombre: 'Firulais', especie: 'Perro' },
    { id: 2, nombre: 'Michi', especie: 'Gato' },
    { id: 3, nombre: 'Nemo', especie: 'Pez' },
    
];

  findOne(id: number) {
    return this.mascotas.find((m) => m.id === id);
  }
}
