import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserListComponent } from "./user-list.component";
import { RouterModule } from '@angular/router'

@NgModule({
    declarations: [
        UserListComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule
      ],
      exports: [
        UserListComponent
      ]
    ​​}​​)



export class UserListModule{}