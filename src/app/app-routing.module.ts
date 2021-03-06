import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { AuthGuardService } from './auth/auth-guard.service';
import { HomeComponent } from './core/home/home.component';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule', canLoad: [AuthGuardService] },
  { path: 'shopping-list', loadChildren: './shopping-list/shopping-list.module#ShoppingListModule' }
];

@NgModule({
  imports: [
      // Enabling preloading strategies we can load modules on page load
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
