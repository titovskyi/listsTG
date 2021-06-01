import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '~/app/models/product/product.model';
import { ListShared } from '~/app/models/list/list.model';
import { Observable } from 'rxjs';
import { CONFIG } from '~/app/assets/config';

@Injectable({
    providedIn: 'root'
})
export class ShareProductService {
    constructor(private http: HttpClient) {}

    // addProduct(products: Product[]): Observable<void> {}

    removeProdFromList(prodId: number): Observable<void> {
        return this.http.delete<void>(`${CONFIG.API}/product/${prodId}`);
    }

    updateProductStatus(id: string, status: boolean) {
        return this.http.put<void>(`${CONFIG.API}/product/${id}`, { status });
    }

    updateProd(prodId: number, status: boolean) {}
}
