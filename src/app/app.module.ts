import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouteReuseStrategy} from '@angular/router';

import {IonicModule, IonicRouteStrategy} from '@ionic/angular';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {Globals} from "../config/globals";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {TokenInterceptor} from "../interceptors/token.interceptor";
import {UserPollsPageModule} from "./components/user-polls/user-polls.module";
import {DatePipe} from "@angular/common";
import {Device} from '@ionic-native/device/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { NetworkInterface } from '@ionic-native/network-interface/ngx';
import {SocialSharing} from "@ionic-native/social-sharing/ngx";
import {Ng2GoogleChartsModule} from "ng2-google-charts";
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule, UserPollsPageModule],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    Device,
    Geolocation,
    SocialSharing,
    NetworkInterface,
    DatePipe,
    {provide: RouteReuseStrategy, useClass: IonicRouteStrategy}, Globals],
  bootstrap: [AppComponent],
})
export class AppModule {
}
