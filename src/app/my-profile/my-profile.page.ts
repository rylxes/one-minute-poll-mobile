import {Component, OnInit} from '@angular/core';
import {filter, pairwise} from "rxjs/operators";
import {NavigationEnd, NavigationStart, Router, RoutesRecognized} from "@angular/router";
import {AlertController} from "@ionic/angular";
import {AuthService} from "../services/auth.service";
import {UtilitiesService} from "../services/utilities.service";
import {PollsService} from "../services/polls.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment";
import {UsersService} from "../services/users.service";
import {isNil} from 'lodash-es';
import * as _ from "underscore";
import {CategoriesService} from "../services/categories.service";
import {ErrorEventService} from "../events/error-event.service";

const TOKEN_KEY = 'jwt-token';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  page = 'Profile';
  userDetails: any;
  category: any;
  categoriesList: any;
  email: any;
  isAuth: any;
  authError: boolean = false;
  public data: FormGroup;

  constructor(
    private router: Router,
    private categoriesService: CategoriesService,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    public errorEvent: ErrorEventService,
    private usersService: UsersService,
    private pollsService: PollsService,
    private utils: UtilitiesService,
    private alertCtrl: AlertController
  ) {
    //this.utils.setValue('IS_AUTH', false);
    this.data = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
      interest: [''],
      gender: [''],
      lastName: [''],
      firstName: [''],
    });
    this.router.events
      .pipe(filter((event: any) => event instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        console.log('previous url', events[0].urlAfterRedirects);
        console.log('current url', events[1].urlAfterRedirects);
      });

    this.errorEvent.getObservable().subscribe((data) => {
      if (data?.hasError && data?.statusCode == '509') {
        this.authError = true;
        this.isAuth = false;
        this.utils.setValue('IS_AUTH', false);
        console.log(data.statusCode)
      }
    });

  }

  public onSubmitForm(data) {
    console.log(this.data.value);
    this.usersService.edit(this.data.value, 1).subscribe(res => {
      console.log(res)
      if (res) {
        this.utils.setValue('USER_DETAILS', res['data']);
        this.utils.showToast('profile edited !');
      }
    });
  }


  loadCategories = () => {
    this.categoriesService.list().subscribe(data => {
      this.categoriesList = data['data'];
      console.log(this.categoriesList);
    });
  };

  ngOnInit() {
    this.loadCategories();
    this.isAuth = this.utils.getValue('IS_AUTH');
    this.userDetails = this.utils.getValue('USER_DETAILS') || {};
    if (!_.isEmpty(this.userDetails)) {
      console.log(this.userDetails)
      //console.log(JSON.parse(this.userDetails?.interest))

      let interest = '';
      try {
        interest = !_.isEmpty(this.userDetails?.interest) ? JSON.parse(this.userDetails?.interest) || 1 : 1
      } catch (e) {
        interest = !_.isEmpty(this.userDetails?.interest) ? this.userDetails?.interest || 1 : 1
      }

      let form = {
        name: this.userDetails?.name,
        email: this.userDetails?.email,
        lastName: this.userDetails?.lastName || null,
        firstName: this.userDetails?.firstName || null,
        gender: this.userDetails?.gender || null,
        interest
      }
      console.log(form)
      this.data.setValue(form);
    }
    console.log(this.userDetails);
  }


  authenticate = async () => {
    console.log(this.email)
    this.auth.authenticate({
      email: this.email,
      uuid: this.utils.getValue('UUID')
    }).subscribe(res => {
      if (res['success']) {
        this.presentPrompt()
      }
    });
  }
  presentPrompt = async () => {
    let alert = await this.alertCtrl.create({
      header: 'Login',
      inputs: [
        {
          name: 'code',
          placeholder: 'Code'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
         // cssClass: 'btn btn-primary btn-cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Authenticate',
         // cssClass: 'btn btn-primary btn-share',
          handler: data => {
            this.onSubmit(data);
          }
        }
      ]
    });
    alert.present();
  };


  public onSubmit(data) {
    this.auth.codeLogin({
      code: data.code,
      uuid: this.utils.getValue('UUID')
    }).subscribe(res => {
      // @ts-ignore
      this.utils.setValue('USER_DETAILS', res['data'].user);
      this.userDetails = res['data'].user;
      this.utils.setValue('IS_AUTH', true);
      console.log(res['data'].user);
      const token = res['data'].accessToken;
      if (token) {
        localStorage.setItem(TOKEN_KEY, token);
        this.utils.showToast('Authenticated !');
        this.ngOnInit();
        //this.router.navigate(['/my-profile']);
      }
    });
  }

}
