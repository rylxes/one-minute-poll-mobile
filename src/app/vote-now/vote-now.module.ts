import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VoteNowPageRoutingModule } from './vote-now-routing.module';

import { VoteNowPage } from './vote-now.page';
import {HomePageModule} from "../home/home.module";
import {AddNewPageModule} from "../add-new/add-new.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        VoteNowPageRoutingModule,
        HomePageModule,
        AddNewPageModule
    ],
  declarations: [VoteNowPage]
})
export class VoteNowPageModule {}
