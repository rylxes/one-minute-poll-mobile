import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PollsService} from "../services/polls.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MenuController} from "@ionic/angular";
import * as moment from "moment";
import {UtilitiesService} from "../services/utilities.service";
import {VoteService} from "../services/vote.service";
import {PollOptionsService} from "../services/poll-options.service";
import {PollResultService} from "../services/poll-result.service";
import {isNil} from 'lodash-es';


@Component({
  selector: 'app-vote-now',
  templateUrl: './vote-now.page.html',
  styleUrls: ['./vote-now.page.scss'],
})

export class VoteNowPage implements OnInit {

  page = 'Polls';
  theID: any;
  poll: any = {};
  pollOptions: any = {};
  optionValues: any = [];
  sum: any = 0;
  public data: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    public menuCTL: MenuController,
    private utils: UtilitiesService,
    private pollsService: PollsService,
    private pollResultService: PollResultService,
    private pollOptionsService: PollOptionsService,
    private voteService: VoteService,
  ) {
    this.theID = this.route.snapshot.paramMap.get('id');
    this.data = this.formBuilder.group({
      vote: ['', [Validators.required]],
    });
    this.menuCTL.enable(true);
  }

  public onSubmit(pageForm) {

    console.log(this.data.value);

    let toSubmit = {
      uuid: this.utils.getValue('UUID'),
      poll_id: this.theID,
      value: this.data.value.vote,
    };

    this.voteService.create(toSubmit).subscribe(res => {
      let vote = res['data'];
      console.log(res)
      this.router.navigate(['/vote-complete', vote?.id]);
    });

  }

  ngOnInit() {
    this.loadPoll();
  }

  calculate = () => {
    if (!isNil(this.poll)) {
      this.pollResultService.calculate(this.poll);
      this.optionValues = this.pollResultService.optionValues;
      this.sum = this.pollResultService.sum;
    }
  }


  loadPoll = () => {
    this.pollsService.getOne(this.theID).subscribe(data => {
      this.poll = data['data'];
      this.calculate();
      console.log(this.poll);
    });
  }

}
