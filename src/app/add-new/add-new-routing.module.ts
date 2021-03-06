import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddNewPage } from './add-new.page';

const routes: Routes = [
  {
    path: '',
    component: AddNewPage
  },
  {
    path: ':id',
    component: AddNewPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddNewPageRoutingModule {}
