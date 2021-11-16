import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {AddNewPageRoutingModule} from './add-new-routing.module';

import {AddNewPage} from './add-new.page';
import {HomePageModule} from "../home/home.module";
import {FormatFileSizePipe} from "../pipe/format-file-size.pipe";
import {NgxErrorsModule} from "@ngspot/ngx-errors";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    AddNewPageRoutingModule,
    NgxErrorsModule,
    HomePageModule,
  ],
  exports: [],
  declarations: [AddNewPage, FormatFileSizePipe]
})
export class AddNewPageModule {
}
