import { Component, ElementRef, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {

  @ViewChild ("nameInput",{static: false}) nameInputRef : ElementRef;
  @ViewChild ("amountInput",{static: false}) amountInputRef : ElementRef;

  @Output() addedIngredient = new EventEmitter<Ingredient>();
  @Output() removedIngredient = new EventEmitter<Ingredient>();
  @Output() removeAll = new EventEmitter<Ingredient>();
  
  constructor() { }

  ngOnInit() {
  }

  onAddItem(){
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;

    const newIngredient = new Ingredient(ingName,ingAmount);

    this.addedIngredient.emit(newIngredient);
  }

  onRemoveItem(){
    this.removedIngredient.emit();
  }

  onClear(){
    this.removeAll.emit();
  }
}
