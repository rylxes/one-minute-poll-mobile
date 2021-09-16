import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedPollsPage } from './shared-polls.page';

const routes: Routes = [
  {
    path: '',
    component: SharedPollsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedPollsPageRoutingModule {}
