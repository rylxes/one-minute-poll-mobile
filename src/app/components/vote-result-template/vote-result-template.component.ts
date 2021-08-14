import {Component, Input, OnInit} from '@angular/core';

import {PollResultService} from "../../services/poll-result.service";

@Component({
  selector: 'app-vote-result-template',
  templateUrl: './vote-result-template.component.html',
  styleUrls: ['./vote-result-template.component.scss'],
})
export class VoteResultTemplateComponent implements OnInit {

  @Input() poll: any;
  public optionValues: any;

  constructor(private pollResultService: PollResultService) {
  }

  ngOnInit() {

    this.calculate();
  }

  calculate = () => {
    this.pollResultService.calculate(this.poll);
    this.optionValues = this.pollResultService.optionValues;
    console.log(this.poll)
    console.log(this.optionValues)
  }

}
