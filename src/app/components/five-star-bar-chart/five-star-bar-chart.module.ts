import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FiveStarBarChartPageRoutingModule } from './five-star-bar-chart-routing.module';

import { FiveStarBarChartPage } from './five-star-bar-chart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FiveStarBarChartPageRoutingModule
  ],
  declarations: [FiveStarBarChartPage]
})
export class FiveStarBarChartPageModule {}
