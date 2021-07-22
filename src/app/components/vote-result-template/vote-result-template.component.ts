import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-vote-result-template',
  templateUrl: './vote-result-template.component.html',
  styleUrls: ['./vote-result-template.component.scss'],
})
export class VoteResultTemplateComponent implements OnInit {

  @Input() poll: any;
  constructor() { }

  ngOnInit() {}

}
