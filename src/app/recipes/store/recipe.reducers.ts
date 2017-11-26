import { Ingredient } from '../../shared/ingredient.model';
import { Recipe } from '../recipe.model';
import * as RecipeActions from './recipe.actions';
import * as fromApp from '../../store/app.reducers';

export interface FeatureState extends fromApp.AppState {
  recipes: State;
}

export interface State {
  recipes: Recipe[];
}

const initialState: State = {
  recipes: [
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
  ]
};

export function recipeReducer(state = initialState, action: RecipeActions.RecipeActions) {
  switch (action.type) {
    case(RecipeActions.SET_RECIPES): {
      return {
          ...state,
          recipes: [...action.payload]
      };
    }
    case(RecipeActions.ADD_RECIPE): {
      return {
          ...state,
        recipes: [...state.recipes, action.payload]
      };
    }
    case(RecipeActions.UPDATE_RECIPE): {
      const recipe = state.recipes[action.payload.index];
      const updatedRecipe = {
          ...recipe,
          ...action.payload.updatedRecipe
      };
      const recipes = [...state.recipes];
      recipes[action.payload.index] = updatedRecipe;
      return {
          ...state,
          recipes: recipes
      };
    }
    case(RecipeActions.DELETE_RECIPE): {
      const splicedRecipes = [...state.recipes];
      splicedRecipes.splice(action.payload, 1);
      return {
        ...state,
        recipes: splicedRecipes
      };
    }
    default: {
      return state;
    }
  }
}
