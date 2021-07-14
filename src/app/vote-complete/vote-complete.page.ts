import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vote-complete',
  templateUrl: './vote-complete.page.html',
  styleUrls: ['./vote-complete.page.scss'],
})
export class VoteCompletePage implements OnInit {

  page = 'Polls';
  constructor() { }

  ngOnInit() {
  }

}
