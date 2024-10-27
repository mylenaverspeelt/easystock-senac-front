import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { Router } from '@angular/router';
import { Product } from '../models/Product.model'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], // Adicione ReactiveFormsModule
  templateUrl: './add-edit-product.component.html',
  styleUrls: ['./add-edit-product.component.css']
})
export class AddEditProductComponent implements OnInit {
  productForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Inicializa o formulário reativo
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]]
    });
  }

  // Método para salvar o produto
  saveProduct(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value as Product;
      this.productService.addProduct(productData).subscribe(() => {
        this.router.navigate(['/product-list']);
      });
    }
  }
}
