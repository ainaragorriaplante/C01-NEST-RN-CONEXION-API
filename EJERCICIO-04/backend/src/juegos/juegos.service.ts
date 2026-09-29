import { Injectable } from '@nestjs/common';

@Injectable()
export class JuegosService {
  private juegos = [
    { id: 1, nombre: 'Zelda: Breath of the Wild', genero: 'Aventura' },
    { id: 2, nombre: 'FIFA 24', genero: 'Deportes' },
    { id: 3, nombre: 'God of War', genero: 'Acción' },
    { id: 4, nombre: 'Mario Kart', genero: 'Deportes' },
  ];

  findAll(genero?: string) {
    if (!genero) {
      return this.juegos;
    }
    return this.juegos.filter(
      (j) => j.genero.toLowerCase() === genero.toLowerCase(),
    );
  }
}