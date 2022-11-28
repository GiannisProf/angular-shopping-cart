import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  @Output()
  featureSelected = new EventEmitter<string>() //dhmiourgw custom event emitter

  onSelect(feature : string){
    this.featureSelected.emit(feature); //ton kanw emit gia na mporw na ton akousw apo to parent component
  }
}
