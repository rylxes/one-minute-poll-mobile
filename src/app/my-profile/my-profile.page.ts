import { Component, OnInit } from '@angular/core';
import {filter, pairwise} from "rxjs/operators";
import {NavigationEnd, NavigationStart, Router, RoutesRecognized} from "@angular/router";

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  page = 'Profile';
  constructor(private router: Router) {
    this.router.events
      .pipe(filter((event: any) => event instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        console.log('previous url', events[0].urlAfterRedirects);
        console.log('current url', events[1].urlAfterRedirects);
      });
  }

  ngOnInit() {
  }

}
