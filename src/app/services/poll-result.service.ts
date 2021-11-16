import {Injectable} from '@angular/core';
import * as _ from "underscore";

@Injectable({
  providedIn: 'root'
})
export class PollResultService {
  public searchResult = {}
  public optionValues: any;
  public sum: any = 0;

  constructor() {
  }

  calculate = (poll) => {
    let options = [];
    let sum = 0;





    poll.pollCounters.forEach((each) => {

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
      let perc = (each.count / sum) * 100 || 0;
      each.perc = perc;
    })


    //console.log(options)
    this.optionValues = options;
    this.sum = sum;

  }
}
