import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  constructor() { }

  // @HostListener('window:resize', ['$event']) public deviceClass(): string {
  //   return '';
  // }
}
