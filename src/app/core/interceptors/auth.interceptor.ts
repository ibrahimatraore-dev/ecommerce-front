/**
 * Intercepteur HTTP ajoute automatiquement le token JWT
 * dans les en-têtes des requêtes HTTP privées (authentifiées).
 *
 * - Il récupère le token depuis AuthService.
 * - Il ajoute l'en-tête `Authorization: Bearer <token>` sauf pour certaines routes publiques.
 * - Il permet de centraliser la logique d'authentification pour toutes les requêtes HTTP sortantes.
 */
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}

intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  const token = this.authService.getToken();

  // Ne pas ajouter de token pour certaines routes publiques
  const isPublic = req.url.includes('/products/all');

  if (token && !isPublic) {
    const cloned = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    return next.handle(cloned);
  }

  return next.handle(req);
}
}