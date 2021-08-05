import {Component, OnInit} from '@angular/core';
import {UtilitiesService} from "../services/utilities.service";
import {MenuController} from "@ionic/angular";
import {ActivatedRoute, Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {PollsService} from "../services/polls.service";
import {EventsService} from "../events/events.service";
import {isNil} from 'lodash-es';


@Component({
  selector: 'app-post-review',
  templateUrl: './post-review.page.html',
  styleUrls: ['./post-review.page.scss'],
})
export class PostReviewPage implements OnInit {

  pollList: any;
  categoriesList: any;
  showA2E: any;
  photo: any;
  image: any;
  category: any;
  pollType: any;
  theID: any;
  pollTypesList: any;
  isAuth = false;
  isEdit = false;
  page = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private pollsService: PollsService,
    private eventsService: EventsService,
    private readonly sanitizer: DomSanitizer,
    private utils: UtilitiesService,
    public menuCTL: MenuController
  ) {
    this.theID = this.route.snapshot.paramMap.get('id');
    this.menuCTL.enable(true);
  }

  submit = () => {


    let toSubmit = {
      title: this.pollList.title,
      uuid: this.utils.getValue('UUID'),
      category_id: this.pollList.category,
      poll_type_id: this.pollList.answerType,
      open_to_everyone: this.pollList.openToAll,
      question: this.pollList.question,
      close_date: this.pollList.closeDate,
      file: this.photo.changingThisBreaksApplicationSecurity,
      email: this.pollList.emailField,
      options: undefined

    };
    const options = {
      A: this.pollList.A,
      B: this.pollList.B,
      C: this.pollList.C,
      D: this.pollList.D,
      E: this.pollList.E
    };

    if (this.showA2E) {
      toSubmit.options = options;
    }
    if (this.isEdit) {
      this.pollsService.edit(toSubmit, this.theID).subscribe(res => {
        console.log(res);
        this.utils.showToast('Poll Editted !');
        this.eventsService.publishSomeData({
          completed: true
        });
        this.router.navigate(['/home']);
      });
    } else {
      this.pollsService.create(toSubmit).subscribe(res => {
        console.log(res);
        this.utils.showToast('Poll Created !');
        this.eventsService.publishSomeData({
          completed: true
        });
        const response = res['data']
        this.router.navigate(['/poll-submitted', response.id]);
      });

    }

    console.log(toSubmit);
  }


  ngOnInit() {
    this.pollList = this.utils.getValue('toSubmit');
    this.image = this.utils.getValue('theImage');
    this.showA2E = this.utils.getValue('showA2E');
    this.pollTypesList = this.utils.getValue('pollTypesList');
    this.categoriesList = this.utils.getValue('categoriesList');
    this.isAuth = this.utils.getValue('IS_AUTH');
    this.category = this.categoriesList.find(input => input.id == this.pollList.category);
    this.pollType = this.pollTypesList.find(input => input.id == this.pollList.answerType);

    console.log(this.theID)
    this.isEdit = false;
    if (!isNil(this.theID)) {
      this.isEdit = true;
    }
    console.log(this.image?.base64String)
    try {
      this.photo = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64, ' + this.image.base64String);
    } catch (e) {
      this.photo = this.utils.getValue('PHOTO_URL');
    }
    console.log(this.pollList)
    console.log(this.category)
  }

}
