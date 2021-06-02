import { NgModule } from '@angular/core';
import { Routes } from '@angular/router';
import { NativeScriptRouterModule } from '@nativescript/angular';
import { ListsComponent } from '~/app/screens/lists/lists.component';
import { PersonalComponent } from '~/app/screens/lists/personal/personal.component';
import { CollectiveComponent } from '~/app/screens/lists/collective/collective.component';

const routes: Routes = [
    { path: '', redirectTo: '/lists', pathMatch: 'full' },
    { path: 'login', loadChildren: () => import('./screens/login/login.module').then((module) => module.LoginModule) },
    {
        path: 'lists',
        component: ListsComponent,
        children: [
            {
                path: 'personal',
                component: PersonalComponent,
                outlet: 'personal'
            },
            {
                path: 'collective',
                component: CollectiveComponent,
                outlet: 'collective'
            }
        ]
    },
    {
        path: 'list',
        loadChildren: () => import('./screens/list/list.module').then((module) => module.ListModule)
    }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule {}
