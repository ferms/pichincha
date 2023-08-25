import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import CreateRegisForm from './create-register';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  isEdid = false;
  isCreate = false;
  dateToday: Date;
  yearToday!: string;

  formGroupRegister = this.formBuilder.group({
    id: ['', [Validators.required]],
    name: ['', [Validators.required]],
    description: ['', [Validators.required]],
    logo: ['', [Validators.required]],
    date_release: ['', [Validators.required]],
    date_revision: ['', [Validators.required]],
  });
  
  get formValidate() {
    return this.formGroupRegister.controls;
  }

  constructor(
    private activeroute: ActivatedRoute,
    private router: Router,
    private formBuilder: FormBuilder,
    private createRegisForm: CreateRegisForm,
    private productsService: ProductsService) {
      this.activeroute.url.subscribe((data) => {
        switch (data[0].path) {
          case 'edit-register': {
            this.isEdid = true;
            this.isCreate = false;
            break;
          }
          default: {
            this.isCreate = true;
            this.isEdid = false;
            break;
          }
        }
      });
      this.dateToday = new Date();
      this.initformGroup();
      this.formGroupRegister.controls['date_revision'].disable();
     }

     public resetFormAndRedirect() {
      this.formGroupRegister.reset();
      this.router.navigateByUrl('/visualize');
    }

     initformGroup(){
      this.formGroupRegister = this.formBuilder.group({
        id: ['', []],
        name: ['', []],
        description: ['', []],
        logo: ['', []],
        date_release: ['', []],
        date_revision: ['', []],
      });
      this.formGroupRegister.controls['date_revision'].disable();
     }

  submitSaveNewDocumentForm() {
    this.formGroupRegister = new FormGroup(this.createRegisForm.validateFormGrupDocument(
      this.formValidate,
     false,
    ));
    if (this.formGroupRegister.status === 'VALID') {
      if (this.isCreate) {
        const requestBody: any = this.createRegisForm.composesaveNewRegisFormRequestBody(this.formValidate);
        console.log('%c⧭', 'color: #00b300', requestBody);
            this.productsService.createProducts(requestBody).subscribe((response) => {
            console.log('%c⧭', 'color: #aa00ff', response);
            if (response) {
              this.resetFormAndRedirect();
            }
           
              });
      }
    }
  }


 validateform() {
    this.formGroupRegister = new FormGroup(this.createRegisForm.validateFormGrupDocument(
      this.formValidate,
     false,
    ));
    if (this.formGroupRegister.controls.date_release.value) {
      const dateStart = new Date(this.formGroupRegister.controls.date_release.value);
      dateStart.setFullYear(dateStart.getFullYear()+1);
      this.yearToday = dateStart.toISOString().slice(0,10).replace(/-/g,"-");
      this.formGroupRegister.controls['date_revision'].enable();
    } else {
      this.formGroupRegister.controls['date_revision'].disable();
    }
  
  }



}
