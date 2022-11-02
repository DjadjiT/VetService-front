import {FormControl} from "@angular/forms";

export class ErrorMessageService {

  static getEmailErrorMessage(email: FormControl) {
    if (email.hasError('required')) {
      return 'Vous saisir une valeur pour ce champs';
    }

    return email.hasError('email') ? 'Email non valide.' : '';
  }


  static getFieldErrorMessage(field: FormControl) {
    if (field.hasError('required')) {
      return 'Vous devez entrer une valeur';
    }
    return ""
  }

  static getFieldErrorMinLength(field: FormControl, min: number) {
    if (field.hasError('required')) {
      return 'Vous devez entrer une valeur';
    }
    return field.hasError('minlength') ? 'La taille minimale du champs est de '+min+' caractère.' : '';
  }

  static getFieldErrorPhoneNumber(field: FormControl) {
    if (field.hasError('required')) {
      return 'Vous devez entrer une valeur';
    }
    if(field.hasError('pattern')){
      return 'Merci de ne saisir que des valeurs numériques, et saisir 10 caractères.'
    }
    if(field.hasError('minlength')){
      return 'La taille du champs est de 10 caractères.'
    }
    return ""
  }

}
