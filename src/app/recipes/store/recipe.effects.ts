import { Actions, Effect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import * as RecipesActions from './recipe.actions';
import { Recipe } from '../recipe.model';

@Injectable()
export class RecipeEffects {

    @Effect()
    fetchRecipes = this.actions$.pipe(
        ofType(RecipesActions.FETCH_RECIPES),
        switchMap(() => {
            return this.http
            .get<Recipe[]>(
                'https://ng-complete-guide-a6b39.firebaseio.com/recipes.json'
            )
        }),
        map(recipes => {
            return recipes.map(recipe => {
                return {
                    ...recipe,
                    ingredients: recipe.ingredients ? recipe.ingredients: []
                }
            })
        }),
        map(recipes => {
            return new RecipesActions.SetRecipes(recipes);
        })
    );

    constructor(public actions$: Actions, private http: HttpClient){}    
}