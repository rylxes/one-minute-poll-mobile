import {Component, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Chart, registerables} from 'chart.js';
import {PollResultService} from "../../services/poll-result.service";
import * as moment from "moment";
import {isNil} from 'lodash-es';
import * as _ from "underscore";
import {GoogleChartInterface, Ng2GoogleChartsModule} from 'ng2-google-charts';


@Component({
  selector: 'app-chart',
  templateUrl: './chart.page.html',
  styleUrls: ['./chart.page.scss'],
})
export class ChartPage implements OnInit, OnChanges {
  @ViewChild('barChart',{ static: true }) barChart: any;
  @Input() poll: any;
  @Input() pollOptions: any = [];
  colorArray: any;
  optionValues: any = [];
  bars: any;
  sum = 0;
  public barChartGG: GoogleChartInterface;
  public columnChart1: GoogleChartInterface;

  constructor(
    private pollResultService: PollResultService
  ) {
    Chart.register(...registerables);
  }

  ngOnChanges() {
   this.chart();
  }


  loadColumnChart() {

    let fullData = []

    let eachList = ['Count', 'Data'];
    fullData.push(eachList)
    let sum = 0;
    this.optionValues.forEach((value, key) => {
      let eachList = [value.value, value.count ];
      sum = sum + value.count;
      fullData.push(eachList)
    })

    console.log(fullData)

    this.columnChart1 = {
      chartType: 'ColumnChart',
      // dataTable: [
      //   ['City', '2010 Population'],
      //   ['New York City, NY', 8175000],
      //   ['Los Angeles, CA', 3792000],
      //   ['Chicago, IL', 2695000],
      //   ['Houston, TX', 2099000],
      //   ['Philadelphia, PA', 1526000]
      // ],

      dataTable: fullData,
      //opt_firstRowIsData: true,
      options: {
        title: 'Poll Count',
       // height: 600,
       // chartArea: { height: '400' },
        hAxis: {
          title: 'Data',
          minValue: 0
        },
        vAxis: {
          title: 'Count',
          viewWindow: {
            min: 0,
            max: sum
          },
          minValue: 0,
          gridlines: {
            count: 1,
            color: 'transparent'
          },

        }
      },
    };
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
      //this.createBarChart();
     // this.loadColumnChart();
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

    let fullData = []
    console.log(this.optionValues)

    let eachList = ['City', '2010 Population'];
    fullData.push(eachList)
    this.optionValues.forEach((value, key) => {
      let eachList = [value.value, value.count ];
      fullData.push(eachList)
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
