import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Page } from '@nativescript/core';
import { Theme } from '@nativescript/theme';
import { RouterExtensions } from '@nativescript/angular';
import { ActivatedRoute } from '@angular/router';
import { SharedListService } from '~/app/models/list/shared-list.service';
import { ListShared } from '~/app/models/list/list.model';

@Component({
    selector: 'lists',
    templateUrl: './lists.component.html',
    styleUrls: ['./lists.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListsComponent implements OnInit {
    public userLogin = 'Стремное имя';

    public sharedLists: ListShared[] = [];

    // ########################################

    constructor(
        private page: Page,
        private router: RouterExtensions,
        private activatedRoute: ActivatedRoute,
        private sharedListService: SharedListService
    ) {
        this.page.actionBarHidden = true;
    }

    // ########################################

    public ngOnInit(): void {
        this.router.navigate([{ outlets: { personal: ['personal'], collective: ['collective'] } }], { relativeTo: this.activatedRoute });
        this.sharedListService.getAll().subscribe((res) => {
            this.sharedLists = res;
        });

        try {
            Theme.setMode(Theme.Light);
        } catch (e) {
            console.log("Error setting Theme to light mode", e);
        }
    }

    // ########################################
}
