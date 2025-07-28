import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/products/product.service';
import { Product } from 'src/app/core/models/products/product.model';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist/wishlist.service';
import { AuthService } from 'src/app/core/services/auth/auth.service';

@Component({
  selector: 'app-home',
  standalone: false,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  keyword = '';
  isAdmin = false;
  isLoggedIn = false;
  currentUser: any = null;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadProducts();

    this.isLoggedIn = this.authService.isLoggedIn();
    this.currentUser = this.authService.getCurrentUserEmail()
      ? { emailAddress: this.authService.getCurrentUserEmail() }
      : null;

    this.isAdmin = this.currentUser?.emailAddress === 'admin@admin.com';
  }

  loadProducts(): void {
    this.productService.getAll(this.keyword, 0, 6).subscribe({
      next: (data) => {
        this.products = data.content;
      }
    });
  }

  onSearch(): void {
    this.loadProducts();
  }

  addToCart(productId: number): void {
    this.cartService.addToCart(productId, 1).subscribe();
  }

  addToWishlist(productId: number): void {
    this.wishlistService.addToWishlist(productId).subscribe();
  }

  deleteProduct(id: number): void {
    this.productService.delete(id).subscribe(() => this.loadProducts());
  }

  editProduct(product: Product): void {
    // À adapter selon ta logique : redirection ou modal
    console.log('Modifier produit', product);
  }

  logout(): void {
    this.authService.logout();
    window.location.href = '/login';
  }
}
