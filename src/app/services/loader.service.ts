import {Injectable} from '@angular/core';
import {LoadingController} from "@ionic/angular";
import {LoadingEventService} from "../events/loading-event.service";

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private loading: HTMLIonLoadingElement;
  private isShowing = false;

  constructor(
    public loadingController: LoadingController,
    private loadingEventService: LoadingEventService
  ) {
  }

  // This will show then autohide the loader
  showHideAutoLoader() {

    this.loadingController.create({
      message: 'This Loader Will Auto Hide in 2 Seconds',
      cssClass:'loader',
      duration: 2000
    }).then((res) => {
      res.present();

      res.onDidDismiss().then((dis) => {
        console.log('Loading dismissed! after 2 Seconds', dis);
      });
    });

  }

  // Show the loader for infinite time
  showLoader() {
    this.loadingController.create({
      cssClass:'loader',
      message: 'Please wait...'
    }).then((res) => {
      res.present();
    }).catch(e => {
      console.error(e)
    });

  }


  public async presentLoader(message: string): Promise<void> {
    if (!this.isShowing) {
      this.loading = await this.loadingController.create({
        message
      });
      this.isShowing = true;
      return await this.loading.present();
    } else {
      // If loader is showing, only change text, won't create a new loader.
      this.isShowing = true;
      this.loading.message = message;
    }
  }

  public async dismissLoader(): Promise<void> {
    if (this.loading && this.isShowing) {
      this.isShowing = false;
      await this.loading.dismiss();
    }
  }



  // Hide the loader if already created otherwise return error
  hideLoader() {

    this.loadingController.dismiss().then((res) => {
      console.log('Loading dismissed!', res);
    }).catch((error) => {
      console.log('error', error);
    });
  }

}
