import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/products/product.service';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist/wishlist.service';
import { Product } from 'src/app/core/models/products/product.model';

@Component({
  selector: 'app-products',
  standalone:false,
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
    private wishlistService: WishlistService
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
    this.cartService.addToCart(id, 1).subscribe();
  }

  addToWishlist(id: number) {
    this.wishlistService.addToWishlist(id).subscribe();
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
