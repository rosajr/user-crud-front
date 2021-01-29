import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { UserRegisterComponent } from "./user-register.component"
import { RouterModule } from '@angular/router'


@NgModule({
    declarations: [
        UserRegisterComponent
      ],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        RouterModule
      ],
      exports: [
          UserRegisterComponent
      ]
    ​​}​​)



export class UserRegisterModule{}