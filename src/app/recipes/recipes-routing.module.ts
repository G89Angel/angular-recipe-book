import { NgModule } from '@angular/core';
import { AuthGuardService } from '../auth/auth-guard.service';
import { RecipesComponent } from './recipes.component';
import { RouterModule, Routes } from '@angular/router';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeResolver } from './recipe.resolver';

const recipeRoutes: Routes = [
  {
    path: 'recipes', component: RecipesComponent, children: [
    { path: '', component: RecipeStartComponent, pathMatch: 'full' },
    { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuardService] },
    { path: ':id', component: RecipeDetailComponent, resolve: { recipe: RecipeResolver } },
    {
      path: ':id/edit',
      component: RecipeEditComponent,
      resolve: { recipe: RecipeResolver },
      canActivate: [AuthGuardService]
    }
  ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(recipeRoutes)
  ],
  exports: [RouterModule]
})
export class RecipesRoutingModule {
}