import {Component, Input, OnInit} from '@angular/core';
import {PollsService} from "../../services/polls.service";
import {PollOptionsService} from "../../services/poll-options.service";
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {AlertController} from "@ionic/angular";
import {Router} from "@angular/router";
import {UtilitiesService} from "../../services/utilities.service";
import {EventsService} from "../../events/events.service";

@Component({
  selector: 'app-my-poll-list',
  templateUrl: './user-polls.page.html',
  styleUrls: ['./user-polls.page.scss'],
})
export class UserPollsPage implements OnInit {

  @Input() pollList: any;
  @Input() name: any;
  pollOptions: any;
  eachPoll: any;

  constructor(
    private socialSharing: SocialSharing,
    private router: Router,
    private eventsService: EventsService,
    private utils: UtilitiesService,
    private pollsService: PollsService,
    private alertCtrl: AlertController,
    private pollOptionsService: PollOptionsService,
  ) {
  }

  sharePrompt = async (eachPoll) => {
    this.eachPoll = eachPoll;
    let alert = await this.alertCtrl.create({
      header: "Share Poll with Friends",
      subHeader: 'Enter email address of recipients (unregistered users will get an invite).',
      inputs: [
        {
          name: 'emails',
          placeholder: 'Emails separated with commas'
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
          text: 'Share',
          handler: data => {
            this.onSubmit(data);
          }
        }
      ]
    });
    alert.present();
  };

  public onSubmit(data) {
    console.log(this.eachPoll)
    console.log(data)

    let toSubmit = {
      'poll_id': this.eachPoll.id,
      'emails': data.emails,
    }

    this.pollsService.sharePolls(toSubmit).subscribe(res => {
      console.log(res);
      const response = res['data']
      this.utils.showToast('Poll Shared !');
      this.eventsService.publishSomeData({
        pollResult: response
      });
      this.router.navigate(['/share-success', this.eachPoll.id]);
    });
  }

  clickShare2(event) {
    console.log(event)
    // this is the complete list of currently supported params you can pass to the plugin (all optional)
    var options = {
      message: 'share this', // not supported on some apps (Facebook, Instagram)
      subject: 'One Minute Poll', // fi. for email
      // files: ['', ''], // an array of filenames either locally or remotely
      url: 'https://www.website.com/foo/#bar?a=b',
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

  doRefresh(event) {
    console.log('Begin async operation');
    this.pollsService.mine().subscribe(data => {
      this.pollList = data['data'];
      event.target.complete();
      console.log(this.pollList);
    });
  }

  ngOnInit() {
    if (this.name != 'search') {
      this.loadPoll();
      //this.loadPollOptions();
    }
  }

  loadPoll = () => {
    this.pollsService.mine().subscribe(data => {
      this.pollList = data['data'];
      console.log(this.pollList);
    });
  }

  loadPollOptions = () => {
    // this.pollOptionsService.byPoll(this.theID).subscribe(data => {
    //   this.pollOptions = data['data'];
    //   console.log(this.pollOptions);
    // });
  }


}
