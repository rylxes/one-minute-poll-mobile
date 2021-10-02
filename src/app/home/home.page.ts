import {Component, OnInit} from '@angular/core';
import {v4 as uuidv4} from 'uuid';
import {NavigationEnd, Router, RoutesRecognized} from "@angular/router";
import {UtilitiesService} from "../services/utilities.service";
import {PollsService} from "../services/polls.service";
import {PreviousURLService} from "../services/previous-url.service";
import {isNil} from 'lodash-es';
import {Device} from '@ionic-native/device/ngx';
import {Geolocation} from '@ionic-native/geolocation/ngx';
import {NetworkInterface} from '@ionic-native/network-interface/ngx';
import {LoadingService} from "../services/loading.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  page = 'Home';
  userDetails: any;
  long: any;
  lat: any;
  pollList: any = [];
  currentUrl;
  previousUrl;

  constructor(
    private router: Router,
    private ionLoader: LoadingService,
    private networkInterface: NetworkInterface,
    private device: Device,
    private pollsService: PollsService,
    private previousURLService: PreviousURLService,
    private geolocation: Geolocation,
    private utils: UtilitiesService
  ) {

  }

  doRefresh(event) {
    console.log('Begin async operation');
    this.pollsService.list().subscribe(data => {
      this.pollList = data['data'];
      event.target.complete();
      console.log(this.pollList);
    });
  }

  ngOnInit() {
    this.loadPoll();
    this.userDetails = this.utils.getValue('USER_DETAILS') || {};
    console.log(this.userDetails)
  }



  // loadPoll = () => {
  //   this.pollsService.list().subscribe(data => {
  //     this.pollList = data['data'];
  //     // this.utils.setValue('pollTypesList', this.pollTypesList);
  //     console.log(this.pollList);
  //   });
  // }

  loadPoll = () => {
    this.ionLoader.show();
    this.geolocation.getCurrentPosition().then((resp) => {
      console.log(resp)
      this.long = resp.coords.longitude
      this.lat = resp.coords.latitude
      let cord = {
        lat: this.lat,
        long: this.long,
      }
      this.pollsService.listAll(cord).subscribe(data => {
        this.pollList = data['data'];
        // this.utils.setValue('pollTypesList', this.pollTypesList);
        console.log(this.pollList);
      });
    }).catch((error) => {
      console.log('Error getting location', error);
    }).finally(() => {
      this.ionLoader.hide();
    });


  }
}
