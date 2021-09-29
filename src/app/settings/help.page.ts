import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UsersService} from "../services/users.service";
import {UtilitiesService} from "../services/utilities.service";

@Component({
  selector: 'app-help',
  templateUrl: './help.page.html',
  styleUrls: ['./help.page.scss'],
})
export class HelpPage implements OnInit {
  page = 'Help';
  toggleMode: any;
  theeme = false;
  defaultForm: any;
  public data: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService,
    private utils: UtilitiesService,
  ) {
    this.data = this.formBuilder.group({
      LOCATION: [''],
      POLL_DURATION: [''],
      DECENCY_FILTER: [''],
      THEME: [''],
    });
  }

  updateToggleTheme = (event) => {
    let formData = {
      ...this.data.value, ...{
        THEME: event.detail.checked
      }
    }
    this.data.setValue(formData);
  }


  updateToggleDecency = (event) => {
    let formData = {
      ...this.data.value, ...{
        DECENCY_FILTER: event.detail.checked
      }
    }
    this.data.setValue(formData);
  }

  public onSubmitForm(data) {
    let form = {
      LOCATION: this.data.value.LOCATION,
      POLL_DURATION: this.data.value.POLL_DURATION,
      DECENCY_FILTER: this.data.value.DECENCY_FILTER || 0,
      THEME: this.data.value.THEME || 0,
    }
    console.log(this.data.value);
    console.log(form);
    this.usersService.settings(form).subscribe(res => {
      let formData = {};
      res['data'].forEach((value) => {
        let pan = {}
        pan[value.key] = value.value;
        formData = {...formData, ...pan};
      })
      this.utils.setValue('SETTINGS', formData);
      this.utils.showToast('Settings saved !');
      // if (res) {
      //   this.utils.setValue('USER_DETAILS', res['data']);
      //   this.utils.showToast('profile edited !');
      // }
    });

  }

  onClick(event) {
    let systemDark = window.matchMedia("(prefers-color-scheme: dark)");
    systemDark.addListener(this.colorTest);
    if (event.detail.checked) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }

  colorTest(systemInitiatedDark) {
    if (systemInitiatedDark.matches) {
      document.body.setAttribute('data-theme', 'dark');
    } else {
      document.body.setAttribute('data-theme', 'light');
    }
  }

  toggleChange(event): void {
    console.log(event)
    document.body.classList.toggle('dark', event);
  }

  ngOnInit() {
    let settings = this.utils.getValue('SETTINGS');
    let form = this.defaultForm  = {
      LOCATION: settings?.LOCATION || '',
      POLL_DURATION: settings?.POLL_DURATION || '',
      DECENCY_FILTER: settings?.DECENCY_FILTER || 0,
      THEME: settings?.THEME || 0,
    }
    this.defaultForm.THEME = (this.defaultForm.THEME == 1) ;
    this.defaultForm.DECENCY_FILTER = (this.defaultForm.DECENCY_FILTER == 1) ;
    console.log(this.defaultForm)
    this.data.setValue(form);
  }

}
