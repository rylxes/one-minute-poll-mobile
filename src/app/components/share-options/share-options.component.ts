import { Component, OnInit } from '@angular/core';
import {PopoverController} from "@ionic/angular";

@Component({
  selector: 'app-share-options',
  templateUrl: './share-options.component.html',
  styleUrls: ['./share-options.component.scss'],
})
export class ShareOptionsComponent implements OnInit {

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
