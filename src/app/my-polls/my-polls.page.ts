import {Component, OnInit} from '@angular/core';
import {PollsService} from "../services/polls.service";
import {LoaderService} from "../services/loader.service";

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

  ngOnInit() {

  }


}
