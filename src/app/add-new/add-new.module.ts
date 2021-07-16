import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {AddNewPageRoutingModule} from './add-new-routing.module';

import {AddNewPage} from './add-new.page';
import {HomePageModule} from "../home/home.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddNewPageRoutingModule,
    HomePageModule,
  ],
  exports: [
  ],
  declarations: [AddNewPage]
})
export class AddNewPageModule {
}
