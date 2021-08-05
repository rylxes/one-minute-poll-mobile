import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-poll-submitted',
  templateUrl: './poll-submitted.page.html',
  styleUrls: ['./poll-submitted.page.scss'],
})
export class PollSubmittedPage implements OnInit {
  page = 'Polls';
  theID: any;

  constructor(
    private route: ActivatedRoute,
  ) {
    this.theID = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
  }

}
