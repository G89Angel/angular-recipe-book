import { NgModule } from '@angular/core';
import { AuthGuardService } from '../auth/auth-guard.service';
import { RecipesComponent } from './recipes.component';
import { RouterModule, Routes } from '@angular/router';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';

const recipeRoutes: Routes = [
  {
    path: '', component: RecipesComponent, children: [
    { path: '', component: RecipeStartComponent, pathMatch: 'full' },
    { path: 'new', component: RecipeEditComponent, canActivate: [AuthGuardService] },
    { path: ':id', component: RecipeDetailComponent },
    {
      path: ':id/edit',
      component: RecipeEditComponent,
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
