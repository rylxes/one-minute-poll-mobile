import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {MenuController} from "@ionic/angular";

@Component({
  selector: 'app-add-new',
  templateUrl: './add-new.page.html',
  styleUrls: ['./add-new.page.scss'],
})
export class AddNewPage implements OnInit {

  public data: FormGroup;
  page = 'Polls';

  constructor(private formBuilder: FormBuilder, public menuCTL: MenuController) {
    this.data = this.formBuilder.group({
      titleField: ['', [Validators.required]],
    });
    this.menuCTL.enable(true);
  }

  ngOnInit() {
  }

  public onSubmit(data) {

  }

}
