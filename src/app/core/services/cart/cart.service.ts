import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItemDTO} from 'src/app/core/models/carts/cart-item.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly baseUrl = `${environment.apiUrl}/cart`;

  constructor(private http: HttpClient) {}

  private cartCountSubject = new BehaviorSubject<number>(0);
    cartCount$ = this.cartCountSubject.asObservable();

  getCart(): Observable<CartItemDTO[]> {
    return this.http.get<CartItemDTO[]>(`${this.baseUrl}`);
  }

addToCart(productId: number, quantity: number): Observable<void> {
  const params = new HttpParams().set('productId', productId).set('quantity', quantity);
  return this.http.post<void>(`${this.baseUrl}/add`, null, { params }).pipe(
    tap(() => this.refreshCartCount())
  );
}

removeFromCart(productId: number): Observable<void> {
  const params = new HttpParams().set('productId', productId);
  return this.http.delete<void>(`${this.baseUrl}/remove`, { params }).pipe(
    tap(() => this.refreshCartCount())
  );
}

updateQuantity(productId: number, quantity: number): Observable<void> {
  const params = new HttpParams().set('productId', productId).set('quantity', quantity);
  return this.http.put<void>(`${this.baseUrl}/update`, null, { params }).pipe(
    tap(() => this.refreshCartCount())
  );
}


  refreshCartCount(): void {
  this.getCart().subscribe((items) => {
    const count = items.reduce((sum, item) => sum + item.quantity, 0);
    this.cartCountSubject.next(count);
  });
}
}
