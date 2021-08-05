import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PollsService} from "../services/polls.service";
import {PollOptionsService} from "../services/poll-options.service";
import {UtilitiesService} from "../services/utilities.service";

@Component({
  selector: 'app-poll-details',
  templateUrl: './poll-details.page.html',
  styleUrls: ['./poll-details.page.scss'],
})
export class PollDetailsPage implements OnInit {

  page = 'Polls';
  theID: any;
  canEdit = false;
  poll: any;
  pollOptions: any;

  constructor(
    private route: ActivatedRoute,
    private utils: UtilitiesService,
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

      let udetails = this.utils.getValue('USER_DETAILS');

      console.log(udetails?.id)
      console.log(this.poll.user_id)
      this.canEdit = false;
      if(udetails?.id === this.poll.user_id){
        this.canEdit = true;
      }

      console.log(this.poll);
    });
  }

}
