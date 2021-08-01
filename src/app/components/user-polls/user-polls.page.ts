import {Component, Input, OnInit} from '@angular/core';
import {PollsService} from "../../services/polls.service";
import {LoadingService} from "../../services/loading.service";

@Component({
  selector: 'app-my-poll-list',
  templateUrl: './user-polls.page.html',
  styleUrls: ['./user-polls.page.scss'],
})
export class UserPollsPage implements OnInit {

  @Input() pollList: any;
  @Input() name: any;

  constructor(
    private pollsService: PollsService,
    private ionLoader: LoadingService
  ) {
  }

  ngOnInit() {
    if (this.name != 'search') {
      this.loadPoll();
    }
  }

  loadPoll = () => {
    this.pollsService.mine().subscribe(data => {
      this.pollList = data['data'];
      console.log(this.pollList);
    });
  }


}
