import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PollsService} from "../services/polls.service";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AlertController, MenuController} from "@ionic/angular";
import * as moment from "moment";
import * as _ from "lodash";
import {UtilitiesService} from "../services/utilities.service";
import {VoteService} from "../services/vote.service";
import {PollOptionsService} from "../services/poll-options.service";
import {PollResultService} from "../services/poll-result.service";
import {isNil} from 'lodash-es';
import {Globals} from "../../config/globals";
import {SocialSharing} from "@ionic-native/social-sharing/ngx";
import {EventsService} from "../events/events.service";

@Component({
  selector: 'app-vote-now',
  templateUrl: './vote-now.page.html',
  styleUrls: ['./vote-now.page.scss'],
})

export class VoteNowPage implements OnInit {

  page = 'Polls';
  theID: any;
  hasNotExpired = true;
  hasNotClosed = true;
  poll: any = {};
  canEdit = false;
  pollOptions: any = {};
  optionValues: any = [];
  sum: any = 0;
  public data: FormGroup;

  // bars: any;
  // colorArray: any;

  voteNow = {
    vote: '',
  };

  constructor(
    private route: ActivatedRoute,
    private eventsService: EventsService,
    private alertCtrl: AlertController,
    private socialSharing: SocialSharing,
    private router: Router,
    private globals: Globals,
    private formBuilder: FormBuilder,
    public menuCTL: MenuController,
    private utils: UtilitiesService,
    private pollsService: PollsService,
    private pollResultService: PollResultService,
    private pollOptionsService: PollOptionsService,
    private voteService: VoteService,
  ) {
    this.theID = this.route.snapshot.paramMap.get('id');
    this.data = this.formBuilder.group({
      vote: ['', [Validators.required]],
    });
    this.menuCTL.enable(true);
  }


  clickOptions = (event) => {
    console.log(this.data.value.answerType)
  }

  public onSubmit(pageForm) {

    console.log(this.data.value);

    let toSubmit = {
      uuid: this.utils.getValue('UUID'),
      poll_id: this.theID,
      value: this.data.value.vote,
    };

    this.voteService.create(toSubmit).subscribe(res => {
      let vote = res['data'];
      console.log(res)
      this.router.navigate(['/vote-complete', vote?.poll_id]);
    });
  }

  clickOptions2 = (id) => {
    console.log(id)
    let formData = {
      ...this.data.value, ...{
        vote: id
      }
    }
    this.data.setValue(formData);
  }

  ngOnInit() {
    this.loadPoll();
    this.loadPollOptions();
  }

  loadPollOptions = () => {
    this.pollOptionsService.byPoll(this.theID).subscribe(data => {
      this.pollOptions = data['data'];
      console.log(this.pollOptions);
    });
  }


  calculate = () => {
    if (!isNil(this.poll)) {
      this.pollResultService.calculate(this.poll);
      this.optionValues = this.pollResultService.optionValues;
      this.sum = this.pollResultService.sum;
      if (!isNil(this.poll.close_date)) {
        const mydate = moment(this.poll.close_date).startOf('day');
        this.hasNotClosed = this.hasNotExpired = moment().startOf('day').isSameOrBefore(mydate);
        console.log(mydate)
      }

      let udetails = this.utils.getValue('USER_DETAILS');
      if (udetails?.id === this.poll.user_id) {
        this.canEdit = true;
      }
      if (this.utils.getValue('UUID') === this.poll.theuuid) {
        this.canEdit = true;
      }
      if (this.poll.hasVoted == 1) {
        this.hasNotExpired = false;
      }
      if (this.poll.hasAnyVoted == 1) {
        this.canEdit = false;
      }
      console.log(this.poll)


      // console.log(moment().startOf('day').isSameOrBefore(mydate))
    }
  }


  loadPoll = () => {
    this.pollsService.getOne(this.theID).subscribe(data => {
      this.canEdit = false;
      this.poll = data['data'];
      if (this.poll.hasVoted == 1) {
        this.hasNotExpired = false;
      }
      this.calculate();
      console.log(this.hasNotExpired, this.poll);
      // console.log({test: this.poll.hasVoted == 1});
    });
  }

  prompt = async () => {
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
          cssClass: 'primary',
          handler: data => {
            this.onSubmitPrompt(data);
          }
        },
        {
          text: 'Share as Link',
          cssClass: 'secondary',
          handler: () => {
            this.clickShare();
          }
        }
      ]
    });
    alert.present();
  };


  public onSubmitPrompt(data) {
    console.log(this.poll)
    console.log(data)

    let toSubmit = {
      'poll_id': this.poll.id,
      'emails': data.emails,
    }

    this.pollsService.sharePolls(toSubmit).subscribe(res => {
      console.log(res);
      const response = res['data']
      this.utils.showToast('Poll Shared !');
      this.eventsService.publishSomeData({
        pollResult: response
      });
      this.router.navigate(['/share-success', this.poll.id]);
    });
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


}
