import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SharedPollsPageRoutingModule } from './shared-polls-routing.module';

import { SharedPollsPage } from './shared-polls.page';
import {UserPollsPageModule} from "../user-polls/user-polls.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        SharedPollsPageRoutingModule,
        UserPollsPageModule
    ],
    exports: [
        SharedPollsPage
    ],
    declarations: [SharedPollsPage]
})
export class SharedPollsPageModule {}
