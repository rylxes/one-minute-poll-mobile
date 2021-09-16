import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShareSuccessPage } from './share-success.page';

const routes: Routes = [
  {
    path: '',
    component: ShareSuccessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShareSuccessPageRoutingModule {}
