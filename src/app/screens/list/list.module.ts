import { NgModule } from '@angular/core';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { Routes } from '@angular/router';
import { ListComponent } from './list.component';

const routes: Routes = [
    {
        path: '',
        component: ListComponent
    },
    {
        path: ':token',
        component: ListComponent
    }
];

@NgModule({
    declarations: [ListComponent],
    imports: [NativeScriptRouterModule.forChild(routes)]
})
export class ListModule {}
