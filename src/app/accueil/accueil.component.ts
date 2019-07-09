import { Component, OnInit } from '@angular/core';
import {NgbProgressbarConfig} from '@ng-bootstrap/ng-bootstrap';
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {








 apiUrl: any  = 'http://localhost:8888/serveurs/logis/';
tabfour:any;

  constructor(config: NgbProgressbarConfig,private http:Http,private router:Router) { 

    config.max = 1000;
    config.striped = true;
    config.animated = true;
    config.type = 'danger';
    config.height = '50px';

    this.tabfournisseur();

    

  }

  ngOnInit() {

    if(localStorage.getItem('user'))
    {
  
      
     // this.droit.next(1);
          this.router.navigate(['/']);
    }
    else{
      this.router.navigate(['/login']);
    }

  }
  tabfournisseur(){
    this.http.get(this.apiUrl+ "tab_four.php").map(res => res.json()).subscribe(data => {
      this.tabfour = data;
      console.log(data);
  
   });
  }



            

}
