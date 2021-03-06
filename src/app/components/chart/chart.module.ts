import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {ChartPageRoutingModule} from './chart-routing.module';

import {ChartPage} from './chart.page';
import {Ng2GoogleChartsModule} from "ng2-google-charts";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Ng2GoogleChartsModule,
    ChartPageRoutingModule
  ],
  exports: [
    ChartPage
  ],
  declarations: [ChartPage]
})
export class ChartPageModule {
}
