import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Product, ProductPage } from 'src/app/core/models/products/product.model';
import { ProductRequestDTO } from 'src/app/core/models/products/productRequestDTO.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private readonly baseUrl = `${environment.apiUrl}/products`;

  constructor(private http: HttpClient) {}

  getAll(keyword = '', page = 0, size = 10): Observable<ProductPage> {
    let params = new HttpParams().set('page', page).set('size', size);
    if (keyword) params = params.set('keyword', keyword);
    return this.http.get<ProductPage>(`${this.baseUrl}/all`, { params });
  }

  getById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/${id}`);
  }

  create(product: ProductRequestDTO): Observable<Product> {
    return this.http.post<Product>(`${this.baseUrl}`, product);
  }

  update(id: number, product: ProductRequestDTO): Observable<Product> {
    return this.http.put<Product>(`${this.baseUrl}/${id}`, product);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateQuantity(id: number, quantity: number): Observable<Product> {
    const params = new HttpParams().set('quantity', quantity);
    return this.http.patch<Product>(`${this.baseUrl}/${id}/quantity`, null, { params });
  }
}