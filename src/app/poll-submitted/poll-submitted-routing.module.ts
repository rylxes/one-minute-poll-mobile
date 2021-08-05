import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PollSubmittedPage} from './poll-submitted.page';
import {VoteCompletePage} from "../vote-complete/vote-complete.page";

const routes: Routes = [
  {
    path: '',
    component: PollSubmittedPage
  },
  {
    path: ':id',
    component: PollSubmittedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PollSubmittedPageRoutingModule {
}
