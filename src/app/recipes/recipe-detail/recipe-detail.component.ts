import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,           //this gives me access to the current activated route
    private router: Router
    ) { }

  ngOnInit() {    //this is used to gain access to the current route that will be created based on the id of the recipe that is being selected
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id']; //fetch and store the id 
          this.recipe = this.recipeService.getRecipe(this.id) //fetch the recipe based on the id i got 
        }
      )
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe(){
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  onDeleteRecipe(){
    this.recipeService.deleteRecipe(this.id)
    this.router.navigate(['../'], {relativeTo: this.route})
  }

}
