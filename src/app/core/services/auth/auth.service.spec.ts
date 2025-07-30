/**
 * Tests unitaires pour le service AuthService.
 *
 * - Vérifie l'instanciation du service
 * - Teste la gestion du token (set/get/remove)
 * - Teste l'état de connexion (isLoggedIn)
 * - Teste le décodage du token JWT (getCurrentUser / getCurrentUserEmail)
 */

import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';

fdescribe('AuthService', () => {
  let service: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    localStorage.clear(); 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should store and retrieve token from localStorage', () => {
    service.setToken('abc123');
    expect(service.getToken()).toBe('abc123');
  });

  it('should return true when logged in (token present)', () => {
    service.setToken('abc123');
    expect(service.isLoggedIn()).toBeTrue();
  });

  it('should return false when not logged in (no token)', () => {
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('should remove token on logout', () => {
    service.setToken('abc123');
    service.logout();
    expect(service.getToken()).toBeNull();
    expect(service.isLoggedIn()).toBeFalse();
  });

  it('should decode JWT and return current user', () => {
    // simulate token with payload: { "sub": "user@test.com" }
    const fakePayload = { sub: 'user@test.com', role: 'USER' };
    const base64Payload = btoa(JSON.stringify(fakePayload));
    const fakeToken = `header.${base64Payload}.signature`;

    service.setToken(fakeToken);
    const user = service.getCurrentUser();

    expect(user).toBeTruthy();
    expect(user?.emailAddress).toBe('user@test.com');
  });

  it('should return current user email from decoded token', () => {
    const payload = { sub: 'admin@alten.com' };
    const fakeToken = `xxx.${btoa(JSON.stringify(payload))}.yyy`;

    service.setToken(fakeToken);
    expect(service.getCurrentUserEmail()).toBe('admin@alten.com');
  });

  it('should return null for malformed token', () => {
    service.setToken('invalid.token.value');
    expect(service.getCurrentUser()).toBeNull();
  });
});