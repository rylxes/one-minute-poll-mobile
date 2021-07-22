import {Component, OnInit} from '@angular/core';
import {PollsService} from "../services/polls.service";

@Component({
  selector: 'app-my-polls',
  templateUrl: './my-polls.page.html',
  styleUrls: ['./my-polls.page.scss'],
})
export class MyPollsPage implements OnInit {
  page = 'Polls';
  pollList: any;

  constructor(private pollsService: PollsService) {
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
