import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import 'rxjs/add/operator/map';
import { AuthService } from '../auth/auth.service';
import { HttpClient, HttpParams, HttpRequest } from '@angular/common/http';

@Injectable()
export class DataStorageService {
  baseUrl = 'https://ng-recipe-book-21151.firebaseio.com/';

  constructor(private httpClient: HttpClient, private recipeService: RecipeService,
              private authService: AuthService) {
  }

  storeRecipes() {
    // const token = this.authService.getToken();
    // return this.httpClient.put(this.baseUrl + 'recipes.json', this.recipeService.getRecipes(), {
    //   observe: 'body',
    //   params: new HttpParams().set('auth', token)
    // });

    // This way the request will report the progress
    const req = new HttpRequest(
        'PUT',
        this.baseUrl + 'recipe.json',
        this.recipeService.getRecipes(), {
          reportProgress: true,
          // params: new HttpParams().set('auth', token)
        });

    return this.httpClient.request(req);
  }

  getRecipes() {
    // const token = this.authService.getToken();
    // this.httpClient.get<Recipe[]>(this.baseUrl + 'recipes.json?auth=' + token)
    this.httpClient.get<Recipe[]>(this.baseUrl + 'recipes.json', {
      observe: 'body',
      responseType: 'json',
      // params: new HttpParams().set('auth', token)
    })
        .map(
            (recipes) => {
              console.log(recipes);
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
