import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FiveStarBarChartPage } from './five-star-bar-chart.page';

const routes: Routes = [
  {
    path: '',
    component: FiveStarBarChartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FiveStarBarChartPageRoutingModule {}
