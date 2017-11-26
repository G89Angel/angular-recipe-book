import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../recipe.model';
import * as RecipeActions from '../store/recipe.actions';
import * as fromRecipe from '../store/recipe.reducers';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/take';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipe: Recipe;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private store: Store<fromRecipe.FeatureState>) {
  }

  getControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  ngOnInit() {
    this.route.params
        .subscribe((params) => {
          this.id = +params['id'];
          this.editMode = !!params['id'];
          this.initForm();
        });
  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
        new FormGroup({
          'name': new FormControl(null, [Validators.required]),
          'amount': new FormControl(null, [
            Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
          ]),
        })
    );
  }

  onSubmit() {
    this.store.select('recipes')
        .take(1)
        .subscribe((recipeState: fromRecipe.State) => {
          const newRecipe = new Recipe(
              recipeState.recipes.length + 1,
              this.recipeForm.value['name'],
              this.recipeForm.value['description'],
              this.recipeForm.value['imagePath'],
              this.recipeForm.value['ingredients']
          );
          if (this.editMode) {
            newRecipe.id = this.id;
            // this.recipeService.updateRecipe((<Recipe>{ id: this.id, ...this.recipeForm.value }));
            this.store.dispatch(new RecipeActions.UpdateRecipe({ index: this.id, updatedRecipe: newRecipe }));
          } else {
            // this.recipeService.addRecipe((<Recipe>{ id: this.recipeService.getRecipes().length + 1, ...this.recipeForm.value }));
            this.store.dispatch(new RecipeActions.AddRecipe(newRecipe));
          }

          this.onCancel();
        });
  }

  onCancel() {
    this.router.navigate(['..'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {
      this.store.select('recipes')
          .take(1)
          .subscribe((recipeState: fromRecipe.State) => {
            const recipe = recipeState.recipes.find(r => r.id === this.id);
            recipeName = recipe.name;
            recipeImagePath = recipe.imagePath;
            recipeDescription = recipe.description;
            if (recipe['ingredients']) {
              for (const ingredient of recipe['ingredients']) {
                recipeIngredients.push(new FormGroup({
                  'name': new FormControl(ingredient.name, [Validators.required]),
                  'amount': new FormControl(ingredient.amount, [
                    Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)
                  ]),
                }));
              }
            }
          });
    }

    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, [Validators.required]),
      'imagePath': new FormControl(recipeImagePath, [Validators.required]),
      'description': new FormControl(recipeDescription, [Validators.required]),
      'ingredients': recipeIngredients
    });
  }
}
