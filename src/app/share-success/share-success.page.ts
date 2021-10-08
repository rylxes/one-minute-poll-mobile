import {Component, OnInit} from '@angular/core';
import {EventsService} from "../events/events.service";
import {ActivatedRoute} from "@angular/router";
import {PollsService} from "../services/polls.service";

@Component({
  selector: 'app-share-success',
  templateUrl: './share-success.page.html',
  styleUrls: ['./share-success.page.scss'],
})
export class ShareSuccessPage implements OnInit {

  page = 'Share Success';
  pollResult: any
  pollList = [];
  theID: any

  constructor(
    private eventsService: EventsService,
    private pollsService: PollsService,
    private route: ActivatedRoute,
  ) {
    this.eventsService.getObservable().subscribe((data) => {
      this.pollResult = data.pollResult;
      console.log(this.pollResult)
    });
    this.theID = this.route.snapshot.paramMap.get('id');
    console.log(this.theID)
  }

  ngOnInit() {
    this.eventsService.getObservable().subscribe((data) => {
      this.pollResult = data.pollResult;
      console.log(this.pollResult)
    });
    this.loadPoll();
  }

  loadPoll = () => {
    this.pollsService.getOne(this.theID).subscribe(data => {
      this.pollList = [];
      this.pollList.push(data['data']);
      console.log(this.pollList);
    });
  }

}
