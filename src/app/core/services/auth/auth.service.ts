/**
 * Service d'authentification front-end.
 *
 * - Permet de se connecter via l'API `/token`
 * - Stocke le token JWT dans `localStorage`
 * - Fournit des méthodes pour vérifier la connexion, récupérer l'utilisateur courant, se déconnecter
 */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly baseUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<{ token: string }> {
    return this.http.post<{ token: string }>(
      `${this.baseUrl}/token`,
      { emailAddress: email, password }
    );
  }

  setToken(token: string): void {
    localStorage.setItem('auth_token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  logout(): void {
    localStorage.removeItem('auth_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  getCurrentUser(): { emailAddress: string; [key: string]: any } | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return {
        emailAddress: payload.sub,
        ...payload
      };
    } catch (e) {
      return null;
    }
  }

  getCurrentUserEmail(): string | null {
    return this.getCurrentUser()?.emailAddress || null;
  }
}
