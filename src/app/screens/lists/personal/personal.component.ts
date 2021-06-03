import { ChangeDetectionStrategy, Component, OnInit, ViewContainerRef } from '@angular/core';
import { Page, Color } from '@nativescript/core';
import { Observable } from 'rxjs';
import { ListService } from '~/app/models/list/list.service';
import { ListLocal } from '~/app/models/list/list.model';
import { Product } from '~/app/models/product/product.model';
import { ModalDialogService, RouterExtensions } from '@nativescript/angular';
import { ListNameModalComponent } from '~/app/modals/list-name-modal/list-name-modal.component';
import { UiService } from '~/app/screens/ui.service';

@Component({
    selector: 'personal-lists',
    templateUrl: './personal.component.html',
    styleUrls: ['./personal.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class PersonalComponent implements OnInit {
    public lists$: Observable<ListLocal[]>;

    // ########################################

    constructor(
        private page: Page,
        private listService: ListService,
        private router: RouterExtensions,
        private modalDialog: ModalDialogService,
        private vcRef: ViewContainerRef,
        private uiService: UiService
    ) {
        this.page.actionBarHidden = true;
        this.page.androidStatusBarBackground = new Color('rgba(33, 33, 33, 0.08)');
    }

    // ########################################

    public ngOnInit(): void {
        this.lists$ = this.listService.getAll();
    }

    // ########################################

    public openList(listToken: string): void {
        this.router.navigate([`list/${listToken}`]);
    }

    public createList(): void {
        this.modalDialog.showModal(ListNameModalComponent, {
            viewContainerRef: this.uiService.getRootVCRef(),
            fullscreen: true,
            context: {
                type: 'personal'
            }
        }).then((res) => {
            console.log(res);
        });
        // this.router.navigate([`list`]);
    }

    // ########################################

    public totalItems(products: Product[] | undefined): string {
        return `${products ? products.length : 0} пунктов`;
    }

    // ########################################
}
