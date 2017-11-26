import { Actions, Effect } from '@ngrx/effects';
import * as RecipeActions from './recipe.actions';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Recipe } from '../recipe.model';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/withLatestFrom';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRecipe from '../store/recipe.reducers';

@Injectable()
export class RecipeEffects {
  baseUrl = 'https://ng-recipe-book-21151.firebaseio.com/';

  @Effect()
  recipeFetch = this.actions$
      .ofType(RecipeActions.FETCH_RECIPES)
      .switchMap((action: RecipeActions.FetchRecipes) => {
        return this.httpClient.get<Recipe[]>(this.baseUrl + 'recipes.json', {
          observe: 'body',
          responseType: 'json',
        });
      })
      .map(
          (recipes) => {
            console.log(recipes);
            for (const recipe of recipes) {
              if (!recipe['ingredients']) {
                recipe['ingredients'] = [];
              }
            }
            return {
              type: RecipeActions.SET_RECIPES,
              payload: recipes
            };
          }
      );

  @Effect({dispatch: false})
  recipeStore = this.actions$
      .ofType(RecipeActions.STORE_RECIPES)
      .withLatestFrom(this.store.select('recipes'))
      .switchMap(([action, state]) => {
        const req = new HttpRequest(
            'PUT',
            this.baseUrl + 'recipes.json',
            state.recipes, {
              reportProgress: true,
            });
        return this.httpClient.request(req);
      });

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<fromRecipe.FeatureState>) {
  }
}
