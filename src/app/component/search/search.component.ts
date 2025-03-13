import { AfterViewInit, Component, OnChanges, ViewChild } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserApiService } from '../../service/user-api.service';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { NgxEchartsModule } from 'ngx-echarts';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [ FormsModule, MatTableModule, MatButtonModule ,NgxEchartsModule , RouterModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent  {

  userLogin: string[] = [];
  barChartOptions: any; //---

  //----
  displayedColumns: string[] = ['id', 'login'];
 
  username: string = '';
  users: any[] = [];
  isInvalidWord: boolean = false;
  
  constructor(private userService: UserApiService) {}


  searchUsers() {
    let followerUsers: [string, number][] = [];
    
    if (this.username.trim()) {
        this.userService.getUsers(this.username).then(users => {
            this.users = users;
            this.userLogin = users.map(user => user.login);

            let promises = this.userLogin.map(username => {
                return this.userService.getUserFollower(username).then(data => {
                    let followersCount = data.followers;
                    followerUsers.push([username, followersCount]);
                });
            });

            Promise.all(promises).then(() => {
                this.generateChartData(followerUsers);
            });
        });
    }
}

  validateInput() {
    this.isInvalidWord = this.username.toLowerCase().includes('doublevpartners'); 
  }

  generateChartData(dataUsers: [string, number][]) {
    console.log("generate"+dataUsers);
    
    var nameMap: string[] = dataUsers.map(item => item[0]);
  
    var followerMap: number[] = dataUsers.map(item => item[1]);

    this.barChartOptions = {
      title: { text: 'Número de seguidores de los usuarios', left: 'center' },
      tooltip: {},
      xAxis: { data: nameMap },
      yAxis: {},
      series: [{
        type: 'bar',
        data: followerMap,
        itemStyle: { color: '#36a2eb' }
      }]
    };
  }

  
  }
