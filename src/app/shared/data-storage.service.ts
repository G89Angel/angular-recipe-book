import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import 'rxjs/add/operator/map';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class DataStorageService {
  baseUrl = 'https://ng-recipe-book-21151.firebaseio.com/';

  constructor(private http: Http, private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    const token = this.authService.getToken();
    return this.http.put(this.baseUrl + 'recipes.json?auth=' + token, this.recipeService.getRecipes());
  }

  getRecipes() {
    const token = this.authService.getToken();
    this.http.get(this.baseUrl + 'recipes.json?auth=' + token)
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
