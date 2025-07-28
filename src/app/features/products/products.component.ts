import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/core/services/products/product.service';
import { Product } from 'src/app/core/models/products/product.model';
import { ProductRequestDTO } from 'src/app/core/models/products/productRequestDTO.model';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { WishlistService } from 'src/app/core/services/wishlist/wishlist.service';

@Component({
  selector: 'app-products',
  standalone: false,
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  total = 0;
  page = 0;
  size = 10;
  keyword = '';
  error = '';

  newProduct: ProductRequestDTO = this.resetProductForm();
  quantities: { [productId: number]: number } = {};

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private wishlistService: WishlistService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productService.getAll(this.keyword, this.page, this.size).subscribe({
      next: (data) => {
        this.products = data.content;
        this.total = data.totalElements;
      },
      error: () => {
        this.error = 'Erreur lors du chargement des produits.';
      }
    });
  }

  onSearch(): void {
    this.page = 0;
    this.loadProducts();
  }

  onPageChange(newPage: number): void {
    this.page = newPage;
    this.loadProducts();
  }

  createProduct(): void {
    this.productService.create(this.newProduct).subscribe({
      next: () => {
        this.loadProducts();
        this.newProduct = this.resetProductForm();
      },
      error: () => (this.error = 'Erreur lors de la création du produit.')
    });
  }

updateProduct(product: ProductRequestDTO): void {
  if (product.id === undefined) {
    this.error = 'ID du produit manquant pour la mise à jour.';
    return;
  }

  this.productService.update(product.id, product).subscribe({
    next: () => {
      this.loadProducts();
      this.newProduct = this.resetProductForm();
    },
    error: () => this.error = `Erreur lors de la mise à jour du produit ${product.id}`
  });
}
  deleteProduct(id: number): void {
    this.productService.delete(id).subscribe({
      next: () => this.loadProducts(),
      error: () => (this.error = `Erreur lors de la suppression du produit ${id}`)
    });
  }

  changeQuantity(id: number, quantity: number): void {
    this.productService.updateQuantity(id, quantity).subscribe({
      next: () => this.loadProducts(),
      error: () => (this.error = `Erreur lors de la mise à jour de la quantité du produit ${id}`)
    });
  }

  addToCart(productId: number): void {
    const quantity = this.quantities[productId] || 1;
    this.cartService.addToCart(productId, quantity).subscribe(() => this.loadProducts());
  }

  removeFromCart(productId: number): void {
    this.cartService.removeFromCart(productId).subscribe({
      next: () => this.loadProducts(),
      error: () => (this.error = 'Erreur lors de la suppression du panier.')
    });
  }

  addToWishlist(productId: number): void {
    this.wishlistService.addToWishlist(productId).subscribe();
  }

  removeFromWishlist(productId: number): void {
    this.wishlistService.removeFromWishlist(productId).subscribe({
      next: () => this.loadProducts(),
      error: () => (this.error = 'Erreur lors de la suppression de la wishlist.')
    });
  }

  createOrUpdateProduct(): void {
    if (this.newProduct.id && this.newProduct.id !== 0) {
      this.updateProduct(this.newProduct);
    } else {
      this.createProduct();
    }
  }

  editProduct(product: Product): void {
    this.newProduct = { ...product };
  }

  cancelEdit(): void {
    this.newProduct = this.resetProductForm();
  }

  private resetProductForm(): ProductRequestDTO {
    return {
      code: '',
      name: '',
      description: '',
      image: '',
      category: '',
      price: 0,
      quantity: 0,
      internalReference: '',
      shellId: 0,
      inventoryStatus: '',
      rating: 0
    };
  }
}
