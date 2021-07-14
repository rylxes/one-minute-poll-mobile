import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewPollPage } from './view-poll.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPollPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPollPageRoutingModule {}
