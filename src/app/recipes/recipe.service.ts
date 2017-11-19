import { ShoppingListService } from '../shopping-list/shopping-list.service';
import { Recipe } from './recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class RecipeService {
  recipeChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe(
        1,
        'Schnitzel',
        'This is just a german recipe',
        'https://c.pxhere.com/photos/ba/e4/sideburn_pig_baked_potato_salad_potatoes_green_salad_eat_food-895723.jpg!d',
        [
          new Ingredient('Meat', 1),
          new Ingredient('French Fries', 20)
        ]),
    new Recipe(
        2,
        'Big Fat Burger',
        'What else you need to say?',
        'https://upload.wikimedia.org/wikipedia/commons/d/dc/Lounge_Burger_Wiki.jpg',
        [
          new Ingredient('Buns', 2),
          new Ingredient('Meat', 1)
        ])
  ];

  constructor(private slService: ShoppingListService) {
  }

  getRecipes() {
    // Slice to get a copy, not the object itself
    return this.recipes.slice();
  }

  getRecipe(id) {
    return this.recipes.find(e => e.id === id);
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipeChanged.next(this.recipes.slice());
  }

  updateRecipe(newRecipe: Recipe) {
    this.recipes[this.recipes.findIndex(o => o.id === newRecipe.id)] = newRecipe;
    this.recipeChanged.next(this.recipes.slice());
  }

  deleteRecipe(id: number) {
    this.recipes.splice(this.recipes.findIndex(o => o.id === id), 1);
    this.recipeChanged.next(this.recipes.slice());
  }
}
