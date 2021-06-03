import { Injectable } from '@angular/core';

import { setString, getString } from '@nativescript/core/application-settings';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/internal/operators';

import { ListLocal } from './list.model';
import { ListFactory } from '~/app/models/list/list.factory';
import { Product } from '~/app/models/product/product.model';

@Injectable({
    providedIn: 'root'
})
export class ListService {
    public static readonly LISTS_STORAGE = 'purchase_products_lists';

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
        // const list = new ListLocal('t1', { name: 'first', createdAt: new Date() });
        // const list2 = new ListLocal('t2', { name: 'second', createdAt: new Date() });
        // const list3 = new ListLocal('t2', { name: 'second', createdAt: new Date() });
        // const list4 = new ListLocal('t2', { name: 'second', createdAt: new Date() });
        // const list5 = new ListLocal('t2', { name: 'second', createdAt: new Date() });
        // const list6 = new ListLocal('t2', { name: 'second', createdAt: new Date() });
        // const list7 = new ListLocal('t2', { name: 'second', createdAt: new Date() });
        // const list8 = new ListLocal('t2', { name: 'second', createdAt: new Date() });
        // const list44 = new ListLocal('t2', { name: 'second', createdAt: new Date() });
        // const list92 = new ListLocal('t2', { name: 'second', createdAt: new Date() });
        // const list22 = new ListLocal('t2', { name: 'second', createdAt: new Date() });
        // const list21 = new ListLocal('t2', { name: 'second', createdAt: new Date() });
        //
        // return of([list, list2, list3, list4, list5, list6, list7, list8, list44, list92, list22, list21]);
        // // return of([]);
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
