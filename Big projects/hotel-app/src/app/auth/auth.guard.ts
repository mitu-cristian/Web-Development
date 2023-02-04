import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    isAuth: boolean = false;

    constructor(private authService: AuthService,
        private router: Router) { }

    canActivate(): any {
        if (this.isAuthenticated() == true)
            return true;
        else
            this.router.navigate(['/signup']);
    }

    isAuthenticated() {
        this.authService.isAuth.subscribe((value) => {
            this.isAuth = value;
        })
        console.log("Is it authenticated? " + this.isAuth)
        return this.isAuth;
    }
}