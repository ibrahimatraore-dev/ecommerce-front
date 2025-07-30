/**
 * Service de gestion du panier côté front.
 *
 * - Utilise HttpClient pour communiquer avec le backend via l’API `/cart`
 * - Fournit des méthodes pour : ajouter, supprimer, modifier une quantité
 * - Gère un compteur (`cartCount$`) observé par la navbar pour afficher le nombre total d’articles
 */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CartItemDTO } from 'src/app/core/models/carts/cart-item.model';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private readonly baseUrl = `${environment.apiUrl}/cart`;

  private cartCountSubject = new BehaviorSubject<number>(0);          //  BehaviorSubject contient la valeur actuelle du panier.
  cartCount$ = this.cartCountSubject.asObservable();                  //  Un observable auquel s’abonne le composant NavbarComponent pour afficher le badge en temps réel.

  constructor(private http: HttpClient) {}

  getCart(): Observable<CartItemDTO[]> {
    return this.http.get<CartItemDTO[]>(`${this.baseUrl}`).pipe(
      tap(items => {
        const count = items.reduce((sum, item) => sum + item.quantity, 0);
        this.cartCountSubject.next(count);
      })
    );
  }

  addToCart(productId: number, quantity: number): Observable<void> {
    const params = new HttpParams()
      .set('productId', productId)
      .set('quantity', quantity);
    return this.http.post<void>(`${this.baseUrl}/add`, null, { params });
  }

  removeFromCart(productId: number): Observable<void> {
    const params = new HttpParams().set('productId', productId);
    return this.http.delete<void>(`${this.baseUrl}/remove`, { params });
  }

  updateQuantity(productId: number, quantity: number): Observable<void> {
    const params = new HttpParams()
      .set('productId', productId)
      .set('quantity', quantity);
    return this.http.put<void>(`${this.baseUrl}/update`, null, { params });
  }

  resetCartCount(): void {
    this.cartCountSubject.next(0);
  }
}
