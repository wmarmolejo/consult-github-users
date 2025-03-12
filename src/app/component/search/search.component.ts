import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserApiService } from '../../service/user-api.service';

@Component({
  selector: 'app-search',
  imports: [NgFor, NgIf, FormsModule, RouterModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {

  username: string = '';
  users: any[] = [];
  isInvalidWord: boolean = false;

  constructor(private userService: UserApiService) {}

  searchUsers() {
    if (this.username.trim()) {
      this.userService.getUsers(this.username).subscribe(users => {
        this.users = users;
      });
    }
  }

  validateInput() {
    this.isInvalidWord = this.username.toLowerCase().includes('doublevpartners'); //constante
  }

}
