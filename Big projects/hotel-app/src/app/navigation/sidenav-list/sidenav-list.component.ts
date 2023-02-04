import { Component, EventEmitter, Output } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.css']
})
export class SidenavListComponent {

  isAuth: boolean = false;

  @Output() closeSidenav = new EventEmitter<void>();

  constructor(private auth: AuthService) { }

  onClose() {
    this.closeSidenav.emit();
  }

  logout() {
    this.auth.logout();
  }

  isAuthenticated() {
    this.auth.isAuth.subscribe((value) => {
      this.isAuth = value;
    })
    return this.isAuth;
  }

}
