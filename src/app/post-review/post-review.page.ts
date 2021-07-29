import {Component, OnInit} from '@angular/core';
import {UtilitiesService} from "../services/utilities.service";
import {MenuController} from "@ionic/angular";
import {Router} from "@angular/router";
import {DomSanitizer} from "@angular/platform-browser";
import {PollsService} from "../services/polls.service";

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
  pollTypesList: any;
  isAuth = false;
  page = '';

  constructor(
    private router: Router,
    private pollsService: PollsService,
    private readonly sanitizer: DomSanitizer,
    private utils: UtilitiesService,
    public menuCTL: MenuController
  ) {
    this.menuCTL.enable(true);
  }

  submit = () => {

    // 'title' => 'required|string|max:255',
    //   'options.A' => 'nullable|string|max:255',
    //   'options.B' => 'nullable|string|max:255',
    //   'options.C' => 'nullable|string|max:255',
    //   'options.D' => 'nullable|string|max:255',
    //   'options.E' => 'nullable|string|max:255',
    //   'category_id' => 'required|integer',
    //   'poll_type_id' => 'required|integer',
    //   'open_to_everyone' => 'required',
    //   'question' => 'required|string',
    //   'close_date' => 'nullable',


    let toSubmit = {
      title: this.pollList.title,
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
    this.pollsService.create(toSubmit).subscribe(res => {
      console.log(res);
      this.utils.showToast('Poll Created !');
      if (!this.isAuth) {
        this.router.navigate(['/home']);
      }
      this.router.navigate(['/my-polls']);
    });

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

    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64, ' + this.image.base64String);
    console.log(this.pollList)
    console.log(this.category)
  }

}
