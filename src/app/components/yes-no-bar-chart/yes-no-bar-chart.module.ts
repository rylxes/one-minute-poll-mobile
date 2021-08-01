import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { YesNoBarChartPageRoutingModule } from './yes-no-bar-chart-routing.module';

import { YesNoBarChartPage } from './yes-no-bar-chart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    YesNoBarChartPageRoutingModule
  ],
  declarations: [YesNoBarChartPage]
})
export class YesNoBarChartPageModule {}
