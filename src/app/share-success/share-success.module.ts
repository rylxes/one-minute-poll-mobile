import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ShareSuccessPageRoutingModule} from './share-success-routing.module';

import {ShareSuccessPage} from './share-success.page';
import {HomePageModule} from "../home/home.module";
import {UserPollsPageModule} from "../components/user-polls/user-polls.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareSuccessPageRoutingModule,
    HomePageModule,
    UserPollsPageModule
  ],
  declarations: [ShareSuccessPage]
})
export class ShareSuccessPageModule {
}
