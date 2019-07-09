import { Component, OnInit,ViewContainerRef} from '@angular/core';
import { AuthService } from './../auth/auth.service';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
let apiUrl = 'http://localhost:8888/serveurs/logis/';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  logins:any;
  isLoggedIn: Observable<boolean>;
  results:any;
  droit:any;
  infos :any;
  constructor(private http:Http,public toastr: ToastsManager,vcr: ViewContainerRef,private authService: AuthService) {
    this.toastr.setRootViewContainerRef(vcr);
  
   }

  ngOnInit() {
    
    //this.authService.logout();
   
  }
  onSave(c)
  {
 
    this.authService.login(c.login,c.password);
  localStorage.setItem('user',c.login);

  this.http.get(apiUrl+"admin.php?login="+c.login+"&password="+c.password).map(res => res.json()).subscribe(data => {
    this.results = data.result;
  
    if(this.results  == "success")
    {
      this.toastr.success('Connexion Reussie', 'Information!');
     
      localStorage.setItem('droit',data.droits);
    }
    else{
      this.toastr.error('Mot de passe ou Login incorrect', 'Attention!');
     // 
    }
 });

  }




}