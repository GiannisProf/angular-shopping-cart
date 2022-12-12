import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, FormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeForm: FormGroup; //object which takes key/value pairs for each input of the form
  recipeIngredients = new FormArray([]);

  constructor(private route: ActivatedRoute, 
              private RecipeService: RecipeService,
              private router: Router) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params ) => {
          this.id = +params['id']; //get the id from the current route
          this.editMode = params['id'] != null; //check if id exist or not   
          this.initForm();     
      }
    )
  }

  get controls() { // a getter!
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }
  
  private initForm() { //to initialise the form
    let recipeName = '';
    let imgUrl = '';
    let recipeDescription = '';    
    if(this.editMode){
      const recipe = this.RecipeService.getRecipe(this.id)
      recipeName  =  recipe.name;
      imgUrl = recipe.imagePath;
      recipeDescription = recipe.description;
      if( recipe['ingredients'] ){
        for(let ingredient of recipe.ingredients){
          this.recipeIngredients.push(
            new FormGroup({
              'name' : new FormControl(ingredient.name, Validators.required),
              'amount' : new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/[1-9]+[0-9]*$/)
              ])
            })
          )
        }
      }
    }

    this.recipeForm = new FormGroup(
      {
        'name': new FormControl(recipeName, Validators.required),
        'imageUrl': new FormControl(imgUrl, Validators.required ),
        'description': new FormControl(recipeDescription, Validators.required),
        'ingredients': this.recipeIngredients
      }
    )
  }

  onSubmit(){
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
      )
    if(this.editMode){
      this.RecipeService.updateRecipe(this.id, newRecipe)
    }
    else{
      this.RecipeService.addRecipe(newRecipe);
    }
    this.onCancel();
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name' : new FormControl("", Validators.required),
        'amount': new FormControl(0, [
          Validators.required,
          Validators.pattern(/[1-9]+[0-9]*$/)
        ])
      })
    )
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

}
