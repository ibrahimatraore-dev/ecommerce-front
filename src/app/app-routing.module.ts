import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { ProductsComponent } from './features/products/products.component';
import { UsersComponent } from './features/users/users.component';
import { HomeComponent } from './features/home/home.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
    { path: 'register', component: UsersComponent },
  { path: '', component: HomeComponent },  
  { path: 'products', component: ProductsComponent },
  { path: '', redirectTo: '/products', pathMatch: 'full' },
  { path: '**', redirectTo: '/products' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
