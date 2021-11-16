import {Component, Input, OnInit} from '@angular/core';

import {PollResultService} from "../../services/poll-result.service";
import {AlertController} from "@ionic/angular";
import {SocialSharing} from "@ionic-native/social-sharing/ngx";
import {Globals} from "../../../config/globals";

@Component({
  selector: 'app-vote-result-template',
  templateUrl: './vote-result-template.component.html',
  styleUrls: ['./vote-result-template.component.scss'],
})
export class VoteResultTemplateComponent implements OnInit {

  @Input() poll: any;
  public optionValues: any;

  constructor(
    private socialSharing: SocialSharing,
    private globals: Globals,
    private pollResultService: PollResultService,
    private alertCtrl: AlertController
  ) {
  }

  clickShare() {
    // this is the complete list of currently supported params you can pass to the plugin (all optional)
    var options = {
      message: 'Share this url', // not supported on some apps (Facebook, Instagram)
      subject: 'One Minute Poll', // fi. for email
      // files: ['', ''], // an array of filenames either locally or remotely
      url: this.globals.shareURL + 'vote-now/' + this.poll.id,
      chooserTitle: 'Pick an app', // Android only, you can override the default share sheet title
      // appPackageName: 'com.apple.social.facebook', // Android only, you can provide id of the App you want to share with
      iPadCoordinates: '0,0,0,0' //IOS only iPadCoordinates for where the popover should be point.  Format with x,y,width,height
    };

    this.socialSharing.shareWithOptions(options).then((result) => {
      console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
      console.log("Shared to app: " + result.app); // On Android result.app since plugin version 5.4.0 this is no longer empty. On iOS it's empty when sharing is cancelled (result.completed=false)

    }).catch((msg) => {
      console.log("Sharing failed with message: " + msg);
    });
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      // cssClass: 'my-custom-class',
      header: 'Poll URL',
      message: this.globals.shareURL + 'vote-now/' + this.poll.id,
      buttons: ['OK']
    });
    await alert.present();
  }

  ngOnInit() {
    this.calculate();
  }

  ngOnChanges() {
    this.ngOnInit();
  }

  calculate = () => {
    this.pollResultService.calculate(this.poll);
    this.optionValues = this.pollResultService.optionValues;
    console.log(this.optionValues)
  }

  findOptions = (type) => this.optionValues.find((val) => val.value === type);
}
