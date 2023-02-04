import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  isAuth = new Subject<boolean>();

  constructor(private fireauth: AngularFireAuth,
    private router: Router) { }

  // login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(() => {
      localStorage.setItem('token', 'true');
      this.router.navigate(['booking']);
      this.isAuth.next(true);
    }, err => {
      alert('Something went wrong');
      this.router.navigate(['login'])
    })
  }

  // signup method
  signup(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(() => {
      this.router.navigate(['booking']);
      this.isAuth.next(true);
    }, err => {
      alert(err.message);
      this.router.navigate(['signup']);
    })
  }

  // logout method
  logout() {
    this.fireauth.signOut().then(() => {
      localStorage.removeItem('token');
      this.router.navigate(['login'])
      this.isAuth.next(false);
    }, err => {
      alert(err.message);

    })
  }
}
