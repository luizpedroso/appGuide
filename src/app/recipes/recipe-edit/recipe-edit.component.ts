import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import * as fromApp from '../../store/app.reducer';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode: boolean;
  recipeForm: FormGroup;

  get ingredientsControls () {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  constructor(private route: ActivatedRoute, 
    private router: Router,
    private recipeService: RecipeService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) =>{
          this.id = +params['id'];
          this.editMode = params['id'] != null;
          this.initForm();
        }
    );
  }

  onSubmit(){
    
    const newRecipe = new Recipe(
      this.recipeForm.value['name'],
      this.recipeForm.value['description'],
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients']
    ); 
    if(this.editMode){
      this.recipeService.updateRecipe(this.id, newRecipe);
    }else{
      this.recipeService.addRecipe(newRecipe);
    }
    this.onCancel();
  }

  onAddIngredient(){
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel(){
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if(this.editMode){
      //const recipe = this.recipeService.getRecipe(this.id);

      const recipe = this.store.select('recipes').pipe(map(recipesState => {
        return recipesState.recipes.find((recipe, index) => {
          return index === this.id;
        })
      })).subscribe(recipe => {
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;
        if(recipe['ingredients']){
          for (let ingredint of recipe.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                'name': new FormControl(ingredint.name, Validators.required),
                'amount': new FormControl(ingredint.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              })
            );
          }
        }
      });
    }

    this.recipeForm = new FormGroup({
      'name' : new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });

  }
}

