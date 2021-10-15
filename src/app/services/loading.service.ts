import {Injectable} from '@angular/core';
import {AlertController, LoadingController} from "@ionic/angular";
import {debounceTime, distinctUntilChanged, filter, throttle} from 'rxjs/operators';
import {isNil} from 'lodash-es';
import {BehaviorSubject} from "rxjs";

enum LoadingTypeEnum {
  show,
  hide,
  message
}

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  public loading$: BehaviorSubject<{ type: LoadingTypeEnum; data?: any }> = new BehaviorSubject<any>({type: LoadingTypeEnum.hide});
  loadingState: { type: LoadingTypeEnum; data?: any } = null;
  public loading: HTMLIonLoadingElement = null;

  public async getLoader() {
    return await this.loadingController.getTop() || null;
  };

  private async showLoading(opts) {
    if (!this.loading) {
      this.loading = await this.loadingController.create(opts);
      await this.loading.present();
    }
  }

  private async hideLoading() {
    if (this.loading) {
      await this.loading?.dismiss();
    }
    this.loading = null;
  }

  private async messageLoading(m: string) {
    if (this.loading) {
      this.loading.message = m;
    }
  }

  constructor(private loadingController: LoadingController) {
    const l$ = this.loading$.pipe(distinctUntilChanged(), debounceTime(200));
    l$.pipe(filter(l => l.type === LoadingTypeEnum.show)).subscribe(l => this.showLoading(l.data));
    l$.pipe(filter(l => l.type === LoadingTypeEnum.hide)).subscribe(l => this.hideLoading());
    l$.pipe(filter(l => l.type === LoadingTypeEnum.message)).subscribe(l => this.messageLoading(l.data));
  }

  show(opts?) {
    if (isNil(opts)) {
      opts = {
        message: 'Please Wait'
      };
    }
    opts.backdropDismiss = true;
    this.loading$.next({type: LoadingTypeEnum.show, data: opts});
  }

  hide() {
    this.loading$.next({type: LoadingTypeEnum.hide});
  }

  message(m: string) {
    this.loading$.next({type: LoadingTypeEnum.message, data: m});
  }
}
