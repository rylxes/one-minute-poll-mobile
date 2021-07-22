import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {UserPollsPageRoutingModule} from './user-polls-routing.module';

import {UserPollsPage} from './user-polls.page';
import {MyPollsPageModule} from "../../my-polls/my-polls.module";
import {VoteResultTemplateComponent} from "../vote-result-template/vote-result-template.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UserPollsPageRoutingModule,
  ],
  exports: [
    UserPollsPage, VoteResultTemplateComponent
  ],
  declarations: [UserPollsPage, VoteResultTemplateComponent]
})
export class UserPollsPageModule {
}
