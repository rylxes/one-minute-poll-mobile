import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyPollsPageRoutingModule } from './my-polls-routing.module';

import { MyPollsPage } from './my-polls.page';
import {HomePageModule} from "../home/home.module";
import {AddNewPageModule} from "../add-new/add-new.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        MyPollsPageRoutingModule,
        HomePageModule,
        AddNewPageModule
    ],
  declarations: [MyPollsPage]
})
export class MyPollsPageModule {}
