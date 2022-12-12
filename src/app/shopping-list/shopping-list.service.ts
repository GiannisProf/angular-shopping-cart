import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs-compat';

export class ShoppingListService {
  //ingredientsChanged = new EventEmitter<Ingredient[]>();

  //event emitters are a bad practice. It will be changed to a subject  

  ingredientsChanged = new Subject<Ingredient[]>();
  //.emit will be replaced with .next
  startedEdit = new Subject<number>();


  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients() {
    return this.ingredients.slice();
  }

  getIngredient(i: number){
    return this.ingredients.slice()[i];
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  removeIngredient() {
    this.ingredients.pop();
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  clearAll() {
    this.ingredients = [];
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  addIngredients(ingredients: Ingredient[]) {
    // for (let ingredient of ingredients) {
    //   this.addIngredient(ingredient);
    // }
    this.ingredients.push(...ingredients);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient){
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

}
