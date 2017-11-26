import { Injectable } from '@angular/core';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import 'rxjs/add/operator/map';
import { HttpClient, HttpRequest } from '@angular/common/http';

@Injectable()
export class DataStorageService {
  baseUrl = 'https://ng-recipe-book-21151.firebaseio.com/';

  constructor(private httpClient: HttpClient, private recipeService: RecipeService) {
  }
}
