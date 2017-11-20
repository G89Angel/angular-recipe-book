import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import 'rxjs/add/operator/map';

@Injectable()
export class DataStorageService {
  baseUrl = 'https://ng-recipe-book-21151.firebaseio.com/';

  constructor(private http: Http, private recipeService: RecipeService) {
  }

  storeRecipes() {
    return this.http.put(this.baseUrl + 'recipes.json', this.recipeService.getRecipes());
  }

  getRecipes() {
    this.http.get(this.baseUrl + 'recipes.json')
        .map(
            (response: Response) => {
              const recipes: Recipe[] = response.json();
              for (const recipe of recipes) {
                if (!recipe['ingredients']) {
                  recipe['ingredients'] = [];
                }
              }
              return recipes;
            }
        )
        .subscribe(
            (recipes: Recipe[]) => {
              console.log(recipes);
              this.recipeService.setRecipes(recipes);
            }
        );
  }
}
