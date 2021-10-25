import {Component, Input, OnInit} from '@angular/core';
import {PollsService} from "../../services/polls.service";
import {PollOptionsService} from "../../services/poll-options.service";
import {SocialSharing} from '@ionic-native/social-sharing/ngx';
import {AlertController, PopoverController} from "@ionic/angular";
import {Router} from "@angular/router";
import {UtilitiesService} from "../../services/utilities.service";
import {EventsService} from "../../events/events.service";
import {ShareOptionsComponent} from "../share-options/share-options.component";
import {ShareMenuPage} from "../share-menu/share-menu.page";
import {Globals} from "../../../config/globals";

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
  isAuth = false;
  showMore = true;

  url: string;
  itemListData = [];
  page_number = 1;
  page_limit = 5;

  constructor(
    private socialSharing: SocialSharing,
    private router: Router,
    private globals: Globals,
    private eventsService: EventsService,
    private utils: UtilitiesService,
    private pollsService: PollsService,
    public popoverController: PopoverController,
    private alertCtrl: AlertController,
    private pollOptionsService: PollOptionsService,
  ) {
    this.isAuth = this.utils.getValue('IS_AUTH') || false;
  }

  ionViewWillEnter() {
    this.isAuth = this.utils.getValue('IS_AUTH') || false;
  }


  async presentPopover(ev) {
    const popover = await this.popoverController.create({
      component: ShareOptionsComponent,
      // componentProps: {
      //
      // },
      event: ev,
      showBackdrop: false,
      translucent: true,
      animated: false,
      cssClass: 'bottom-sheet-popover'
    });
    await popover.present();
  }


  sharePrompt = async (eachPoll) => {
    if (!this.isAuth) {
      this.utils.showInfoError("Authenticate your email to enable this option");
      return;
    }
    this.eachPoll = eachPoll;
    let alert = await this.alertCtrl.create({
      header: "Share Poll with Friends",
      cssClass: 'sharePrompt',
      subHeader: 'Enter email address of recipients (unregistered users will get an invite).',
      inputs: [
        {
          name: 'emails',
          placeholder: 'Emails separated with commas'
        },
      ],
      buttons: [
        {
          text: 'Share',
          cssClass: 'btn btn-primary btn-share',
          handler: data => {
            this.onSubmit(data);
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'btn btn-primary btn-cancel',
          handler: data => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Share as Link',
          cssClass: 'inline-link',
          handler: () => {
            this.clickShare2();
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

      let shared = "";
      if (response.shared.length > 0) {
        shared = "Successfully shared with: " + response.shared + "\n\n"
      }
      if (response.unregistered.length > 0) {
        shared = shared + "Unregistered emails were sent invitations: " + response.unregistered
      }

      this.utils.showToastWithDuration(shared, 5000);
      console.log(response)
      this.eventsService.publishSomeData({
        pollResult: response
      });
      this.router.navigate(['/share-success', this.eachPoll.id]);
    });
  }

  clickShare2() {
    // this is the complete list of currently supported params you can pass to the plugin (all optional)
    var options = {
      message: 'Share this url', // not supported on some apps (Facebook, Instagram)
      subject: 'One Minute Poll', // fi. for email
      // files: ['', ''], // an array of filenames either locally or remotely
      url: this.globals.shareURL + 'vote-now/' + this.eachPoll.id,
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
    let page = {
      page: 1
    }
    this.pollsService.mine(page).subscribe(data => {
      this.pollList = data['data'];
      event.target.complete();
      this.page_number = 2;
      console.log(this.pollList);
    });
  }

  doInfinite(event) {
    console.log(this.page_number)
    let page = {
      page: this.page_number
    }
    this.pollsService.mine(page).subscribe(data => {
      //this.pollList = data['data'];
      console.log(data['data'])

      this.pollList = [...this.pollList, ...data['data']];
      try {
        event.target.complete();
      } catch (e) {

      }
      this.page_number++;
      console.log(this.pollList);
    });
  }

  ngOnInit() {
    if (this.name != 'search') {
      this.loadPoll();
      //this.loadPollOptions();
    }
    this.isAuth = this.utils.getValue('IS_AUTH') || false;
  }

  loadPoll = () => {
    let page = {
      page: 1
    }
    this.pollsService.mine(page).subscribe(data => {
      this.pollList = data['data'];
      this.page_number = 2;
      this.showMore = true;
      console.log(this.pollList);
    });
  }


  loadMorePoll = () => {
    let page = {
      page: 1,
      size: 15,
    }
    this.pollsService.mine(page).subscribe(data => {
      this.pollList = data['data'];
      this.page_number = 2;
      this.showMore = false;
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
