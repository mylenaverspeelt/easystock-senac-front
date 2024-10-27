import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Product } from '../models/Product.model'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule], // Certifique-se de que o CommonModule está incluído
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe((data: Product[]) => {
      this.products = data.sort((a, b) => a.id - b.id);
    });
  }

  editProduct(product: Product): void {
    this.router.navigate(['/edit-product', product.id]);
  }

  addProduct(): void {
    this.router.navigate(['/add-product']);
  }

  deleteProduct(id: number): void {
    if (confirm('Deseja realmente deletar este produto?')) {
      this.productService.deleteProduct(id).subscribe(() => this.loadProducts());
    }
  }
}
