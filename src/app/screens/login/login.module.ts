import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { Routes } from '@angular/router';

import { LoginComponent } from './login.component';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { MainInputComponent } from '~/app/shared/main-input/main-input.component';
import {CommonModule} from "@angular/common";

const routes: Routes = [
    {
        path: '',
        component: LoginComponent
    }
];

@NgModule({
    declarations: [LoginComponent, MainInputComponent],
    imports: [CommonModule, NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule],
    schemas: [NO_ERRORS_SCHEMA]
})
export class LoginModule {}
