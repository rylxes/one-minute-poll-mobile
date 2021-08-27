import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MenuController} from '@ionic/angular';
import {Observable} from 'rxjs';
import {filter, finalize, pairwise, tap} from 'rxjs/operators';
import * as moment from 'moment';
import {decode} from 'base64-arraybuffer';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import {DomSanitizer, SafeResourceUrl} from '@angular/platform-browser';
import {UtilitiesService} from '../services/utilities.service';
import {ActivatedRoute, Router, RoutesRecognized} from '@angular/router';
import {PollTypeService} from '../services/poll-type.service';
import {CategoriesService} from '../services/categories.service';
import {LoadingEventService} from '../events/loading-event.service';
import {PreviousURLService} from "../services/previous-url.service";
import {EventsService} from "../events/events.service";
import {isNil} from 'lodash-es';
import {PollsService} from "../services/polls.service";
import {PollCreatedService} from "../events/poll-created.service";

export interface imgFile {
  name: string;
  filepath: string;
  size: number;
}

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.page.html',
  styleUrls: ['./add-new.page.scss'],
})
export class AddNewPage implements OnInit {

  public data: FormGroup;
  page = 'Polls';

  // Upload progress
  percentageVal: Observable<number>;

  // Track file uploading with snapshot
  trackSnapshot: Observable<any>;

  public tus = false;
  public showNext = true;
  public checked = false;
  photo: SafeResourceUrl | null = null;
  error: any;
  image: any = '';
  stage: any;
  poll: any;
  pollTypesList: any;
  categoriesList: any;
  category: any;
  public showSpinner = false;
  public showA2E = false;
  public myShowAE = false;
  public isAuth = false;

  // Uploaded image collection
  files: Observable<imgFile[]>;

  // Image specifications
  imgName: string;
  imgSize: number;

  // File uploading status
  isFileUploading: boolean;
  isFileUploaded: boolean;

  theID: any;
  loadPollTypeEvent = false;
  loadCategoriesEvent = false;

