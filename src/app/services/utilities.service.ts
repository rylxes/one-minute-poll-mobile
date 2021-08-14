import {Injectable} from '@angular/core';
import {AlertController, ModalController, ToastController} from '@ionic/angular';
import {Observable, of, throwError} from 'rxjs';
import {Storage} from '@capacitor/storage';
import {EventsService} from '../events/events.service';
import {ErrorEventService} from '../events/error-event.service';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  public error: string | null = null;
  public showSpinner = false;

  constructor(
    private alertCtrl: AlertController,
    public events: EventsService,
    private modalCtrl: ModalController,
    public errorEvent: ErrorEventService,
    private toastController: ToastController
  ) {
  }


  async createModal(component, componentProps?, cssClass?): Promise<HTMLIonModalElement> {
    const modal = await this.modalCtrl.create({
      component,
      cssClass,
      componentProps,
      backdropDismiss: true
    });
    return modal;
  }

  public log(message: string) {
    console.log(message);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleUploadError(error: any): Observable<never> {
    const errMsg = error.message ? error.message : error.toString();
    this.events.publishSomeData({
      showSpinner: this.showSpinner
    });
    this.errorEvent.publish({
      hasError: true
    });
    this.error = errMsg;
    return throwError(errMsg);
  }


  handleLoginError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {


      this.events.publishSomeData({
        showSpinner: this.showSpinner
      });
      this.errorEvent.publish({
        hasError: true
      });

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      this.showInfoError(error.error.message);

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }


  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {


      this.events.publishSomeData({
        showSpinner: this.showSpinner
      });

      this.errorEvent.publish({
        hasError: true
      });

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      this.showError(error.error.errors);

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  saveKeys = (key) => {
    const keys = this.getValue('APP_KEYS') || [];
    keys.push(key);
    localStorage.setItem('APP_KEYS', JSON.stringify(keys));
  };

  deleteAll = () => {
    const keys = this.getValue('APP_KEYS') || [];
    keys.map((element) => {
      localStorage.removeItem(element);
    });
  };


  remove(key) {
    localStorage.removeItem(key);
  }


  setValue(key, value) {
    this.saveKeys(key);
    localStorage.setItem(key, JSON.stringify(value));
  }

  getValue(key) {
    return JSON.parse(localStorage.getItem(key));
  }


  // async setValue(key, value) {
  //   //console.log(value);
  //   await Storage.set({
  //     key,
  //     value: JSON.stringify(value),
  //   });
  // }

  // async getValue(key) {
  //   const {value} = await Storage.get({key});
  //   return value;
  // }

  async showUploadToast(ok: boolean): Promise<void> {
    if (ok) {
      const toast = await this.toastController.create({
        message: 'Upload successful',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    } else {
      const toast = await this.toastController.create({
        message: 'Upload failed',
        duration: 3000,
        position: 'top'
      });
      toast.present();
    }
  }

  async showErrorToast(text) {
    const toast = await this.toastController.create({
      color: 'danger',
      duration: 2000,
      message: text,
      //showCloseButton: true
    });

    await toast.present();
  }

  async showToast(text) {
    const toast = await this.toastController.create({
      color: 'primary',
      duration: 2000,
      message: text,
      //showCloseButton: true
    });

    await toast.present();
  }

  public async showError(text) {
    const alert = await this.alertCtrl.create({
      header: 'Whoops!',
      message: text,
      buttons: ['OK']
    });
    await alert.present();
  }


  public async showInfoError(text) {
    const alert = await this.alertCtrl.create({
      header: 'Info!',
      message: text,
      buttons: ['OK']
    });
    await alert.present();
  }
}
