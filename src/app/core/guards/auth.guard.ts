/**
 * AuthGuard utilisé pour protéger les routes nécessitant une authentification.
 *
 * - Empêche l'accès aux pages si l'utilisateur n'est pas connecté.
 * - Vérifie l'état de connexion via `AuthService.isLoggedIn()`.
 * - Redirige vers la page de login si l'utilisateur est non authentifié.
 * - S'utilise avec `canActivate` dans le routeur Angular.
 */
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.auth.isLoggedIn()) {
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}