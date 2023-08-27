import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import CreateRegisForm from './create-register';
import { ProductsService, productsModels } from '../../services/products.service';
import { map } from 'rxjs';
import { formatDate } from '@angular/common';
import Swal from 'sweetalert2';

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
  id!: any;
  productEdit!: productsModels[];
  reg = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  formGroupRegister = this.formBuilder.group({
    id: ['', [Validators.required , Validators.minLength(3), Validators.maxLength(10)]],
    name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
    description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
    logo: ['', [Validators.required, Validators.pattern(this.reg)]],
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
        case 'edit': {
          this.activeroute.paramMap
            .pipe(map((params: { get: (arg0: string) => any; }) => params.get('id')))
            .subscribe((id) => {
              this.id = id;
            });
          this.isEdid = true;
          this.isCreate = false;
          this.getDataEdit();
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
    this.formGroupRegister.controls['date_revision'].disable();
  }

  getDataEdit() {
    this.productsService.getAllProducts().subscribe((response: productsModels[]) => {
      response;
      this.productEdit = response.filter(data => data.id === this.id);
      this.formGroupRegister.controls['id'].disable();
      this.validEditAndView(this.productEdit[0]);
    });
  }

  public resetFormAndRedirect() {
    this.formGroupRegister.reset();
    this.router.navigateByUrl('/visualize');
  }

  initformGroup() {
    this.formGroupRegister = this.formBuilder.group({
      id: ['', [Validators.required , Validators.minLength(3), Validators.maxLength(10)]],
      name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(100)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]],
      logo: ['', [Validators.required, Validators.pattern(this.reg)]],
      date_release: ['', [Validators.required]],
      date_revision: ['', [Validators.required]],
    });
    this.formGroupRegister.controls['date_revision'].disable();
  }

  submitSaveNewDocumentForm() {
    if (this.isEdid ) {
      this.formGroupRegister.controls['id'].disable();
    }
    this.formGroupRegister = new FormGroup(this.createRegisForm.validateFormGrupDocument(
      this.formValidate,
      this.isEdid ,
    ));
    if (this.formGroupRegister.status === 'VALID') {
      if (this.isCreate) {
        const requestBody: any = this.createRegisForm.composesaveNewRegisFormRequestBody(this.formValidate);
        this.productsService.createProducts(requestBody).subscribe((response) => {
          if (response) {

            let timerInterval: any;
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El registro se guardado correctamente',
              showConfirmButton: false,
              timer: 1800,
              willClose: () => {
                clearInterval(timerInterval);
                this.resetFormAndRedirect();
              }
            })

          }
        });
      } else {
        const requestBody: any = this.createRegisForm.composesaveNewRegisFormRequestBody(this.formValidate);
        this.productsService.updateProducts(requestBody).subscribe((response) => {
          if (response) {
            let timerInterval: any;
            Swal.fire({
              position: 'top-end',
              icon: 'success',
              title: 'El registro se ha editado correctamente',
              showConfirmButton: false,
              timer: 1800,
              willClose: () => {
                clearInterval(timerInterval);
                this.resetFormAndRedirect();
              }
            })
          }

        });     
      }

    }
  }

  validateform(name: string) {
      this.formGroupRegister.get(name);
    if (this.formGroupRegister.controls.date_release.value) {
      const dateStart = new Date(this.formGroupRegister.controls.date_release.value);
      dateStart.setFullYear(dateStart.getFullYear() + 1);
      this.yearToday = dateStart.toISOString().slice(0, 10).replace(/-/g, "-");
      this.formGroupRegister.controls['date_revision'].enable();
    } else {
      this.formGroupRegister.controls['date_revision'].disable();
    }
    if (this.isEdid) {
      this.formGroupRegister.controls['id'].disable();
    }
  }

  validEditAndView(dataObject: any) {
    this.formGroupRegister = new FormGroup(this.createRegisForm.viewFormGrupDocument(dataObject, false,));
    this.formGroupRegister.controls.date_release.setValue(formatDate(dataObject.date_release,'yyyy-MM-dd','en'));
    this.formGroupRegister.controls.date_revision.setValue(formatDate(dataObject.date_revision,'yyyy-MM-dd','en'));
    this.formGroupRegister.controls['id'].disable();
  }


}
