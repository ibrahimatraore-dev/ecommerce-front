import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { CartItemDTO } from 'src/app/core/models/carts/cart-item.model';

@Component({
  selector: 'app-cart',
  standalone:false,
    styleUrls: ['./carts.component.scss'],
  templateUrl: './carts.component.html'
})
export class CartComponent implements OnInit {
  cartItems: CartItemDTO[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.getCart().subscribe(data => this.cartItems = data);
  }

  remove(productId: number) {
    this.cartService.removeFromCart(productId).subscribe(() => this.ngOnInit());
  }

  update(productId: number, quantity: number) {
    this.cartService.updateQuantity(productId, quantity).subscribe(() => this.ngOnInit());
  }
  onQuantityChange(event: Event, productId: number): void {
  const input = event.target as HTMLInputElement;
  const newQuantity = Number(input.value);
  this.update(productId, newQuantity);
}

}
