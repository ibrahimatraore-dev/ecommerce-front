import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WishlistItemDTO } from 'src/app/core/models/wishlist/wishlist-item.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private readonly baseUrl = `${environment.apiUrl}/wishlist`;

  constructor(private http: HttpClient) {}

  getWishlist(): Observable<WishlistItemDTO[]> {
    return this.http.get<WishlistItemDTO[]>(`${this.baseUrl}`);
  }

  addToWishlist(productId: number): Observable<void> {
    const params = new HttpParams().set('productId', productId);
    return this.http.post<void>(`${this.baseUrl}/add`, null, { params });
  }

  removeFromWishlist(productId: number): Observable<void> {
    const params = new HttpParams().set('productId', productId);
    return this.http.delete<void>(`${this.baseUrl}/remove`, { params });
  }
  
}
