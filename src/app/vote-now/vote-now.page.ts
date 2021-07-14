import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-vote-now',
  templateUrl: './vote-now.page.html',
  styleUrls: ['./vote-now.page.scss'],
})
export class VoteNowPage implements OnInit {

  page = 'Polls';
  constructor() { }

  ngOnInit() {
  }

}
