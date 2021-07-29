import {Component, OnInit} from '@angular/core';
import {PollsService} from "../../services/polls.service";
import {LoadingService} from "../../services/loading.service";

@Component({
  selector: 'app-my-poll-list',
  templateUrl: './user-polls.page.html',
  styleUrls: ['./user-polls.page.scss'],
})
export class UserPollsPage implements OnInit {

  pollList: any;

  constructor(
    private pollsService: PollsService,
    private ionLoader: LoadingService
  ) {
  }

  ngOnInit() {
    this.loadPoll();
  }

  loadPoll = () => {
    this.pollsService.mine().subscribe(data => {
      this.pollList = data['data'];
      // this.utils.setValue('pollTypesList', this.pollTypesList);
      console.log(this.pollList);
    });
  }


}
