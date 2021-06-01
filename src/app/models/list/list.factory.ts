import { Injectable } from '@angular/core';
import { Data } from '@angular/router';
import { ListLocal, ListShared } from './list.model';
import { ProductFactory } from '../product/product.factory';

@Injectable({
    providedIn: 'root'
})
export class ListFactory {
    // #############################################

    constructor(private productFactory: ProductFactory) {}

    // #############################################

    public getAll(data: Data): ListShared[] | ListLocal[] {
        return data.map((list) => this.create(list));
    }

    public getOne(data: Data): ListShared | ListLocal {
        return this.create(data);
    }

    // #############################################

    public create(list: Data): ListShared | ListLocal {
        if(list.products) {
            list.products = this.productFactory.getAll(list.products);
        }

        if (list.id) {
            return new ListShared(list.id, list.users, list);
        } else if (list.token) {
            return new ListLocal(list.token, list);
        } else {
            return;
        }
    }

    // #############################################
}
