import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse
} from '@angular/common/http';
import {EMPTY, Observable, throwError} from 'rxjs';
import {map, catchError, finalize, tap, retryWhen, delay} from 'rxjs/operators';
import {
  Router
} from '@angular/router';
import {ToastController} from '@ionic/angular';
import {Injectable} from '@angular/core';
import {LoadingService} from "../app/services/loading.service";
import {UtilitiesService} from "../app/services/utilities.service";

const TOKEN_KEY = 'jwt-token';


@Injectable()
export class TokenInterceptor implements HttpInterceptor {
  constructor(private router: Router,
              private loading: LoadingService,
              private utilitiesService: UtilitiesService,
              public toastController: ToastController) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this.loading.show();
    const token = localStorage.getItem(TOKEN_KEY);

    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: 'Bearer ' + token
        }
      });
    }

    if (!request.headers.has('Content-Type')) {
      request = request.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      });
    }

    request = request.clone({
      headers: request.headers.set('Accept', 'application/json')
    });

    return next.handle(request).pipe(
      map((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          console.log('event--->>>', event);
        }
        return event;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          if (error.error.success === false) {
            this.presentToast('Login failed');
          } else {
            this.router.navigate(['login']);
          }
        }
        this.utilitiesService.showErrorToast(error.error.errors);
        return throwError(error);
      }),
      // retryWhen(err => {
      //   let retries = 1;
      //   return err.pipe(
      //     delay(1000),
      //     tap(() => {
      //       // this.showRetryToast(retries);
      //     }),
      //     map(error => {
      //       if (retries++ === 3) {
      //         throw error; // Now retryWhen completes
      //       }
      //       return error;
      //     })
      //   );
      // }),
      catchError(err => EMPTY),
      finalize(() => this.loading.hide())
    );
  }

  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000,
      position: 'top'
    });
    toast.present();
  }

}
