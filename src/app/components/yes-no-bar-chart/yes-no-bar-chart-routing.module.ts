import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { YesNoBarChartPage } from './yes-no-bar-chart.page';

const routes: Routes = [
  {
    path: '',
    component: YesNoBarChartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class YesNoBarChartPageRoutingModule {}
