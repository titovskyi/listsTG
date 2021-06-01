import { Injectable } from '@angular/core';

import { setString, getString } from 'tns-core-modules/application-settings';

import { Product } from '~/app/models/product/product.model';
import { ProductFactory } from '~/app/models/product/product.factory';
import { ListService } from '~/app/models/list/list.service';
import { Observable } from 'rxjs';
import { map, mergeMap } from 'rxjs/internal/operators';
import { ListLocal } from '~/app/models/list/list.model';

@Injectable({
    providedIn: 'root'
})
export class ProductService {
    public static readonly PRODUCTS_STORAGE = 'purchase_products_products';

    // #############################################

    constructor(private productFactory: ProductFactory, private listService: ListService) {}

    // #############################################

    // public getOne(): ProductModel {}

    public getAll(): Observable<Product[]> {
        return new Observable((observer) => {
            const productsJSON = getString(ProductService.PRODUCTS_STORAGE);

            if (productsJSON) {
                observer.next(this.productFactory.getAll(JSON.parse(productsJSON)));
                observer.complete();
            } else {
                observer.next([]);
                observer.complete();
            }
        });
        //
        //
        // const productsJSON = getString(ProductService.PRODUCTS_STORAGE);
        //
        // if (productsJSON) {
        //     return this.productFactory.getAll(JSON.parse(productsJSON));
        // } else {
        //     return [];
        // }
    }

    public add(listToken: string, data: Product): Observable<void | Product> {
        return this.getAll().pipe(
            mergeMap((products) => {
                const prodExist = products.find((prod) => prod.id === data.id);
                if (prodExist) {
                    return this.update(data)
                        .pipe(
                        mergeMap(() => {
                            return this.addToList(listToken, data);
                        })
                    );
                } else {
                    return this.addToProducts(data)
                        .pipe(
                        mergeMap((product) => {
                            return this.addToList(listToken, product);
                        })
                    );
                }
            })
        );

        // const prodExist = this.getAll().find((prod) => prod.name === data.name);
        //
        // if (prodExist) {
        //     return this.update(data).pipe(
        //         mergeMap(() => {
        //             return this.addToList(listToken, data);
        //         })
        //     );
        // } else {
        //     return this.addToProducts(data).pipe(
        //         mergeMap((product) => {
        //             return this.addToList(listToken, product);
        //         })
        //     );
        // }
    }

    public addToProducts(data: { name: string; category: string; id: string }): Observable<Product> {
        return this.getAll().pipe(
            map((products) => {
                data.id = Date.now().toString();
                products.push(data);

                setString(ProductService.PRODUCTS_STORAGE, JSON.stringify(products));

                return data;
            })
        );
        // return new Observable((observer) => {
        //     const products = this.getAll();
        //
        //     data.token = Date.now().toString();
        //     products.push(data);
        //     setString(ProductService.PRODUCTS_STORAGE, JSON.stringify(products));
        //
        //     observer.next(data);
        //     observer.complete();
        // });
    }

    public addToList(listToken: string, product: Product): Observable<void> {
        return this.listService.getAll().pipe(
            map((lists) => {
                lists.forEach((list) => {
                    if (list.token === listToken) {
                        list.products.push(product);
                    }
                });

                setString(ListService.LISTS_STORAGE, JSON.stringify(lists));
            })
        );
    }

    public updateProductStatus(listToken: string, productId: string): Observable<void> {
        return this.listService.getAll().pipe(
            map((lists) => {
                for(let i = 0; lists.length > i; i++) {
                    if(lists[i].token === listToken) {
                        for(let j = 0; lists[i].products.length > j; j++) {
                            if(lists[i].products[j].id === productId && lists[i].products[j].status === undefined) {
                                lists[i].products[j].status = true;

                                break;
                            } else if(lists[i].products[j].id === productId) {
                                lists[i].products[j].status = !lists[i].products[j].status;

                                break;
                            }
                        }

                        break;
                    }
                }
                setString(ListService.LISTS_STORAGE, JSON.stringify(lists));
            })
        )
    }

    public update(data: { name: string; category: string; id: string }): Observable<void> {
        return this.getAll().pipe(
            map((products) => {
                products = products.map((product) => {
                    if (product.id === data.id) {
                        product.category = data.category;
                    }

                    return product;
                });

                setString(ProductService.PRODUCTS_STORAGE, JSON.stringify(products));
            })
        );

        // return new Observable((observer) => {
        //     let products = this.getAll();
        //
        //     products = products.map((product) => {
        //         if (product.token === data.token) {
        //             product.category = data.category;
        //         }
        //
        //         return product;
        //     });
        //
        //     setString(ProductService.PRODUCTS_STORAGE, JSON.stringify(products));
        //
        //     observer.next();
        //     observer.complete();
        // });
    }

    public remove(name: string): Observable<void> {
        return this.getAll().pipe(
            map((products) => {
                products = products.filter((prod) => prod.name !== name);

                setString(ProductService.PRODUCTS_STORAGE, JSON.stringify(products));

                return;
            })
        );
    }

    public removeFromList(data: ListLocal, removedProdName: string): Observable<ListLocal> {
        return new Observable((observer) => {
            data.products = data.products.filter((product) => product.name !== removedProdName);

            observer.next(data);
            observer.complete();
        }).pipe(
            mergeMap((list: ListLocal) => {
                return this.listService.update(list);
            })
        );
    }

    // #############################################
}
