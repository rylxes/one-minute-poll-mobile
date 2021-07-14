import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PollSubmittedPage } from './poll-submitted.page';

const routes: Routes = [
  {
    path: '',
    component: PollSubmittedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PollSubmittedPageRoutingModule {}
