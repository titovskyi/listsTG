import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { CONFIG } from '../../assets/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  // #############################################

  constructor(private http: HttpClient) {}

  // #############################################
  
  public check(): Observable<boolean> {
    return this.http.get<boolean>(`${CONFIG.API}/user`);
  }
  
  public login(phone: string): Observable<{authToken: string}> {
    return this.http.post<{authToken: string}>(`${CONFIG.API}/user/login`, {phone});
  }

  // #############################################
}