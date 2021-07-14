import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-poll-submitted',
  templateUrl: './poll-submitted.page.html',
  styleUrls: ['./poll-submitted.page.scss'],
})
export class PollSubmittedPage implements OnInit {
  page = 'Polls';
  constructor() { }

  ngOnInit() {
  }

}
