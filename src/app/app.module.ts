import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

// Modules
import { AuthModule } from './features/auth/auth.module';

// Composants
import { ProductsComponent } from './features/products/products.component';
import { UsersComponent } from './features/users/users.component';
import { CartsComponent } from './features/carts/carts.component';
import { WishlistComponent } from './features/wishlist/wishlist.component';
import { NavbarComponent } from './features/navbar/navbar.component';
import { HomeComponent } from './features/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    UsersComponent,
    CartsComponent,
    WishlistComponent,
    NavbarComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,           
    ReactiveFormsModule,
    HttpClientModule,
    AuthModule
  ],
  providers: [
   provideClientHydration(withEventReplay()),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
