import {Recipe} from './recipe.model';
import {EventEmitter} from '@angular/core';

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Dummy recipe', 'This is just a dummy recipe', 'http://maxpixel.freegreatpicture.com/static/photo/1x/Chicken-Avocado-Heart-Salad-1735138.jpg'),
    new Recipe('Another Dummy recipe', 'This is just a dummy recipe', 'http://maxpixel.freegreatpicture.com/static/photo/1x/Chicken-Avocado-Heart-Salad-1735138.jpg')
  ];

  getRecipes() {
    // Slice to get a copy, not the object itself
    return this.recipes.slice();
  }


}
