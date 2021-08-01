import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PollSearchResultPageRoutingModule} from './poll-search-result-routing.module';

import {PollSearchResultPage} from './poll-search-result.page';
import {HomePageModule} from "../home/home.module";
import {UserPollsPageModule} from "../components/user-polls/user-polls.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PollSearchResultPageRoutingModule,
    HomePageModule,
    UserPollsPageModule
  ],
  declarations: [PollSearchResultPage]
})
export class PollSearchResultPageModule {
}
