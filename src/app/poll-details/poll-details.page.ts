import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PollsService} from "../services/polls.service";
import {PollOptionsService} from "../services/poll-options.service";

@Component({
  selector: 'app-poll-details',
  templateUrl: './poll-details.page.html',
  styleUrls: ['./poll-details.page.scss'],
})
export class PollDetailsPage implements OnInit {

  page = 'Polls';
  theID: any;
  poll: any;
  pollOptions: any;

  constructor(
    private route: ActivatedRoute,
    private pollOptionsService: PollOptionsService,
    private pollsService: PollsService,
  ) {
    console.log('dd')
    this.theID = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {
    this.loadPoll();
    this.loadPollOptions();
  }

  loadPollOptions = () => {
    this.pollOptionsService.byPoll(this.theID).subscribe(data => {
      this.pollOptions = data['data'];
      console.log(this.pollOptions);
    });
  }

  loadPoll = () => {
    console.log('dd')
    this.pollsService.getOne(this.theID).subscribe(data => {
      this.poll = data['data'];
      console.log(this.poll);
    });
  }

}
