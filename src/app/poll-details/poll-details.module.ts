import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {PollDetailsPageRoutingModule} from './poll-details-routing.module';

import {PollDetailsPage} from './poll-details.page';
import {HomePageModule} from "../home/home.module";
import {ChartPageModule} from "../components/chart/chart.module";
import {VoteNowPageRoutingModule} from "../vote-now/vote-now-routing.module";
import {AddNewPageModule} from "../add-new/add-new.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PollDetailsPageRoutingModule,
    HomePageModule,
    ChartPageModule,
    ReactiveFormsModule,
  ],
  declarations: [PollDetailsPage]
})
export class PollDetailsPageModule {
}
