import { Component, OnInit } from '@angular/core';
import {PopoverController} from "@ionic/angular";

@Component({
  selector: 'app-share-menu',
  templateUrl: './share-menu.page.html',
  styleUrls: ['./share-menu.page.scss'],
})
export class ShareMenuPage implements OnInit {

  site;
  constructor(
    private popoverController: PopoverController) { }

  ngOnInit() {
    // this.siteInfo = this.navParams.get('site');
    console.log(this.site);
  }

  wifiSetting() {
    // code for setting wifi option in apps
    this.popoverController.dismiss();
  }

  logout() {
    // code for logout
    this.popoverController.dismiss();
  }

  eventFromPopover() {
    this.popoverController.dismiss('edupala.com');
  }


}
