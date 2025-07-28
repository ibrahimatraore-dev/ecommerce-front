import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  cartCount = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Met à jour depuis le BehaviorSubject
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    // Force le recalcul (appel API)
    this.cartService.refreshCartCount();
  }
}
