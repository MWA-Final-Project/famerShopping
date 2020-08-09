import { Component, HostListener } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: []
})
export class AppComponent{
  title = 'finalproject';
  // @HostListener('window:beforeunload', ['$event']) clearLocalStorage(event){
  //   alert("hhh");
  //   localStorage.clear();
  // }
  
}
