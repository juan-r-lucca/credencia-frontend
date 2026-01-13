import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { AppRoutingModule } from "./app-routing-module";

@Component({
  selector: 'app-root',
  standalone: false,
  template: '<router-outlet></router-outlet>'
})
export class AppComponent implements OnInit {
  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Tenta restaurar a sessão ao iniciar (Refresh F5)
    this.authService.checkSession().subscribe();
  }
}