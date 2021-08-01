import {Component, OnInit} from '@angular/core';
import {v4 as uuidv4} from 'uuid';
import {NavigationEnd, Router, RoutesRecognized} from "@angular/router";
import {UtilitiesService} from "../services/utilities.service";
import {PollsService} from "../services/polls.service";
import {LoadingService} from "../services/loading.service";
import {PreviousURLService} from "../services/previous-url.service";
import {isNil} from 'lodash-es';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  page = 'Home';
  userDetails: any;
  pollList: any = [];
  currentUrl;
  previousUrl;

  constructor(
    private router: Router,
    private pollsService: PollsService,
    private previousURLService: PreviousURLService,
    private ionLoader: LoadingService,
    private utils: UtilitiesService
  ) {

  }

  ngOnInit() {
    this.setHash();
    this.loadPoll();
    this.userDetails = this.utils.getValue('USER_DETAILS') || {};
  }

  setHash = () => {
    let values = this.utils.getValue('UUID')
    if (isNil(values)) {
      this.utils.setValue('UUID', uuidv4())
    }
    console.log(values)
  }


  loadPoll = () => {
    this.pollsService.list().subscribe(data => {
      this.pollList = data['data'];
      // this.utils.setValue('pollTypesList', this.pollTypesList);
      console.log(this.pollList);
    });
  }
}
