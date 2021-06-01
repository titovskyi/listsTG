import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { CONFIG } from '../../assets/config';
import { ListFactory } from './list.factory';
import { List, ListShared } from '~/app/models/list/list.model';
import { Product } from '~/app/models/product/product.model';

@Injectable({
    providedIn: 'root'
})
export class SharedListService {
    constructor(private http: HttpClient, private listFactory: ListFactory) {}

    public getAll(): Observable<ListShared[]> {
        return this.http.get<ListShared[]>(`${CONFIG.API}/list/user-lists`);
    }

    public getOne(id: number): Observable<ListShared> {
        return this.http.get<ListShared>(`${CONFIG.API}/list/${id}`);
    }

    public addProductToList(id: string, products?: Product[]): Observable<ListShared> {
        return this.http.post<ListShared>(`${CONFIG.API}/list/${id}`, { products: products });
    }

    public update(list) {}

    public remove(id: number) {
        return this.http.delete(`${CONFIG.API}/list/user-lists/${id}`);
    }

    public share(list: List, phone: string): Observable<ListShared> {
        return this.http.put<ListShared>(`${CONFIG.API}/list/share`, { list, phone });
    }
}
