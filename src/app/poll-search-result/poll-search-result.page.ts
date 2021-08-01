import {Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from "../services/auth.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UtilitiesService} from "../services/utilities.service";
import {LoaderService} from "../services/loader.service";
import {IonReorderGroup, ModalController} from "@ionic/angular";
import {PollsService} from "../services/polls.service";
import {ResultEventsService} from "../events/result-events.service";

@Component({
  selector: 'app-poll-search-result',
  templateUrl: './poll-search-result.page.html',
  styleUrls: ['./poll-search-result.page.scss'],
})
export class PollSearchResultPage implements OnInit {

  page = 'Polls Search';
  driverList: any;
  public columns: any;
  public rows: any;
  vdata: any;
  SearchForm: FormGroup;

  constructor(
    private authService: AuthService,
    private utils: UtilitiesService,
    private ionLoader: LoaderService,
    private resultEventsService: ResultEventsService,
    private formBuilder: FormBuilder,
    public modalController: ModalController,
    private pollsService: PollsService
  ) {
    this.SearchForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
    this.columns = [
      {prop: 'surname', name: 'Surname'},
      {prop: 'first_name', name: 'First Name'},
      {prop: 'automobile_type', name: 'Automobile Type'}
    ];
    this.resultEventsService.getObservable().subscribe((data) => {
      this.rows = data.result;
      console.log(this.rows)
    });

  }

  public onSubmit(form) {
    console.log(this.SearchForm.value);
    this.pollsService.search(this.SearchForm.value.name).subscribe(data => {
      this.rows = data['data'];
      console.log(this.rows);
      if (this.rows.length === 0) {
        this.utils.showToast('No results found !');
      }
    });
  }

  logout() {
    this.authService.logout();
  }

  loadDriver = () => {
    this.pollsService.list().subscribe(data => {
      this.rows = data['data'];
      console.log(this.rows);
    });
  };

  hideLoader() {
    this.ionLoader.hideLoader();
  }

  ngOnInit(): void {
  }

  @ViewChild(IonReorderGroup, {static: true}) reorderGroup: IonReorderGroup;

  reorderList(ev: any) {
    console.log('Dragged from index', ev.detail.from, 'to', ev.detail.to);
    ev.detail.complete();
  }

  async presentModal(user) {
    // const modal = await this.modalController.create({
    //   component: DriverCardPage,
    //   swipeToClose: true,
    //   componentProps: {user},
    //   presentingElement: await this.modalController.getTop()
    //   // cssClass: 'my-custom-class'
    // });
    // return await modal.present();
  }

  toggleReorderGroup() {
    this.reorderGroup.disabled = !this.reorderGroup.disabled;
  }


}
