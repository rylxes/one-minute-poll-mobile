import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PostReviewPageRoutingModule } from './post-review-routing.module';

import { PostReviewPage } from './post-review.page';
import {HomePageModule} from "../home/home.module";
import {AddNewPageModule} from "../add-new/add-new.module";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        PostReviewPageRoutingModule,
        HomePageModule,
        AddNewPageModule
    ],
  declarations: [PostReviewPage]
})
export class PostReviewPageModule {}
