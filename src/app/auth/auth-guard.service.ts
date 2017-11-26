import { ActivatedRouteSnapshot, CanActivate, CanLoad, Route, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../store/app.reducers';
import * as fromAuth from './store/auth.reducers';

@Injectable()
export class AuthGuardService implements CanActivate, CanLoad {
  constructor(private store: Store<AppState>) {
  }

  canLoad(route: Route): Observable<boolean> | Promise<boolean> | boolean {
    return true;
  }

  canActivate(route: ActivatedRouteSnapshot, stated: RouterStateSnapshot) {
    return this.store.select('auth')
        .take(1)
        .map((authState: fromAuth.State) => {
      return authState.authenticated;
    });
  }
}
