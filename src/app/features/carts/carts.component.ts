import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { CartItemDTO } from 'src/app/core/models/carts/cart-item.model';

@Component({
  selector: 'app-cart',
  standalone: false,
  styleUrls: ['./carts.component.scss'],
  templateUrl: './carts.component.html'
})
export class CartComponent implements OnInit {
  cartItems: CartItemDTO[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.cartService.getCart().subscribe(data => {
      this.cartItems = data;
    });
  }

  remove(productId: number): void {
    this.cartService.removeFromCart(productId).subscribe(() => this.loadCart());
  }

  update(productId: number, quantity: number): void {
    this.cartService.updateQuantity(productId, quantity).subscribe(() => this.loadCart());
  }

  onQuantityChange(event: Event, productId: number): void {
    const input = event.target as HTMLInputElement;
    const newQuantity = Number(input.value);
    if (newQuantity > 0) {
      this.update(productId, newQuantity);
    }
  }
}
