import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../app/service/auth.service';
import { LoginRequest } from '../app/model/auth.models';

@Component({
  selector: 'app-login',
  standalone: false,
  template: `
    <div style="padding: 2rem;">
      <h2>Login</h2>
      <input [(ngModel)]="loginData.email" placeholder="Email" style="display:block; margin: 10px 0;">
      <input [(ngModel)]="loginData.password" type="password" placeholder="Senha" style="display:block; margin: 10px 0;">
      <button (click)="onLogin()">Entrar</button>
      <p style="color: red" *ngIf="errorMessage">{{ errorMessage }}</p>
    </div>
  `
})
export class LoginComponent {
  loginData: LoginRequest = { email: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    this.authService.login(this.loginData).subscribe({
      next: () => this.router.navigate(['/home']),
      error: () => this.errorMessage = 'Credenciais Inválidas'
    });
  }
}