import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-view-poll',
  templateUrl: './view-poll.page.html',
  styleUrls: ['./view-poll.page.scss'],
})
export class ViewPollPage implements OnInit {

  page = 'Polls';
  constructor() { }

  ngOnInit() {
  }

}
