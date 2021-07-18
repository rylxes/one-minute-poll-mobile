import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() name: any;

  constructor() {
  }

  getName = () => this.name ? this.name : "OnePoll";

  ngOnInit() {
  }

}
