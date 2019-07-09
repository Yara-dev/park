import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
//import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { BehaviorSubject, Observable } from "rxjs";
import {Http} from '@angular/http';

@Injectable()
export class AuthService {
  apiUrl : any = 'http://127.0.0.1:8888/serveurs/logis/';
  isLoginSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLogindroit = new BehaviorSubject<boolean>(this.hasTokendroit());




  private hasToken() : boolean {
    return !!localStorage.getItem('user');
  }


  private hasTokendroit() : boolean {
   if(localStorage.getItem('droit') === 'true')
   {
return true;
   }
   else
   {
     return false;
   }
  }


  constructor(
    private router: Router,private http:Http
  ) {



 



    if(localStorage.getItem('user'))
    {

      this.isLoginSubject.next(true);
     
     // this.droit.next(1);
          this.router.navigate(['/']);
    }
    if(localStorage.getItem('droit') === 'true')
    {

      this.isLogindroit.next(true);
     
     // this.droit.next(1);
          this.router.navigate(['/']);
    }
    else{

      this.isLogindroit.next(false);
     
     // this.droit.next(1);
          this.router.navigate(['/']);
    }

   
  

  }


  isLoggedIn() : Observable<boolean> {
    return this.isLoginSubject.asObservable();
   }

   isdroit() : Observable<boolean> {
    return this.isLogindroit.asObservable();
   }

 

  login(login,password) {

   
          var da=this.apiUrl+"admin.php?login="+login+"&password="+password;
        this.http.get(da).map(res => res.json()).subscribe(data => {
     //console.log(data);
          if(data.result == "success")
          {

          this.isLoginSubject.next(true);

        if(data.droits === 'true')
    {

      this.isLogindroit.next(true);

     // this.droit.next(1);

    }
    else
    {

      this.isLogindroit.next(false);
      

    }

          this.router.navigate(['/']);

          

          }
          else
          {
           
          
            localStorage.removeItem('user'); 
            localStorage.removeItem('droit'); 
          }
        }); 
      }

  logout(){
    this.isLoginSubject.next(false);
  this.isLogindroit.next(null);
    localStorage.removeItem('user');
    localStorage.removeItem('droit');
    this.router.navigate(['/login']);
    

  }








}