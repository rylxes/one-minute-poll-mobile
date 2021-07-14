import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyPollsPage } from './my-polls.page';

const routes: Routes = [
  {
    path: '',
    component: MyPollsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyPollsPageRoutingModule {}
