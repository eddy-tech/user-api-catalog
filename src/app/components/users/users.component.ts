import { Component, OnInit } from '@angular/core';
import {Response} from 'src/app/interfaces/response';
import {UserService} from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  response: Response;

  constructor(private userService: UserService){}


  ngOnInit(): void {
    this.userService.getUsers(15).subscribe({
      next: (data: Response) => {
        console.log(data);
        this.response = data;
      }
    }
    )
  }

}
