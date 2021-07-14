import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoteCompletePageRoutingModule } from './vote-complete-routing.module';

import { VoteCompletePage } from './vote-complete.page';
import {HomePageModule} from "../home/home.module";
import {AddNewPageModule} from "../add-new/add-new.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        VoteCompletePageRoutingModule,
        HomePageModule,
        AddNewPageModule
    ],
  declarations: [VoteCompletePage]
})
export class VoteCompletePageModule {}
