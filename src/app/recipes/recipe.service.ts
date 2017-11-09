import {Recipe} from './recipe.model';
import {EventEmitter} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";

export class RecipeService {
  recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe(
        'Schnitzel',
        'This is just a german recipe',
        'https://c.pxhere.com/photos/ba/e4/sideburn_pig_baked_potato_salad_potatoes_green_salad_eat_food-895723.jpg!d',
        [
            new Ingredient('Meat', 1),
            new Ingredient('French Fries', 20)
        ]),
    new Recipe(
        'Big Fat Burger',
        'What else you need to say?',
        'https://cdn.pixabay.com/photo/2017/08/08/18/09/burger-2612137_960_720.jpg',
        [
            new Ingredient('Buns', 2),
            new Ingredient('Meat', 1)
        ])
  ];

  getRecipes() {
    // Slice to get a copy, not the object itself
    return this.recipes.slice();
  }


}
