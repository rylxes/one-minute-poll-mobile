import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddNewPageRoutingModule } from './add-new-routing.module';

import { AddNewPage } from './add-new.page';
import {HomePageModule} from "../home/home.module";
import {HeaderComponent} from "../components/header/header.component";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddNewPageRoutingModule,
    HomePageModule
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [AddNewPage, HeaderComponent]
})
export class AddNewPageModule {}
