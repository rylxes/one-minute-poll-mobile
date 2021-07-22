
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {take, map} from 'rxjs/operators';
import {AlertController} from '@ionic/angular';
import {AuthService} from '../app/services/auth.service';
const TOKEN_KEY = 'jwt-token';
@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private auth: AuthService, private alertCtrl: AlertController) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
        const token = localStorage.getItem(TOKEN_KEY);
        return token != null ;
    }

}
