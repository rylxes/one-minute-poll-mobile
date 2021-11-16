import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {IonContent, MenuController} from '@ionic/angular';
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
import {Content} from "@angular/compiler/src/render3/r3_ast";
import {LoadingService} from "../services/loading.service";

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
  openList: any = [
    {
      id: true,
      name: "Yes",
    },
    {
      id: false,
      name: "No (Only friends you share with)",
    }
  ];
  settings: any;
  categoriesList: any;
  category: any;
  userDetails: any;
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
  @ViewChild(IonContent, {static: false}) content: IonContent;
  @ViewChild('panel3', {static: false}) panel3: ElementRef;

  public ionScroll;
  public panelPos3: number;
  public showButton = false;
  public contentData = [];

  submitted = false;
  isSubmitted = false;

  constructor(
    private formBuilder: FormBuilder,
    public myElement: ElementRef,
    private route: ActivatedRoute,
    private router: Router,
    private pollsService: PollsService,
    private pollTypeService: PollTypeService,
    private pollCreatedService: PollCreatedService,
    private eventsService: EventsService,
    private categoriesService: CategoriesService,
    private previousURLService: PreviousURLService,
    private readonly sanitizer: DomSanitizer,
    private loading: LoadingService,
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
        //this.utils.remove('pollTypesList');
        // this.utils.remove('categoriesList');
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

  get title() {
    return this.data.get('title');
  }

  get errorControl() {
    return this.data.controls;
  }

  ionViewDidLoad(): void {

    this.panelPos3 = this.panel3.nativeElement.getBoundingClientRect().top;

  }

  logScrollStart(event) {
    console.log("logScrollStart : When Scroll Starts", event);
  }

  logScrolling(event) {
    console.log("logScrolling : When Scrolling", event);
  }

  logScrollEnd(event) {
    console.log("logScrollEnd : When Scroll Ends", event);
  }

  ScrollToBottom() {
    this.content.scrollToBottom(1500);
  }

  async scrollToLabel(label) {
    var titleELe = document.getElementById(label);
    console.log(titleELe)
    console.log(titleELe.offsetTop)
    //await this.content.scrollToPoint(0, titleELe.offsetTop, 10);
  }

  ScrollToTop() {
    // this.content.scrollToTop(1500);
    this.scrollTo(0, this.panelPos3, 750);
  }

  scrollTo(x: number,
           y: number,
           duration: number): void {
    // this.content.scrollTo(x, y, duration);
    this.content.scrollToPoint(x, y, duration);
  }

  ScrollToPoint(X, Y) {
    this.content.scrollToPoint(X, Y, 1500);
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

  radioGroupChange = (event, eachType) => {
    event.preventDefault()
    // this.clickOpenList(eachType);
  }

  clickOpenList = (eachType) => {
    console.log(eachType)

    if (!this.isAuth && eachType.id === false) {
      this.utils.showInfoError("Authenticate your email to enable this option");
      let formData = {
        ...this.data.value, ...{
          openToAll: true
        }
      }
      this.data.setValue(formData);
    } else {
      let formData = {
        ...this.data.value, ...{
          openToAll: eachType.id
        }
      }
      this.data.setValue(formData);
    }

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

  clickOpenToAll = (ev, eachType) => {
    ev.preventDefault();
    ev.stopImmediatePropagation();
    ev.cancelBubble = true;
    ev.stopPropagation();
    this.clickOpenList(eachType);
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
          // closeDate:  moment(this.data.value.closeDate).format('YYYY-MM-DD'),
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

  ionViewWillEnter() {
    console.log('verri')
    this.ScrollToTop();
  }

  defaults = () => {
    this.settings = this.utils.getValue('SETTINGS');
    this.userDetails = this.utils.getValue('USER_DETAILS') || {};
    let duration = parseInt(this.settings?.POLL_DURATION || 2);
    var new_date = moment(moment(), "YYYY-MM-DD").add(duration, 'days').format("YYYY-MM-DD")

    let formData = {
      ...this.data.value, ...{
        closeDate: new_date,
        emailField: this.userDetails?.email || null,
        openToAll: true
      }
    }
    console.log(formData)
    this.data.setValue(formData);


    // this.openList = [
    //   {
    //     id: true,
    //     name: "Yes",
    //   },
    //   {
    //     id: false,
    //     name: "No",
    //   }
    // ]
  }

  ngOnInit() {
    //console.log(moment().format('YYYY-MM-DD'))


    this.defaults()
    this.loadPoll()
    this.loadPollType();
    this.loadCategories();
    this.editForm();
    this.isAuth = this.utils.getValue('IS_AUTH');

  }

  public onSubmit(data) {
    this.isSubmitted = true;
    if (!this.data.valid) {
      this.utils.showErrorToast("There are some errors in your form")
      console.log('All fields are required.')
      return false;
    } else {
      console.log(this.data.value)


      let mydate = '';
      if ((this.data.value.closeDate)) {
        mydate = moment(this.data.value.closeDate).format('YYYY-MM-DD') || '';
      }


      this.data.value.closeDate = mydate;
      this.data.value.image = this.utils.getValue('thePhoto');


      let formData = {
        ...this.data.value, ...{
          openToAll: !this.isAuth ? true : this.data.value.openToAll
        }
      }
      this.data.setValue(formData);
      this.utils.setValue('toSubmit', formData);
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

    if (file.size > 1000000) {
      //  alert("Please upload image less then 150KB");
      this.removePhoto();
      this.utils.showErrorToast('Please upload image less then 1MB!');
      return;
    }
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
