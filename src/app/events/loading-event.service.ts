import {Injectable} from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LoadingEventService {

  private theSubject = new Subject<any>();

  constructor() {
  }

  publish(data: any) {
    this.theSubject.next(data);
  }

  getObservable(): Subject<any> {
    return this.theSubject;
  }
}
