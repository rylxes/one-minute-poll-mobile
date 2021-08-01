import {Component, Input, OnInit} from '@angular/core';
import {UtilitiesService} from "../../services/utilities.service";

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent implements OnInit {

  isAuth = false;
  @Input() pageName;
  @Input() showAdd: boolean = true;

  constructor(
    private utils: UtilitiesService
  ) {
  }

  ngOnInit() {
    this.isAuth = this.utils.getValue('IS_AUTH');
  }

  loadPage = (page) => {

  }

}
