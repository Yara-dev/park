import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../auth/auth.service';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {
  isLoggedIn: Observable<boolean>;
droit: Observable<boolean>;

  constructor(private router: Router,private authService: AuthService,private http:Http) { 
 
    this.isLoggedIn = authService.isLoggedIn();
this.droit = authService.isdroit();
 console.log(this.isLoggedIn);
 console.log(this.droit);

  }

  ngOnInit() {
 
 
 
  }

 


  onLogout(){
    this.authService.logout();                   
  }




}
