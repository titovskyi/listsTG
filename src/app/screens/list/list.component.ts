import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'list-details',
    templateUrl: './list.component.html',
    styleUrls: ['./list.component.css']
})
export class ListComponent {
    // ########################################

    constructor(private activatedRoute: ActivatedRoute) {
        const listToken = this.activatedRoute.snapshot.paramMap.get('token');

        console.log(listToken);
    }

    // ########################################
}
