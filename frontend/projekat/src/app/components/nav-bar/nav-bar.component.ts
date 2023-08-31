import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/model/user';
import { AuthService } from 'src/app/services/auth.service';
import { BookingService } from 'src/app/services/booking.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  
  user: User;

  constructor(private bookingService: BookingService,
              private auth: AuthService,
              private router: Router, private userService: UserService) {

  }

  ngOnInit(): void {
    
    this.userService.getUser().subscribe((response)=> {
      console.log(response);
      this.user = response;
      localStorage.setItem('role', response.role_id.toString());
      localStorage.setItem('user', JSON.stringify(this.user));
    })
  }

  logout(): void {
    this.auth.logout().subscribe((response)=> {
      console.log(response);
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('user');
      this.router.navigate(['login']);

    })
    
  }
}
