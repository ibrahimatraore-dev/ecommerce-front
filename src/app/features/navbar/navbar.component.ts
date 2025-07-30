import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth/auth.service';
import { Router } from '@angular/router';
import { CartService } from 'src/app/core/services/cart/cart.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  cartCount: number = 0;
  private subscription: Subscription = new Subscription();

  constructor(
    public auth: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.subscription = this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });

    this.cartService.getCart().subscribe();
  }

  logout() {
    this.auth.logout();
    this.cartService.resetCartCount();                   // réinitialiser le badge
    this.router.navigate(['/login']);
  }

  isAdmin(): boolean {
    return this.auth.getCurrentUserEmail() === 'admin@admin.com';
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}