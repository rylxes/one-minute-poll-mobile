import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';

import {IonicModule} from '@ionic/angular';

import {HomePageRoutingModule} from './home-routing.module';

import {HomePage} from './home.page';
import {FooterComponent} from "../components/footer/footer.component";
import {HeaderComponent} from "../components/header/header.component";
import {SearchComponent} from "../components/search/search.component";
import {UserPollsPage} from "../components/user-polls/user-polls.page";
import {MyPollsPageModule} from "../my-polls/my-polls.module";
import {UserPollsPageModule} from "../components/user-polls/user-polls.module";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    UserPollsPageModule
  ],
  exports: [
    FooterComponent,
    HeaderComponent,
    SearchComponent,
  ],
  declarations: [HomePage, FooterComponent, HeaderComponent, SearchComponent]
})
export class HomePageModule {
}
