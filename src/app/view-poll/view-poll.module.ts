import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ViewPollPageRoutingModule } from './view-poll-routing.module';

import { ViewPollPage } from './view-poll.page';
import {HomePageModule} from "../home/home.module";
import {AddNewPageModule} from "../add-new/add-new.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ViewPollPageRoutingModule,
        HomePageModule,
        AddNewPageModule
    ],
  declarations: [ViewPollPage]
})
export class ViewPollPageModule {}
