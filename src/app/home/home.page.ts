import {Component, OnInit} from '@angular/core';
import {PreviousURLService} from "../services/previous-url.service";
import {filter, pairwise} from "rxjs/operators";
import {NavigationEnd, Router, RoutesRecognized} from "@angular/router";
import {UtilitiesService} from "../services/utilities.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  page = 'Home';
  userDetails: any;
  currentUrl;
  previousUrl;

  constructor(
    private router: Router,
    private utils: UtilitiesService
  ) {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        console.log(event)
      });
    this.router.events
      .pipe(filter((event: any) => event instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        // this.previousUrl = events[0].urlAfterRedirects;
        // this.currentUrl = events[1].urlAfterRedirects;

        console.log('previous url', events[0].urlAfterRedirects);
        console.log('current url', events[1].urlAfterRedirects);
      });
  }

  ngOnInit() {
    this.userDetails = this.utils.getValue('USER_DETAILS') || {};
  }

}
