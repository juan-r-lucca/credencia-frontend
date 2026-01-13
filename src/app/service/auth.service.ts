import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { LoginRequest, UserResponse } from '../model/auth.models';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/api/auth';
  
  currentUser = signal<UserResponse | null>(null);

  constructor(private http: HttpClient) {}

  login(credentials: LoginRequest): Observable<UserResponse> {
    return this.http.post<UserResponse>(`${this.API_URL}/login`, credentials).pipe(
      tap((user) => this.currentUser.set(user))
    );
  }

  logout(): Observable<void> {
    return this.http.post<void>(`${this.API_URL}/logout`, {}).pipe(
      tap(() => this.currentUser.set(null))
    );
  }

  checkSession(): Observable<boolean> {
    return this.http.get<UserResponse>(`${this.API_URL}/me`).pipe(
      tap((user) => this.currentUser.set(user)),
      map(() => true),
      catchError(() => {
        this.currentUser.set(null);
        return of(false);
      })
    );
  }

  isLoggedIn(): boolean {
    return this.currentUser() !== null;
  }
}