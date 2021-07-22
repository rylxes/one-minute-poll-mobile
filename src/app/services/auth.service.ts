import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {AlertController, Platform} from '@ionic/angular';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {Globals} from '../../config/globals';
import {take, map, switchMap, tap, catchError} from 'rxjs/operators';
import {UtilitiesService} from "./utilities.service";

const TOKEN_KEY = 'jwt-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: Observable<any>;
  public token: any;
  private userData = new BehaviorSubject(null);
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
  };

  constructor(private globals: Globals, private utils: UtilitiesService, private alertCtrl: AlertController, private http: HttpClient, private plt: Platform, private router: Router) {
    // this.loadStoredToken();
  }


  login = credentials => this.http.post(this.globals.url + 'login', credentials, this.httpOptions)
    .pipe(
      take(1),
      tap(_ => this.utils.log('login')),
      catchError(this.utils.handleLoginError('login', []))
    );

  codeLogin = credentials => this.http.post(this.globals.url + 'codeLogin', credentials, this.httpOptions)
    .pipe(
      take(1),
      tap(_ => this.utils.log('login')),
      catchError(this.utils.handleLoginError('login', []))
    );

  removeData = () => {
    this.utils.deleteAll();
  };


  logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    this.removeData();
    this.router.navigateByUrl('/');
  };
}
