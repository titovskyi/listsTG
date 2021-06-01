import { Product } from '../product/product.model';
import { User } from '../user/user.model';

export abstract class List {
    // #############################################

    protected constructor(public name: string, public createdAt: Date, public products?: Product[]) {}

    // #############################################
}

export class ListLocal extends List {
    // #############################################

    constructor(public token, data) {
        super(data.name, data.createdAt, data.products);
    }

    // #############################################
}

export class ListShared extends List {
    // #############################################

    constructor(public id, public users: User[], data) {
        super(data.name, data.createdAt, data.products);
    }

    // #############################################
}
