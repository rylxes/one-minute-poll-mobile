import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {VoteNowPageRoutingModule} from './vote-now-routing.module';

import {VoteNowPage} from './vote-now.page';
import {HomePageModule} from "../home/home.module";
import {AddNewPageModule} from "../add-new/add-new.module";
import {ChartPageModule} from "../components/chart/chart.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    VoteNowPageRoutingModule,
    HomePageModule,
    AddNewPageModule,
    ChartPageModule
  ],
  declarations: [VoteNowPage]
})
export class VoteNowPageModule {
}
