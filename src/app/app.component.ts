import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { UiService } from '~/app/screens/ui.service';

@Component({
    selector: 'ns-app',
    templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
    constructor(private vcRef: ViewContainerRef, private uiService: UiService) {}

    // ########################################

    public ngOnInit(): void {
        this.uiService.setRootVCRef(this.vcRef);
    }

// ########################################
}
