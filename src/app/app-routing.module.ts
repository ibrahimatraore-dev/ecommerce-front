import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { ProductsComponent } from './features/products/products.component';
import { UsersComponent } from './features/users/users.component';
import { HomeComponent } from './features/home/home.component';
import { CartComponent } from './features/carts/carts.component';
import { WishlistComponent } from './features/wishlist/wishlist.component';
import { ContactComponent } from './features/contact/contact.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: UsersComponent },
  { path: 'products', component: ProductsComponent },
  { path: 'cart', component: CartComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}