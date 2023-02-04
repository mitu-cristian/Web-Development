import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isAuth: boolean = false;

  @Output() sidenavToggle = new EventEmitter<void>();

  constructor(private auth: AuthService) { }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }

  logout() {
    this.auth.logout();
  }

  isAuthenticated() {
    this.auth.isAuth.subscribe((value) => {
      this.isAuth = value;
    });
    console.log(this.isAuth);
    return this.isAuth;
  }

}
