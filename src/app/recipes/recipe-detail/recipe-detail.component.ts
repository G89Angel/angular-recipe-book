import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import { Observable } from 'rxjs/Observable';
import * as fromRecipe from '../store/recipe.reducers';
import { Recipe } from '../recipe.model';
import * as RecipeActions from '../store/recipe.actions';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  id: number;
  recipeState: Observable<fromRecipe.State>;
  recipe: Recipe;

  constructor(private recipeService: RecipeService,
              private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromRecipe.FeatureState>) {
  }

  ngOnInit() {
    this.route.params
        .subscribe((params) => {
          this.id = +params['id'];
          this.recipeState = this.store.select('recipes');
        });
  }

  onAddToShoppingList() {
    this.store.select('recipes')
        .take(1)
        .subscribe((recipeState: fromRecipe.State) => {
          this.store.dispatch(new ShoppingListActions.AddIngredients(
              recipeState.recipes[this.id].ingredients));
        });
  }

  onDelete() {
    this.store.dispatch(new RecipeActions.DeleteRecipe(this.id));
    this.router.navigate(['/recipes']);
  }
}
