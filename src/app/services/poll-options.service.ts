import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Globals} from "../../config/globals";
import {UtilitiesService} from "./utilities.service";
import {Platform} from "@ionic/angular";
import {Router} from "@angular/router";
import {catchError, take, tap} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class PollOptionsService {


  public user: Observable<any>;
  public token: any;
  public logName = 'Poll Option';
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


  create = credentials => this.http.post(this.globals.url + 'poll_options', credentials, this.httpOptions)
    .pipe(
      take(1),
      tap(_ => this.utils.log(this.logName)),
      catchError(this.utils.handleError(this.logName, []))
    );


  getOne = (id) => this.http.get(this.globals.url + 'polls/' + id)
    .pipe(
      take(1),
      tap(_ => this.utils.log(this.logName)),
      catchError(this.utils.handleError(this.logName, []))
    );


  byPoll = (id) => this.http.get(this.globals.url + 'poll_options/byPoll/' + id)
    .pipe(
      take(1),
      tap(_ => this.utils.log(this.logName)),
      catchError(this.utils.handleError(this.logName, []))
    );

  search = (name) => this.http.post(this.globals.url + 'polls/search', {name})
    .pipe(
      take(1),
      tap(_ => this.utils.log(this.logName)),
      catchError(this.utils.handleError(this.logName, []))
    );

}
