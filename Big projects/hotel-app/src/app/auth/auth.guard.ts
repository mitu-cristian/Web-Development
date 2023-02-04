import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

    isAuth: boolean = false;

    constructor(private authService: AuthService,
        private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): any {
        if (this.isAuthenticated())
            return true;
        else
            this.router.navigate(['/signup']);
    }

    // isAuthenticated() {
    //     this.authService.isAuth.subscribe((value) => {
    //         this.isAuth = value;
    //     })
    //     console.log("Is it authenticated? " + this.isAuth)
    //     return this.isAuth;
    // }

    isAuthenticated() {
        this.authService.isAuth.subscribe((value) => {
            this.isAuth = value;
        });
        console.log(this.isAuth);
        return this.isAuth;
    }
}