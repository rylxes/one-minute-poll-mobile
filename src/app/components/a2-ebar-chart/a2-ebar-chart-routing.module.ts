import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { A2EBarChartPage } from './a2-ebar-chart.page';

const routes: Routes = [
  {
    path: '',
    component: A2EBarChartPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class A2EBarChartPageRoutingModule {}
