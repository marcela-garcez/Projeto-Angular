import { Injectable, signal } from '@angular/core';

export interface Product {
  id: number;
  name: string;
  price: number;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products = signal<Product[]>([
    { id: 1, name: 'Notebook', price: 5000 },
    { id: 2, name: 'Mouse', price: 150 },
  ]);
  private nextId = this.products().length + 1;

  constructor() { }

  getProducts() {
    return this.products;
  }

  addProduct(product: Omit<Product, 'id'>) {
    const newProduct: Product = { ...product, id: this.nextId++ };
    this.products.update(items => [...items, newProduct]);
  }

  updateProduct(updatedProduct: Product) {
    this.products.update(items =>
      items.map(product => product.id === updatedProduct.id ? updatedProduct : product)
    );
  }

  deleteProduct(id: number) {
    this.products.update(items => items.filter(product => product.id !== id));
  }
}