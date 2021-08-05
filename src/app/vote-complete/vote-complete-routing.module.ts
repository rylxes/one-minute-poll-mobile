import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VoteCompletePage } from './vote-complete.page';
import {AddNewPage} from "../add-new/add-new.page";

const routes: Routes = [
  {
    path: '',
    component: VoteCompletePage
  },
  {
    path: ':id',
    component: VoteCompletePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VoteCompletePageRoutingModule {}
