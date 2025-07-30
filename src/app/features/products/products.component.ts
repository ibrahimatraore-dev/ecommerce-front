/**
 * Composant responsable de l'affichage des produits.
 *
 * - Affiche la liste paginée avec recherche
 * - Permet d'ajouter un produit au panier ou à la wishlist
 * - Utilise `ProductService`, `CartService`, `WishlistService`
 * - Affiche un message de confirmation via `MatSnackBar`
 */
import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/products/product.service';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist/wishlist.service';
import { Product } from 'src/app/core/models/products/product.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-products',
  standalone: false,
  styleUrls: ['./products.component.scss'],
  templateUrl: './products.component.html'
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  keyword = '';
  page = 0;
  size = 10;
  totalPages = 0;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getAll(this.keyword, this.page, this.size).subscribe(data => {
      this.products = data.content;
      this.totalPages = data.totalPages;
    });
  }

  addToCart(id: number) {
    this.cartService.addToCart(id, 1).subscribe(() => {
      this.cartService.getCart().subscribe(); // met à jour le badge
      this.snackBar.open('Produit ajouté au panier', 'Fermer', { duration: 3000 });
    });
  }

  addToWishlist(id: number) {
    this.wishlistService.addToWishlist(id).subscribe(() => {
      this.snackBar.open('Ajouté à la wishlist', 'Fermer', { duration: 3000 });
    });
  }

  search() {
    this.page = 0;
    this.loadProducts();
  }

  nextPage() {
    if (this.page < this.totalPages - 1) {
      this.page++;
      this.loadProducts();
    }
  }

  previousPage() {
    if (this.page > 0) {
      this.page--;
      this.loadProducts();
    }
  }
}
