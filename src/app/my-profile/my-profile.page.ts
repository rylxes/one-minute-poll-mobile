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

const TOKEN_KEY = 'jwt-token';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  page = 'Profile';
  userDetails: any;
  isAuth: any;
  public data: FormGroup;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private auth: AuthService,
    private usersService: UsersService,
    private pollsService: PollsService,
    private utils: UtilitiesService,
    private alertCtrl: AlertController
  ) {
    this.data = this.formBuilder.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required]],
    });
    this.router.events
      .pipe(filter((event: any) => event instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        console.log('previous url', events[0].urlAfterRedirects);
        console.log('current url', events[1].urlAfterRedirects);
      });

  }

  public onSubmitForm(data) {
    console.log(this.data.value);

    this.usersService.edit(this.data.value, 1).subscribe(res => {
      if (res) {
        this.utils.setValue('USER_DETAILS', res['data']);
        this.utils.showToast('profile edited !');
      }
    });
  }

  ngOnInit() {
    this.isAuth = this.utils.getValue('IS_AUTH');
    this.userDetails = this.utils.getValue('USER_DETAILS') || {};
    if (!_.isEmpty(this.userDetails)) {
      console.log(this.userDetails)
      let form = {
        name: this.userDetails?.name,
        email: this.userDetails?.email,
      }
      this.data.setValue(form);
    }
    console.log(this.userDetails);
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
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Authenticate',
          handler: data => {
            this.onSubmit(data);
          }
        }
      ]
    });
    alert.present();
  };


  public onSubmit(data) {
    console.log(data.value);
    this.auth.codeLogin({
      code: data.code,
      uuid: this.utils.getValue('UUID')
    }).subscribe(res => {
      // @ts-ignore
      this.utils.setValue('USER_DETAILS', res['data'].user);
      this.userDetails = res['data'].user;
      this.utils.setValue('IS_AUTH', true);
      console.log(res);
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
