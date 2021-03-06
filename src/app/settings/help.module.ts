import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {HelpPageRoutingModule} from './help-routing.module';

import {HelpPage} from './help.page';
import {HomePageModule} from "../home/home.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    HelpPageRoutingModule,
    HomePageModule
  ],
  declarations: [HelpPage]
})
export class HelpPageModule {
}
