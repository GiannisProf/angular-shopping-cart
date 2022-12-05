import { EventEmitter, Injectable } from "@angular/core";
import { Ingredient } from "../shared/ingredient.model";

export class ShoppingListService{

    ingredientsChanged = new EventEmitter<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Tomatoes', 10),
    ];

    getIngredients() {
        return this.ingredients.slice(); //use .slice to return copy of the array, not the original 
    }

    
    addItem(ingredient : Ingredient){
        this.ingredients.push(ingredient);
        this.ingredientsChanged.emit(this.ingredients.slice())  
    }

    removeItem(){
        this.ingredients.pop();
        this.ingredientsChanged.emit(this.ingredients.slice())
    }

    clearShoppingList(){
        this.ingredients = [];
        this.ingredientsChanged.emit(this.ingredients.slice())
    }
}