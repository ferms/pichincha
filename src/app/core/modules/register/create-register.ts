import { Injectable } from "@angular/core";
import { FormControl, Validators } from "@angular/forms";
@Injectable({
  providedIn:'root'
})

export class CreateRegisForm {

  composesaveNewRegisFormRequestBody(formValidate: any) {
  const formValue = formValidate;
  return {
    id: formValue.id.value,
    name: formValue.name.value,
    description: formValue.description.value,
    logo: formValue.logo.value,
    date_release: formValue.date_release.value,
    date_revision: formValue.date_revision.value,
  };
}

validateFormGrupDocument
  (formValidate: { id: FormControl<string | null>; name: FormControl<string | null>; description: FormControl<string | null>; logo: FormControl<string | null>; date_release: FormControl<string | null>; date_revision: FormControl<string | null>; } ,
  isView: boolean) {
    const reg = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  return {
    id: new FormControl({
      value: formValidate.id.value,
      disabled: isView
    }, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    name: new FormControl({
      value: formValidate.name.value,
      disabled: isView
    }, [Validators.required,  Validators.minLength(5), Validators.maxLength(100)]),
    description: new FormControl({
      value: formValidate.description.value,
      disabled: isView
    }, [Validators.required,Validators.minLength(10), Validators.maxLength(60)]),
    logo: new FormControl({
      value: formValidate.logo.value,
      disabled: isView
    }, [Validators.required, Validators.pattern(reg)]),
    date_release: new FormControl({
      value: formValidate.date_release.value,
      disabled: isView
    }, [Validators.required]),
    date_revision: new FormControl({
      value: formValidate.date_revision.value,
      disabled: false
    }, [Validators.required]),
  };
}


viewFormGrupDocument
  (formValidate: { id: string | null; name: string | null; description: string | null; logo: string | null; date_release: string | null; date_revision: string | null; } ,
  isView: boolean) {
    const reg = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_\+.~#?&\/=]*)$/;
  return {
    id: new FormControl({
      value: formValidate.id,
      disabled: true
    }, [Validators.required, Validators.minLength(3), Validators.maxLength(10)]),
    name: new FormControl({
      value: formValidate.name,
      disabled: isView
    }, [Validators.required,  Validators.minLength(5), Validators.maxLength(100)]),
    description: new FormControl({
      value: formValidate.description,
      disabled: isView
    }, [Validators.required,Validators.minLength(10), Validators.maxLength(200)]),
    logo: new FormControl({
      value: formValidate.logo,
      disabled: isView
    }, [Validators.required, Validators.pattern(reg)]),
    date_release: new FormControl({
      value: formValidate.date_release,
      disabled: isView
    }, [Validators.required]),
    date_revision: new FormControl({
      value: formValidate.date_revision,
      disabled: false
    }, [Validators.required]),
  };
}




}
export default CreateRegisForm;

