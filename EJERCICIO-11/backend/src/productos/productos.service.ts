import { Injectable } from '@nestjs/common';

type NuevoProducto = {
  nombre: string;
  precio: number;
};

@Injectable()
export class ProductosService {
  private productos = [
    { id: 1, nombre: 'Mochila', precio: 35 },
    { id: 2, nombre: 'Auriculares', precio: 49 },
  ];

  findAll() {
    return this.productos;
  }

  crear(producto: NuevoProducto) {
    const nuevo = {
      id: this.productos.length + 1,
      ...producto,
    };

    this.productos.push(nuevo);
    return nuevo;
  }
}