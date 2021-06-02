import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { NativeScriptHttpClientModule, NativeScriptModule } from '@nativescript/angular';

import { NativeScriptUIListViewModule } from 'nativescript-ui-listview/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { LoginModule } from '~/app/screens/login/login.module';
import { ListsComponent } from '~/app/screens/lists/lists.component';
import { PersonalComponent } from '~/app/screens/lists/personal/personal.component';
import { CollectiveComponent } from '~/app/screens/lists/collective/collective.component';
import { CustomActionBarComponent } from '~/app/shared/custom-action-bar/custom-action-bar.component';
import { NgRippleModule } from 'nativescript-ripple/angular';

@NgModule({
    bootstrap: [AppComponent],
    imports: [AppRoutingModule, NativeScriptModule, HttpClientModule, NativeScriptHttpClientModule, NativeScriptUIListViewModule, LoginModule, NgRippleModule],
    exports: [],
    declarations: [AppComponent, ListsComponent, PersonalComponent, CollectiveComponent, CustomActionBarComponent],
    providers: [],
    schemas: [NO_ERRORS_SCHEMA]
})
export class AppModule {}
