import { Component, OnInit } from '@angular/core';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Product } from '../models/Product.model'; 
import { CommonModule } from '@angular/common';
import { LowStockAlertComponent } from "../low-stock-alert/low-stock-alert.component";

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, LowStockAlertComponent],
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  lowStockProducts: Product[] = []; // Produtos com estoque baixo

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAllProducts().subscribe((data: Product[]) => {
      // Ordena os produtos por quantidade do maior para o menor
      this.products = data.sort((a, b) => b.quantity - a.quantity);

      // Filtra produtos com quantidade menor que 5
      this.lowStockProducts = this.products.filter(product => product.quantity < 5);
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
