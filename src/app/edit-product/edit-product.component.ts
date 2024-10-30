import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ProductService } from '../product.service';
import { ActivatedRoute, Router } from '@angular/router'; // Importa ActivatedRoute
import { Product } from '../models/Product.model'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule], 
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {
  productForm!: FormGroup;
  productId!: number; // Armazena o ID do produto
  product!: Product; // Armazena os dados do produto

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute, // Injeta ActivatedRoute para obter o ID da rota
    private router: Router
  ) {}

  ngOnInit(): void {
    // Inicializa o formulário
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]]
    });

    // Obtém o ID do produto da URL
    this.productId = +this.route.snapshot.paramMap.get('id')!;

    // Carrega os dados do produto
    this.loadProductData(this.productId);
  }

  // Carrega os dados do produto e preenche o formulário
  loadProductData(id: number): void {
    this.productService.getProductById(id).subscribe((product: Product) => {
      this.product = product;
      this.productForm.patchValue({
        name: product.name,
        price: product.price,
        quantity: product.quantity
      });
    });
  }

  // Salva o produto
  saveProduct(): void {
    if (this.productForm.valid) {
      const productData = this.productForm.value as Product;
      productData.id = this.productId; // Define o ID para editar o produto existente

      this.productService.addProduct(productData).subscribe(() => {
        this.router.navigate(['/products']);
      });
    }
  }
}
