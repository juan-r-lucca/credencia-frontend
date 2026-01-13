import { Component } from '@angular/core';
import { AuthService } from '../app/service/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: false,
  template: `
    <div *ngIf="authService.currentUser() as user" style="padding: 2rem;">
      <h1>Bem vindo, {{ user.nome }}</h1>
      <p>Perfil: {{ user.roles }}</p>
      
      <button (click)="testarApi()">Test safe request</button>
      <br><br>
      <button (click)="logout()">Sair</button>
    </div>
  `
})
export class HomeComponent {
  constructor(
    public authService: AuthService, 
    private router: Router,
    private http: HttpClient
  ) {}

  testarApi() {
    this.http.get('http://localhost:8080/api/servicos').subscribe({
      next: (res) => alert('Sucesso!'),
      error: (err) => alert('Erro: ' + err.status)
    });
  }

  logout() {
    this.authService.logout().subscribe(() => window.location.reload());
  }
}