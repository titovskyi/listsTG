import { Injectable } from '@angular/core';

import { setString, getString } from 'tns-core-modules/application-settings';

import { Observable } from 'rxjs';
import { map } from 'rxjs/internal/operators';

// import { v4 as uuidv4 } from 'uuid';

import { ListLocal } from './list.model';
import { ListFactory } from '~/app/models/list/list.factory';
import { Product } from '~/app/models/product/product.model';

@Injectable({
    providedIn: 'root'
})
export class ListService {
    public static readonly LISTS_STORAGE = 'purchase_products_lists';

    // #############################################

    constructor() {}

    // #############################################

    public getAll(): Observable<ListLocal[]> {
        return new Observable((observer) => {
            const listJSON = getString(ListService.LISTS_STORAGE);
            const data = listJSON ? JSON.parse(listJSON) : null;

            if (data) {
                const localLists = data.map((list) => new ListLocal(list.token, list));

                observer.next(localLists);
                observer.complete();
            } else {
                observer.next([]);
                observer.complete();
            }
        });
    }

    public getOne(token: string): Observable<ListLocal> {
        return this.getAll().pipe(
            map((lists) => {
                return lists.find((list) => list.token === token);
            })
        );
    }

    public add(data: { name: string; products?: Product[] }): Observable<ListLocal> {
        return this.getAll().pipe(
            map((lists) => {
                const currentList = { ...data, createdAt: new Date(), token: new Date().toString() };

                lists.push(currentList);
                setString(ListService.LISTS_STORAGE, JSON.stringify(lists));

                return currentList;
            })
        );
    }

    public update(data: ListLocal): Observable<ListLocal> {
        return this.getAll().pipe(
            map((lists) => {
                for (let i = 0; lists.length > i; i++) {
                    if (lists[i].token === data.token) {
                        lists[i] = data;

                        break;
                    }
                }

                setString(ListService.LISTS_STORAGE, JSON.stringify(lists));

                return new ListLocal(data.token, data);
            })
        );
    }

    public remove(token: string): Observable<void> {
        return this.getAll().pipe(
            map((lists) => {
                lists = lists.filter((list) => list.token !== token);

                setString(ListService.LISTS_STORAGE, JSON.stringify(lists));

                return;
            })
        );
    }

    public removeSome(tokens: string[]): Observable<void> {
        return this.getAll().pipe(
            map((lists) => {
                for (let i = 0; tokens.length > i; i++) {
                    for (let j = 0; lists.length > j; j++) {
                        if (tokens[i] === lists[j].token) {
                            lists.splice(j, 1);
                        }
                    }
                }

                setString(ListService.LISTS_STORAGE, JSON.stringify(lists));

                return;
            })
        );
    }

    // #############################################
}
