import { Component, inject } from '@angular/core';
import { Product, ProductService } from '../../services/product.service';
import { CommonModule } from '@angular/common';
import { ProductFormComponent } from '../product-form/product-form.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductFormComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent {
  private productService = inject(ProductService);
  products = this.productService.getProducts();
  selectedProduct: Product | null = null;

  onEdit(product: Product) {
    this.selectedProduct = product;
  }

  onDelete(id: number) {
    this.productService.deleteProduct(id);
  }

  onSave() {
    this.selectedProduct = null;
  }
}
