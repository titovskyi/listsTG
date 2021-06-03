import { Injectable, ViewContainerRef } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class UiService {
    private _rootVCRef: ViewContainerRef;

    // ########################################

    public setRootVCRef(vcRef: ViewContainerRef): void {
        this._rootVCRef = vcRef;
    }

    public getRootVCRef(): ViewContainerRef {
        return this._rootVCRef;
    }

    // ########################################
}
