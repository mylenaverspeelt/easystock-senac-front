import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from './models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) { }

  // Método para obter todos os produtos (tipado com Product[])
  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl);
  }

  // Método para obter um produto por ID (tipado com Product)
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  // Método para adicionar um produto (parâmetro e retorno tipados com Product)
  addProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product);
  }

  // Método para atualizar um produto existente (tipado com Product)
  updateProduct(product: Product): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${product.id}`, product);
  }

  // Método para deletar um produto (retorno tipado com void)
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  // Método para obter produtos com baixo estoque (tipado com Product[])
  getLowStockProducts(minQuantity: number): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/low-stock?minQuantity=${minQuantity}`);
  }
}
