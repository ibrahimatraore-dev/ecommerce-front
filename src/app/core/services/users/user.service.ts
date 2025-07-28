// src/app/core/services/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { UserDTO } from 'src/app/core/models/users/user.model';
import { UserUpdateDTO } from 'src/app/core/models/users/user-update.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly baseUrl = `${environment.apiUrl}/users`;

  constructor(private http: HttpClient) {}

  getUser(): Observable<UserDTO> {
    return this.http.get<UserDTO>(`${this.baseUrl}`);
  }

  register(user: UserUpdateDTO): Observable<UserDTO> {
  return this.http.post<UserDTO>(`${this.baseUrl}/account`, user, {
    headers: { 'Content-Type': 'application/json' }
  });
}

  update(id: number, user: UserUpdateDTO): Observable<UserDTO> {
    return this.http.put<UserDTO>(`${this.baseUrl}/${id}`, user);
  }
}
