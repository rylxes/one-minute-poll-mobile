import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ShareMenuPageRoutingModule } from './share-menu-routing.module';

import { ShareMenuPage } from './share-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ShareMenuPageRoutingModule
  ],
  declarations: [ShareMenuPage]
})
export class ShareMenuPageModule {}
