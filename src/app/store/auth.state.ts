import { state } from '@angular/animations';
import { Injectable } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { AuthService } from '../services/auth.service';
import { GlobalService } from '../services/global.service';
import { Login, Logout } from './auth.action';

export class AuthstateModel {
  token: string;
  user: {
    username: string;
    name: string;
  };
}
// const response = {
//   token: 'testetestestetesteste',
//   user: {
//     username: 'Jet',
//     name: 'Gamboa',
//   },
// };
const username = 'admin';

const password = 'pass';

@State<AuthstateModel>({
  name: 'auth',
  defaults: {
    token: null,
    user: {
      username: null,
      name: null,
    },
  },
})
@Injectable()
export class AuthState {
  constructor(private authsService: AuthService,private globalService: GlobalService) {}
  @Selector()
  static token(state: AuthstateModel): string {
    return state.token;
  }
  @Selector()
  static user(state: AuthstateModel): any {
    return state.user;
  }
  @Selector()
  static fullName(state: AuthstateModel): string {
    return state.user.name || null;
  }

  @Action(Login, { cancelUncompleted: true })
  login(
    { patchState }: StateContext<AuthstateModel>,
    { payload }: Login
  ): void {
    this.authsService.httpLogin(payload);
    this.authsService.onHttpLogin.subscribe((response: any) => {
      if (response) {
        patchState({
          token: response.token,
          user: response.user,
        });
        this.authsService.isLogged.next(false);
      }
    });
  }

  @Action(Logout, { cancelUncompleted: true })
  logout({ patchState }: StateContext<AuthstateModel>): void {
    patchState({
      token: null,
      user: {
        username: null,
        name: null,
      },
    });
    this.authsService.isLogged.next(false);
  }
}
