import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Globals} from '../../config/globals';
import {UtilitiesService} from './utilities.service';
import {Platform} from '@ionic/angular';
import {catchError, take, tap} from 'rxjs/operators';
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class PollsService {

  public user: Observable<any>;
  public token: any;
  public logName = 'Polls';
  private userData = new BehaviorSubject(null);
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    })
  };

  constructor(private globals: Globals, private utils: UtilitiesService, private http: HttpClient, private plt: Platform, private router: Router) {
    // this.loadStoredToken();
  }


  create = credentials => this.http.post(this.globals.url + 'polls', credentials, this.httpOptions)
    .pipe(
      take(1),
      tap(_ => this.utils.log(this.logName)),
      catchError(this.utils.handleError(this.logName, []))
    );

  list = () => this.http.get(this.globals.url + 'polls')
    .pipe(
      take(1),
      tap(_ => this.utils.log(this.logName)),
      catchError(this.utils.handleError(this.logName, []))
    );

  mine = () => this.http.post(this.globals.url + 'polls/mine',{})
    .pipe(
      take(1),
      tap(_ => this.utils.log(this.logName)),
      catchError(this.utils.handleError(this.logName, []))
    );

}
