import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {MyPollsPageRoutingModule} from './my-polls-routing.module';

import {MyPollsPage} from './my-polls.page';
import {UserPollsPageModule} from "../components/user-polls/user-polls.module";
import {UserPollsPage} from "../components/user-polls/user-polls.page";
import {HomePageModule} from "../home/home.module";


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyPollsPageRoutingModule,
    UserPollsPageModule,
    HomePageModule
  ],
  exports: [
    MyPollsPage,
  ],
  declarations: [MyPollsPage]
})
export class MyPollsPageModule {
}
