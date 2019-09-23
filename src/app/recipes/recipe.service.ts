import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import * as ShoppingListActions from '../shopping-list/store/shopping-list.actions';
import * as fromApp from '../store/app.reducer';

@Injectable()
export class RecipeService {

    recipesChanged = new Subject<Recipe[]>();

    constructor(
        private store: Store<fromApp.AppState>
        ){}

    //private recipes: Recipe[] = [
    //    new Recipe(
    //        'A Teste Recipe',
    //        'This is simply a teste',
    //        'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
    //       [
    //            new Ingredient('Carne', 1),
    //            new Ingredient('Batata', 3)
    //        ]
    //        ),
    //    new Recipe(
    //        'A Other Recipe',
    //        'This is simply a teste two',
    //        'https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg',
    //        [
    //            new Ingredient('Frango', 1),
    //            new Ingredient('Cenora', 3)
    //        ]
    //        )
    //];
    private recipes: Recipe[] = [];

    setRecipes(recipes: Recipe[]){
        this.recipes = recipes;
        this.recipesChanged.next(this.recipes.slice());
    }

    getRecipes(){
        return this.recipes.slice();
    }

    getRecipe(index: number){
        return this.recipes[index];
    }

    addIngretientsToShoppingList(ingredients: Ingredient[]){
        //this.shoppingListService.addIngredients(ingredients);
        this.store.dispatch(new ShoppingListActions.AddIngredients(ingredients));
    }

    addRecipe(recipe: Recipe){
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes);
    }

    updateRecipe(index: number, newRecipe: Recipe){
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
    }

    deleteRecipe(index: number){
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
    }
    
}