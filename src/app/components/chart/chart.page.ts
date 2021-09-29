import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Chart, registerables} from 'chart.js';
import {PollResultService} from "../../services/poll-result.service";
import * as moment from "moment";
import {isNil} from 'lodash-es';
import * as _ from "underscore";


@Component({
  selector: 'app-chart',
  templateUrl: './chart.page.html',
  styleUrls: ['./chart.page.scss'],
})
export class ChartPage implements OnInit, OnChanges {
  @ViewChild('barChart',{ static: true }) barChart: any;
  @Input() poll: any;
  colorArray: any;
  optionValues: any = [];
  bars: any;
  sum = 0;

  constructor(private pollResultService: PollResultService) {
    Chart.register(...registerables);
  }

  ngOnChanges() {
    this.chart();
  }

  ngAfterViewInit(): void {
    //this.barChart.nativeElement.focus();
  }

  chart () {
    if (!_.isEmpty(this.poll)) {
      console.log(this.poll)
      this.pollResultService.calculate(this.poll);
      this.optionValues = this.pollResultService.optionValues;
      this.sum = this.pollResultService.sum;
      this.createBarChart();
    }
  }

  ngOnInit() {
    this.chart();
  }

  generateColorArray(num) {
    this.colorArray = [];
    for (let i = 0; i < num; i++) {
      this.colorArray.push('#' + Math.floor(Math.random() * 16777215).toString(16));
    }
  }


  createBarChart() {
   // console.log(this.barChart.nativeElement)
    this.generateColorArray(5)
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
      segmentShowStroke: false,
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
      },
      elements: {
        bar: {
          borderWidth: 0,
          borderColor: "#000000",
          backgroundColor: "#000000"
        }
      }
    }
    // if (this.poll?.pollType?.id == 2) {
    //   options['indexAxis'] = 'y';
    //   options.scales['x'] = options.scales.y;
    //   options.scales.y = null;
    //   //options.scales.x
    // }

    var datasets1 = {
      label: 'Poll Count',
      data: theData,
      backgroundColor: this.colorArray,
      borderColor: [
        "#E9DAC6",
        "#CBCBCB",
        "#D88569",
        "#E4CDA2",
        "#89BC21"
      ],
      borderWidth: [0, 0, 0, 0, 0],
      //borderWidth: 0,
      drawOnChartArea: false,
      drawBorder: false,
      drawTicks: false,
      lineWidth: 0,
      //drawBorder: false,
      //drawOnChartArea: false,
      //drawTicks: false,
      // backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
      // // borderColor: 'rgb(38, 194, 129)',// array should have same number of elements as number of dataset
      // borderColor: 'rgba(0,0,0,0)',// array should have same number of elements as number of dataset
      // borderWidth: 0,
    }

    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      options,
      data: {
        labels: values,
        datasets: [
          datasets1
        ]
      }
    });
    // Chart.defaults.global.elements.arc.borderWidth = 0;
  }

}
