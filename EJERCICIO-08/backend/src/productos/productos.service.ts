import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductosService {
  private productos = [
    { id: 1, nombre: 'Burger', precio: 9.95, emoji: '🍔' },
    { id: 2, nombre: 'Pizza', precio: 11.5, emoji: '🍕' },
    { id: 3, nombre: 'Taco', precio: 7.5, emoji: '🌮' },
  ];

  findAll() {
    return this.productos;
  }
}