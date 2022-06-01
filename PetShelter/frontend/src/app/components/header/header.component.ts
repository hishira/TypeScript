import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  private hamburgerElement?: HTMLElement;
  private nestednav?: HTMLElement;
  private readonly HAMBURGEROPEN: string = 'hamburger-open'
  constructor() { }

  ngOnInit(): void {
    this.hamburgerElement = document.getElementsByClassName('hamburger')[0] as HTMLElement
    this.nestednav = document.getElementsByClassName('nasted')[0] as HTMLElement;
  }

  resetCSSClasses(): void {
    if(this.nestednav?.classList.contains('nested-open')){
      this.nestednav?.classList.remove('nested-open')
    }
    if(this.hamburgerElement?.classList.contains(this.HAMBURGEROPEN)){
      this.hamburgerElement?.classList.remove(this.HAMBURGEROPEN)
    }
  }
  
  hamburgerClick(): void {
    this.hamburgerElement?.classList.toggle(this.HAMBURGEROPEN);
    this.nestednav?.classList.toggle('nested-open');
    this.checkBodyOverflow();
  }
  
  
  private checkBodyOverflow(): void {
    console.log(document.body.style.getPropertyValue('overflow'))
    if(document.body.style.getPropertyValue('overflow') === 'hidden'){
      document.body.style.overflow = 'auto';
    }else{
      document.body.style.overflow = 'hidden';
    }
  }

  
}
