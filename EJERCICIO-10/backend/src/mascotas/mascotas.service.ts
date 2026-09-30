import { Injectable } from '@nestjs/common';

@Injectable()
export class MascotasService {
  private mascotas = [
    { id: 1, nombre: 'Toby', likes: 14 },
  ];

  darLike(id: number) {
    const mascota = this.mascotas.find(
      item => item.id === id
    );

    if (!mascota) {
      return undefined;
    }

    mascota.likes++;
    return mascota;
  }
}