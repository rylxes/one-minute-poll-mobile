import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PollSubmittedPageRoutingModule } from './poll-submitted-routing.module';

import { PollSubmittedPage } from './poll-submitted.page';
import {HomePageModule} from "../home/home.module";
import {AddNewPageModule} from "../add-new/add-new.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PollSubmittedPageRoutingModule,
        HomePageModule,
        AddNewPageModule
    ],
  declarations: [PollSubmittedPage]
})
export class PollSubmittedPageModule {}
