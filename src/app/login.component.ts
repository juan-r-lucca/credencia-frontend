import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../app/service/auth.service';
import { LoginRequest } from '../app/model/auth.models';

@Component({
  selector: 'app-login',
  standalone: false,
  template: `
    <div style="padding: 2rem; max-width: 400px; margin: auto;">
      <app-c-input
        [(ngModel)]="loginData.email"
        [icon]="'person'"
        [fill]="false"
        [label]="'Email'"
        [placeholder]="'usuario@email.com'"
        [hint]="'Insira um e-mail válido'">
      </app-c-input>

      <app-c-input
        [(ngModel)]="loginData.password"
        [type]="'password'"
        [fill]="false"
        [label]="'Senha'"
        [placeholder]="'Digite sua senha'"
        [hint]="'Insira uma senha válida'">
      </app-c-input>

      <div style="margin-top: 1rem;">
        <button mat-raised-button color="primary" (click)="onLogin()">Entrar</button>
      </div>

      <p style="color: red; margin-top: 10px;" *ngIf="errorMessage">{{ errorMessage }}</p>
    </div>
  `
})
export class LoginComponent {
  loginData: LoginRequest = { email: '', password: '' };
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if(!this.loginData.email || !this.loginData.password) {
        this.errorMessage = 'Preencha todos os campos';
        return;
    }

    this.authService.login(this.loginData).subscribe({
      next: () => this.router.navigate(['/home']),
      error: () => this.errorMessage = 'Credenciais Inválidas'
    });
  }
}