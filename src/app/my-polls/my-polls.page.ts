import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-my-polls',
  templateUrl: './my-polls.page.html',
  styleUrls: ['./my-polls.page.scss'],
})
export class MyPollsPage implements OnInit {
  page = 'Polls';
  pollList: any;

  constructor() {
  }

  doInfinite(event) {
    console.log(event)
  }

  ngOnInit() {

  }


}
