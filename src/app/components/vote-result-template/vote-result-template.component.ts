import {Component, Input, OnInit} from '@angular/core';
import * as _ from "underscore";

@Component({
  selector: 'app-vote-result-template',
  templateUrl: './vote-result-template.component.html',
  styleUrls: ['./vote-result-template.component.scss'],
})
export class VoteResultTemplateComponent implements OnInit {

  @Input() poll: any;
  public optionValues: any;

  constructor() {
  }

  ngOnInit() {
    console.log('ddd')
    this.calculate();
  }

  calculate = () => {
    let options = [];
    let sum = 0;
    this.poll.pollCounters.forEach((each) => {
      let res = _.first(each.counters)
      let opt = {
        'name': each.name,
        'value': each.value,
        'count': res?.pivot?.value || 0,
      }
      sum += opt.count;
      options = [...options, opt]
    })

    options.forEach((each) => {
      let perc = (each.count / sum) * 100;
      each.perc = perc;
    })

    this.optionValues = options;
    // let res = _.first(this.poll.pollCounters.counters)
    //  console.log(this.poll.pollCounters)
    console.log(sum)
    console.log(options)
  }

}
