import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PollsService} from "../services/polls.service";
import {PollOptionsService} from "../services/poll-options.service";
import {UtilitiesService} from "../services/utilities.service";
import * as moment from "moment";
import {isNil} from 'lodash-es';

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
  hasNotClosed = true;


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
      this.canEdit = false;
      if (udetails?.id === this.poll.user_id) {
        this.canEdit = true;
      }
      if (this.utils.getValue('UUID') === this.poll.theuuid) {
        this.canEdit = true;
      }
      if(this.poll.hasVoted == 1){
        this.canEdit = false;
      }
      if (!isNil(this.poll.close_date)) {
        const mydate = moment(this.poll.close_date).startOf('day');
        this.hasNotClosed = moment().startOf('day').isSameOrBefore(mydate);
        console.log(mydate)
      }
      console.log(this.poll);
    });
  }

}
