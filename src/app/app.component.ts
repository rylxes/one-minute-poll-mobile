import {Component, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {App, URLOpenListenerEvent} from '@capacitor/app';
import {UtilitiesService} from "./services/utilities.service";
import {isNil} from 'lodash-es';
import {v4 as uuidv4} from 'uuid';
import {Device} from "@ionic-native/device/ngx";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor( private device: Device, private utils: UtilitiesService, private router: Router, private zone: NgZone) {
    this.initializeApp();
    this.setHash();
  }

  // ionViewWillEnter() {
  //   this.setHash();
  // }

  setHash = () => {
    let values = this.utils.getValue('UUID')
    let deviceID = this.utils.getValue('DEVICE_ID')
    if (isNil(values)) {
      this.utils.setValue('UUID', uuidv4())
    }
    if (isNil(deviceID)) {
      this.utils.setValue('DEVICE_ID', this.device.uuid)
    }
    console.log(values)

    // this.networkInterface.getCarrierIPAddress()
    //   .then(address => console.info(`IP: ${address.ip}, Subnet: ${address.subnet}`))
    //   .catch(error => console.error(`Unable to get IP: ${error}`));
  }

  initializeApp() {
    App.addListener('appUrlOpen', (event: URLOpenListenerEvent) => {
      this.zone.run(() => {
        // Example url: https://beerswift.app/tabs/tab2
        // slug = /tabs/tab2
        const slug = event.url.split(".com").pop();
        console.log(slug)
        if (slug) {
          this.router.navigateByUrl(slug);
        }
        // If no match, do nothing - let regular routing
        // logic take over
      });
    });
  }
}
