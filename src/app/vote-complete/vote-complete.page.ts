import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-vote-complete',
  templateUrl: './vote-complete.page.html',
  styleUrls: ['./vote-complete.page.scss'],
})
export class VoteCompletePage implements OnInit {

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
