
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UserApiService {
  private apiUrl = 'https://api.github.com/search/users?q='; 
  private userUrl = 'https://api.github.com/users/';
  
  constructor(private http: HttpClient) {}

  getUsers(username: string): Observable<any[]> {
    return this.http.get<{ items: any[] }>(`${this.apiUrl}${username}`).pipe(
      map(response => response.items.slice(0, 10)));
  }

  getUserDetails(username: string): Observable<any> {
    return this.http.get<any>(`${this.userUrl}${username}`);
  }

}