  maxNumberOfTitleCharacters = 25;
  maxNumberOfQuestionCharacters = 200;
  numberOfTitleCharacters = 0;
  numberOfQuestionCharacters = 0;
  counter = true;
  interaction = {
    title: '',
    question: ''
  };

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private pollsService: PollsService,
    private pollTypeService: PollTypeService,
    private pollCreatedService: PollCreatedService,
    private eventsService: EventsService,
    private categoriesService: CategoriesService,
    private previousURLService: PreviousURLService,
    private readonly sanitizer: DomSanitizer,
    private loadingEventService: LoadingEventService,
    private utils: UtilitiesService,
    public menuCTL: MenuController
  ) {
    this.theID = this.route.snapshot.paramMap.get('id');
    this.data = this.formBuilder.group({
      title: ['', [Validators.required]],
      answerType: ['', [Validators.required]],
      closeDate: [''],
      question: ['', [Validators.required]],
      image: [''],
      category: [''],
      emailField: [''],
      openToAll: [''],
      A: [''],
      B: [''],
      C: [''],
      D: [''],
      E: [''],
    });


    this.menuCTL.enable(true);
    this.isFileUploading = false;
    this.isFileUploaded = false;

    this.loadingEventService.getObservable().subscribe((data) => {
      this.loadCategoriesEvent = data.loadCategories;
      this.loadPollTypeEvent = data.loadPollType;
      console.log(this.loadPollTypeEvent);
      console.log(this.loadCategoriesEvent);
      if (this.loadCategoriesEvent && this.loadPollTypeEvent) {
        this.hideLoader();
      }
    });

    this.eventsService.getObservable().subscribe((data) => {
      if (data.completed) {
        this.data.reset();
        this.photo = null;
        this.utils.remove('toSubmit');
        this.utils.remove('theImage');
        this.utils.remove('showA2E');
        this.utils.remove('pollTypesList');
        this.utils.remove('categoriesList');
        this.utils.remove('PHOTO_URL');
      }
    });

    // this.router.events
    //   .pipe(filter((event: any) => event instanceof RoutesRecognized), pairwise())
    //   .subscribe((events: RoutesRecognized[]) => {
    //     // this.previousUrl = events[0].urlAfterRedirects;
    //     // this.currentUrl = events[1].urlAfterRedirects;
    //
    //     console.log('previous url', events[0].urlAfterRedirects);
    //     console.log('current url', events[1].urlAfterRedirects);
    //   });

  }


  onTitleModelChange(textValue: string): void {
    this.numberOfTitleCharacters = textValue?.length;
  }

  onQuestionModelChange(textValue: string): void {
    this.numberOfQuestionCharacters = textValue?.length;
  }

  reset = () => {
    this.data.reset();
    this.removePhoto();
  }

  openClick = () => {
    //console.log(this.data.value.openToAll)
    let formData = {
      ...this.data.value, ...{
        openToAll: !this.data.value.openToAll
      }
    }
    this.data.setValue(formData);
    // this.clickOptions(eachType)
  }

  clickOptions2 = (eachType) => {
    let formData = {
      ...this.data.value, ...{
        answerType: eachType.id
      }
    }
    this.data.setValue(formData);
    this.clickOptions(eachType)
  }

  clickOptions = (event) => {
    console.log(this.data.value.answerType)
    this.showA2E = false;
    if (this.data.value.answerType === 3) {
      this.showA2E = true;
    }
  }
  loadPollType = () => {
    this.pollTypeService.list().subscribe(data => {
      this.pollTypesList = data['data'];
      this.utils.setValue('pollTypesList', this.pollTypesList);
      this.loadingEventService.publish({
        loadPollType: true,
        loadCategories: this.loadCategoriesEvent
      });
      console.log(this.pollTypesList);
    });
  };

  loadCategories = () => {
    this.categoriesService.list().subscribe(data => {
      this.categoriesList = data['data'];
      this.utils.setValue('categoriesList', this.categoriesList);
      this.loadingEventService.publish({
        loadCategories: true,
        loadPollType: this.loadPollTypeEvent,
      });
      console.log(this.categoriesList);
    });
  };

  editForm = () => {
    const prevUrl = this.previousURLService.getPreviousUrl();
    console.log(prevUrl);
    if (prevUrl === '/post-review') {
      this.pollTypesList = this.utils.getValue('pollTypesList');
      this.image = this.utils.getValue('theImage');
      this.categoriesList = this.utils.getValue('categoriesList');
      this.data.setValue(this.utils.getValue('toSubmit'));

      this.category = this.categoriesList.find(input => input.id == this.data.value.category);
      this.photo = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64, ' + this.image.base64String);
    }
  };

  loadPoll = () => {
    if (!isNil(this.theID)) {
      console.log(this.theID)
      this.pollsService.getOne(this.theID).subscribe(data => {
        this.poll = data['data'];
        console.log(this.poll);

        let form = {
          title: this.poll.title,
          answerType: this.poll.poll_type_id,
          closeDate: this.poll.close_date,
          question: this.poll.question,
          image: this.poll.url,
          category: this.poll.category?.id,
          emailField: [''],
          openToAll: this.poll.open_to_everyone,
          A: this.poll?.pollOptions.find(input => input.name == 'A')?.value || null,
          B: this.poll?.pollOptions.find(input => input.name == 'B')?.value || null,
          C: this.poll?.pollOptions.find(input => input.name == 'C')?.value || null,
          D: this.poll?.pollOptions.find(input => input.name == 'D')?.value || null,
          E: this.poll?.pollOptions.find(input => input.name == 'E')?.value || null,
        }
        if (this.poll?.poll_type_id === 3) {
          this.showA2E = true
          this.myShowAE = true
        }
        console.log(form)
        this.category = this.poll.category;
        this.photo = this.poll.url;
        this.utils.setValue('PHOTO_URL', this.photo);
        this.data.setValue(form);
      });
    }

  }

  ngOnInit() {
    this.loadPoll()
    this.loadPollType();
    this.loadCategories();
    this.editForm();
    this.isAuth = this.utils.getValue('IS_AUTH');
  }

  public onSubmit(data) {
    let mydate = '';
    if ((this.data.value.closeDate)) {
      mydate = moment(this.data.value.closeDate).format('YYYY-MM-DD') || '';
    }
    this.data.value.closeDate = mydate;
    this.data.value.image = this.utils.getValue('thePhoto');
    this.utils.setValue('toSubmit', this.data.value);
    this.utils.setValue('showA2E', this.showA2E);
    this.pollCreatedService.publish({
      form: this.data.value,
    });
    if (!isNil(this.theID)) {
      this.router.navigate(['/post-review', this.theID]);
    } else {
      this.router.navigate(['/post-review']);
    }

    console.log(this.data.value);
  }

  private async getPhoto(source: CameraSource) {

    // const image = await this.setCamera(source, CameraResultType.Uri);
    await this.setCamera(source, CameraResultType.Base64).then((r) => {
      this.image = r;
      console.log(this.image);
    });
    const blob = new Blob([new Uint8Array(decode(this.image.base64String))], {
      type: `image/${this.image.format}`,
    });
    this.photo = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64, ' + this.image.base64String);
    const file = new File([blob], 'Name', {
      lastModified: moment().unix(),
      type: blob.type,
    });
    // this.utils.setValue('theFile', file);
    // this.utils.setValue('theBlob', blob);
    this.utils.setValue('theImage', this.image);
    this.utils.setValue('thePhoto', this.photo);
    // this.hideLoader();
    console.log({file, blob});
  }

  private hideLoader() {

  }

  async setCamera(source: CameraSource, resultType: CameraResultType) {
    //this.ionLoader.showLoader();
    let image;
    try {
      image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType,
        source
      });
    } catch (e) {
      console.log(e);
      image = null;
      // this.hideLoader();
    }
    return image;
  }


  private async getPhotos(source: CameraSource): Promise<string | undefined> {
    const image = await this.setCamera(source, CameraResultType.Uri);
    this.utils.setValue('theImage', image);
    if (image.webPath) {
      this.photo = this.sanitizer.bypassSecurityTrustResourceUrl(image.webPath);
      this.utils.setValue('thePhoto', this.photo);
    }
    return image.webPath;
  }

  private setPhoto(webPath) {
    this.showNext = false;
    //this.hideLoader();
    //this.utils.setValue('photoDetails', webPath);
  }

  takePhoto() {
    const ab = this.getPhoto(CameraSource.Camera);
    if (ab) {
      this.setPhoto(ab);
      // if (this.tus) {
      //   await this.driverProfileService.uploadTus(ab);
      // } else {
      //   await this.driverProfileService.uploadAll(ab);
      // }
    }
  }

  public removePhoto() {
    this.photo = null;
    this.utils.remove('theImage');
    this.utils.remove('thePhoto');
    let formData = {
      ...this.data.value, ...{
        image: null
      }
    }
    this.data.setValue(formData);
  }

  public selectPhoto() {
    //this.ionLoader.showLoader();
    const ab = this.getPhoto(CameraSource.Photos);
    if (ab) {
      this.setPhoto(ab);
      // if (this.tus) {
      //   await this.driverProfileService.uploadTus(ab);
      // } else {
      //   await this.driverProfileService.uploadAll(ab);
      // }
    }
  }


  public uploadImage(event: FileList) {
    const file = event.item(0);
    // Image validation
    if (file.type.split('/')[0] !== 'image') {
      console.log('File type is not supported!');
      return;
    }

  }


}
