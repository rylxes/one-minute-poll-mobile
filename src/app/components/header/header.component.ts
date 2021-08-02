import {Component, Input, OnInit} from '@angular/core';
import {PollsService} from "../../services/polls.service";
import {UtilitiesService} from "../../services/utilities.service";
import {Router} from "@angular/router";
import {ResultEventsService} from "../../events/result-events.service";
import {PollResultService} from "../../services/poll-result.service";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() name: any;
  @Input() search: boolean = true;
  showSearch = false;
  public rows: any;

  constructor(
    private pollsService: PollsService,
    private router: Router,
    private resultEventsService: ResultEventsService,
    private pollResultService: PollResultService,
    private utils: UtilitiesService
  ) {
  }

  searchLink = () => this.showSearch = !this.showSearch;

  getName = () => this.name ? this.name : "OnePoll";
  getItems = (e) => {
    if (e.detail.value.length > 3) {
      console.log(e.detail.value);
      this.pollsService.search(e.detail.value).subscribe(data => {
        this.rows = data['data'];
        console.log(this.rows);
        if (this.rows.length === 0) {
          this.utils.showToast('No results found !');
        } else {
          this.pollResultService.searchResult = this.rows;
          this.resultEventsService.publish({
            result: this.rows,
          });
          this.router.navigate(['/poll-search-result']);
        }
      });
    }

  };

  ngOnInit() {
  }

}
