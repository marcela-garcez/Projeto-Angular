import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Product, ProductService } from '../../services/product.service';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnChanges {
  @Input() product: Product | null = null;
  @Output() productSaved = new EventEmitter<void>();

  private productService = inject(ProductService);
  
  // Objeto para armazenar os dados do formulário
  productForm = {
    name: '',
    price: 0
  };

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product'] && this.product) {
      this.productForm = {
        name: this.product.name,
        price: this.product.price
      };
    } else if (changes['product'] && !this.product) {
      this.resetForm();
    }
  }

  onSubmit() {
    if (this.product) {
      // Edição
      const updatedProduct = { ...this.product, ...this.productForm };
      this.productService.updateProduct(updatedProduct);
    } else {
      // Criação
      this.productService.addProduct(this.productForm);
    }
    this.resetForm();
    this.productSaved.emit();
  }

  resetForm() {
    this.productForm = { name: '', price: 0 };
  }
}