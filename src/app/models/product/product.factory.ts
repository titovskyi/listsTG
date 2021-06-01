import { Injectable } from '@angular/core';
import { Product } from '~/app/models/product/product.model';
import { Data } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class ProductFactory {
    // #############################################

    public getOne(data: Data): Product {
        return this.create(data);
    }

    public getAll(data: Data): Product[] {
        return data.map((product) => this.create(product));
    }

    // #############################################

    private create(product: Data): Product {
        return new Product(product.name, product.category, product.token, product.status);
    }

    // #############################################
}
