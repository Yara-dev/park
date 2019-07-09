import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../auth/auth.service';
import 'rxjs/add/operator/map';
let apiUrl = 'http://localhost:8888/serveurs/logis/';
@Component({
  selector: 'app-vehicules',
  templateUrl: './vehicules.component.html',
  styleUrls: ['./vehicules.component.scss']
})
export class VehiculesComponent implements OnInit {
vehi:any;
somme:any;
 datefins:any;
  datedeb:any;
  droit: Observable<boolean>;
  constructor(private http:Http,private authService: AuthService) { 

  this.datefins ='';
   this.datedeb ='';
this.droit = authService.isdroit();
  }

  ngOnInit() {
  }





  chercher(c)
  {


    this.http.get(apiUrl+"global.php?date_debut="+c.date_debut+"&date_fin="+c.date_fin).map(res => res.json()).subscribe(data => {
    
      //console.log(data);
      this.vehi = data;
   // alert(data.prix);
     

   this.http.get(apiUrl+"tout.php?date_debut="+c.date_debut+"&date_fin="+c.date_fin).map(res => res.json()).subscribe(data => {
    
    //console.log(data);
    this.somme = data.result;
 // alert(data.prix);
   
    
   
 });




      
     
   });
  }


  imprime_zon(STAROIL,event)
  {
  var zi = document.getElementById(event).innerHTML;
  
  var f = window.open("","ZoneImpr", "height=700, width=800,toolbar=0, menubar=1, scrollbars=1, resizable=no,status=1, location=1, left=10, top=10");
  
  f.document.body.style.color = '#000';
  f.document.body.style.backgroundColor = '#FFFFFF';
  //f.document.body.style.padding = "0px";
  
  f.document.title = STAROIL;
  f.document.body.innerHTML += "" + zi + "";
  
  f.window.print();
  f.window.close();
  return true;
  }


}
