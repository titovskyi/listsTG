import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Page } from '@nativescript/core';

import { Observable } from 'rxjs';

import { SharedListService } from '~/app/models/list/shared-list.service';
import { ListShared } from '~/app/models/list/list.model';

@Component({
    selector: 'collective-lists',
    templateUrl: './collective.component.html',
    styleUrls: ['./collective.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class CollectiveComponent implements OnInit {
    public lists$: Observable<ListShared[]>;

    // ########################################

    constructor(private page: Page, private sharedListService: SharedListService) {
        this.page.actionBarHidden = true;
    }

    // ########################################

    public ngOnInit(): void {
        this.lists$ = this.sharedListService.getAll();
    }

    // ########################################
}
