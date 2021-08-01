import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PollSearchResultPage } from './poll-search-result.page';

const routes: Routes = [
  {
    path: '',
    component: PollSearchResultPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PollSearchResultPageRoutingModule {}
