import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { A2EBarChartPageRoutingModule } from './a2-ebar-chart-routing.module';

import { A2EBarChartPage } from './a2-ebar-chart.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    A2EBarChartPageRoutingModule
  ],
  declarations: [A2EBarChartPage]
})
export class A2EBarChartPageModule {}
