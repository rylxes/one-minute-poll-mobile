import {Component, OnInit} from '@angular/core';
import {filter, pairwise} from "rxjs/operators";
import {NavigationEnd, NavigationStart, Router, RoutesRecognized} from "@angular/router";
import {AlertController} from "@ionic/angular";
import {AuthService} from "../services/auth.service";
import {UtilitiesService} from "../services/utilities.service";
import {PollsService} from "../services/polls.service";

const TOKEN_KEY = 'jwt-token';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.page.html',
  styleUrls: ['./my-profile.page.scss'],
})
export class MyProfilePage implements OnInit {

  page = 'Profile';
  userDetails: any;


  constructor(
    private router: Router,
    private auth: AuthService,
    private pollsService: PollsService,
    private utils: UtilitiesService,
    private alertCtrl: AlertController
  ) {
    this.router.events
      .pipe(filter((event: any) => event instanceof RoutesRecognized), pairwise())
      .subscribe((events: RoutesRecognized[]) => {
        console.log('previous url', events[0].urlAfterRedirects);
        console.log('current url', events[1].urlAfterRedirects);
      });

  }

  ngOnInit() {
    this.userDetails = this.utils.getValue('USER_DETAILS') || {};
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
    this.auth.codeLogin({code: data.code}).subscribe(res => {
      // @ts-ignore
      this.utils.setValue('USER_DETAILS', res['data'].user);
      this.userDetails = res['data'].user;
      this.utils.setValue('IS_AUTH', true);
      console.log(res);
      const token = res['data'].accessToken;
      if (token) {
        localStorage.setItem(TOKEN_KEY, token);
        this.utils.showToast('Authenticated !');
        //this.router.navigate(['/my-profile']);
      }
    });
  }

}
