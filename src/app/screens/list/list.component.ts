import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListService } from '../../models/list/list.service';
import { ListLocal } from '../../models/list/list.model';

@Component({
    selector: 'list-details',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class ListComponent implements OnInit {
    public currentList: ListLocal = { token: null, name: null, createdAt: new Date(), products: [] };

    public listCommonName: string;

    // ########################################

    constructor(private activatedRoute: ActivatedRoute, private listService: ListService) {
        const listToken = this.activatedRoute.snapshot.paramMap.get('token');

        // if(listToken) {
        //     this.listService.getOne(listToken).subscribe((list) => {
        //         this.currentList = list;
        //     })
        // }
        //
        // this.productService.getAll().subscribe((products) => {
        //     this.products = products;
        // });
        //
        // this.page.actionBarHidden = true;
    }

    // ########################################

    public ngOnInit(): void {
        // this.listName.setValue(this.currentList.name);
        //
        // this.productName.valueChanges.subscribe((res) => {
        //     this.autocomplete = [];
        //
        //     for (let i = 0; this.products.length > i; i++) {
        //         if (res && this.products[i].name.indexOf(res) !== -1) {
        //             this.autocomplete.push(this.products[i]);
        //         }
        //         if (this.autocomplete.length >= 5) {
        //             break;
        //         }
        //     }
        // });

        this.listCommonName = new Date().toLocaleDateString().split('/')[0];
    }

    // ########################################
}
