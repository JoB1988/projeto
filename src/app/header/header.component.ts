import { Component, OnInit, HostListener, AfterViewInit, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  private div = '<ul class="navigation-list!"' +
    '<li><a [routerLink]="["/home"]" routerLinkActive="active">Home</a></li>' +
    '<li><a [routerLink]="["/ceps"]" routerLinkActive="active">Ceps</a></li>' +
    '<li><a [routerLink]="["/pokemons"]" routerLinkActive="active">Pokemons</a></li>' +
    '</ul>';

  @ViewChild('navigation', { static: true }) navigation: ElementRef;

  constructor() { }

  ngOnInit() { }

  @HostListener('window:resize', ['$event']) onResize(): string {
    // if (window.innerWidth < 500) {
    //   this.navigation.appendChild(this.divs[0]);
    //   this.navigation.appendChild(this.divs[1]);
    // } else {
    //   this.navigation.appendChild(this.divs[1]);
    //   this.navigation.appendChild(this.divs[0]);
    // }
    // console.log(this.navigation);
    // console.log(this.navigation.nativeElement);
    // this.navigation.nativeElement.insertAdjacentHTML('beforeend', this.div);
    return '';
  }

}
