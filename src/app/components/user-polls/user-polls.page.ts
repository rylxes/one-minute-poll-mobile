import {Component, Input, OnInit} from '@angular/core';
import {PollsService} from "../../services/polls.service";
import {LoadingService} from "../../services/loading.service";
import {PollOptionsService} from "../../services/poll-options.service";

@Component({
  selector: 'app-my-poll-list',
  templateUrl: './user-polls.page.html',
  styleUrls: ['./user-polls.page.scss'],
})
export class UserPollsPage implements OnInit {

  @Input() pollList: any;
  @Input() name: any;
  pollOptions: any;

  constructor(
    private pollsService: PollsService,
    private pollOptionsService: PollOptionsService,
    private ionLoader: LoadingService
  ) {
  }

  ngOnInit() {
    if (this.name != 'search') {
      this.loadPoll();
      //this.loadPollOptions();
    }
  }

  loadPoll = () => {
    this.pollsService.mine().subscribe(data => {
      this.pollList = data['data'];
      console.log(this.pollList);
    });
  }

  loadPollOptions = () => {
    // this.pollOptionsService.byPoll(this.theID).subscribe(data => {
    //   this.pollOptions = data['data'];
    //   console.log(this.pollOptions);
    // });
  }


}
