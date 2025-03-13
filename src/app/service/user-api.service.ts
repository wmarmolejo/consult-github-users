
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AppConstants } from '../util/app-constant';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  
  
  constructor(private http: HttpClient) {}

  getUsers(username: string): Promise<any[]> {
    return new Promise((resolve, reject) => {
      this.http.get<{ items: any[] }>(`${AppConstants.API_BASE_URL_SEARCH}${username}`)
        .pipe(map(response => response.items.slice(0, 10)))
        .subscribe({
          next: data => resolve(data),
          error: err => reject(err)
        });
    });
  }

  getUserDetails(username: string): Observable<any> {
    return this.http.get<any>(`${AppConstants.API_BASE_URL_USERS}${username}`);
  }

  getUserFollower(username: string): Promise<any> {
    return firstValueFrom(this.http.get<any>(`${AppConstants.API_BASE_URL_USERS}${username}`));
  }

}