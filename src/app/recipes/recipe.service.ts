import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs/Subject';

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

  constructor() {
  }

  getRecipes() {
    // Slice to get a copy, not the object itself
    return this.recipes.slice();
  }

  getRecipe(id) {
    return this.recipes.find(e => e.id === id);
  }

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipeChanged.next(this.recipes.slice());
  }
}
