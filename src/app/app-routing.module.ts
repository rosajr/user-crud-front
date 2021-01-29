import {​​ NgModule }​​ from '@angular/core';

import {​​ Routes, RouterModule }​​ from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserRegisterComponent } from './user-register/user-register.component';

const routes: Routes = [
    { path: '',component: UserListComponent},
    { path: 'new',component: UserRegisterComponent​​},
    { path: 'edit/:id',component: UserRegisterComponent​​}
​​]

@NgModule({​​

    imports: [RouterModule.forRoot(routes)],

    exports: [RouterModule],

}​​)

export class AppRoutingModule {​​ }​​