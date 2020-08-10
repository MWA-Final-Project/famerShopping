import { Injectable } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';

@Injectable({
  providedIn: 'root'
})
export class RadioChangeService {
  radio:Number = 1;
  constructor() { }

  setRadio(num) {
    this.radio= num;
  }
  getRadio(){
    return this.radio
  }
}
