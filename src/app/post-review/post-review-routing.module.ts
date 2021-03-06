import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PostReviewPage} from './post-review.page';
import {AddNewPage} from "../add-new/add-new.page";

const routes: Routes = [
  {
    path: '',
    component: PostReviewPage
  },
  {
    path: ':id',
    component: PostReviewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostReviewPageRoutingModule {
}
