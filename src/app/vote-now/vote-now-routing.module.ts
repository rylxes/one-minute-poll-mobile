import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoteNowPage } from './vote-now.page';

const routes: Routes = [
  {
    path: '',
    component: VoteNowPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoteNowPageRoutingModule {}
