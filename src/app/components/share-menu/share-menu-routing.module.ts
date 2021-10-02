import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShareMenuPage } from './share-menu.page';

const routes: Routes = [
  {
    path: '',
    component: ShareMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShareMenuPageRoutingModule {}
