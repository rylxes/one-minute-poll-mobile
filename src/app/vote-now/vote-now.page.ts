import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PollsService} from "../services/polls.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MenuController} from "@ionic/angular";
import * as moment from "moment";
import * as _ from "lodash";
import {UtilitiesService} from "../services/utilities.service";
import {VoteService} from "../services/vote.service";
import {PollOptionsService} from "../services/poll-options.service";
import {PollResultService} from "../services/poll-result.service";
import {isNil} from 'lodash-es';
import {Chart, registerables} from 'chart.js';

@Component({
  selector: 'app-vote-now',
  templateUrl: './vote-now.page.html',
  styleUrls: ['./vote-now.page.scss'],
})

export class VoteNowPage implements OnInit {
  @ViewChild('barChart') barChart;

  page = 'Polls';
  theID: any;
  hasNotExpired = true;
  poll: any = {};
  pollOptions: any = {};
  optionValues: any = [];
  sum: any = 0;
  public data: FormGroup;

  bars: any;
  colorArray: any;

  voteNow = {
    vote: '',
  };

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
    Chart.register(...registerables);
    this.theID = this.route.snapshot.paramMap.get('id');
    this.data = this.formBuilder.group({
      vote: ['', [Validators.required]],
    });
    this.menuCTL.enable(true);
  }


  clickOptions = (event) => {
    console.log(this.data.value.answerType)
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
      this.router.navigate(['/vote-complete', vote?.poll_id]);
    });
  }

  clickOptions2 = (id) => {
    console.log(id)
    let formData = {
      ...this.data.value, ...{
        vote: id
      }
    }
    this.data.setValue(formData);
  }

  ngOnInit() {
    this.loadPoll();

  }

  createBarChart() {
    // var keys = _.invert(this.poll.pollCounters, true);
    let values = []
    let theData = []
    this.optionValues.forEach((value, key) => {
      values.push(value.value)
      theData.push(value.count)
    })
    // var keys = _.filter(this.poll.pollCounters);
    // console.log(keys)

    var options = {
      //indexAxis: 'y',
      scales: {
        y: {
          title: {
            display: true,
            text: 'Count'
          },
          min: 0,
          ticks: {
            stepSize: 1
          }
        }
      }
    }
    // if (this.poll?.pollType?.id == 2) {
    //   options['indexAxis'] = 'y';
    //   options.scales['x'] = options.scales.y;
    //   options.scales.y = null;
    //   //options.scales.x
    // }
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      options,
      data: {
        labels: values,
        datasets: [{
          label: 'Poll Count',
          data: theData,
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
          borderWidth: 1
        }]
      }
    });
  }

  calculate = () => {
    if (!isNil(this.poll)) {
      this.pollResultService.calculate(this.poll);
      this.optionValues = this.pollResultService.optionValues;
      this.sum = this.pollResultService.sum;
      this.createBarChart();

      if (!isNil(this.poll.close_date)) {
        const mydate = moment(this.poll.close_date).startOf('day');
        this.hasNotExpired = moment().startOf('day').isSameOrBefore(mydate);
        console.log(mydate)
      }
      console.log(this.hasNotExpired)


      // console.log(moment().startOf('day').isSameOrBefore(mydate))
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
