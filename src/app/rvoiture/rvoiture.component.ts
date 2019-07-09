import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import {Http,Headers,Response} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../auth/auth.service';
import 'rxjs/add/operator/map';
import * as jsPDF from 'jspdf';
let apiUrl = 'http://localhost:8888/serveurs/logis/';
@Component({
  selector: 'app-rvoiture',
  templateUrl: './rvoiture.component.html',
  styleUrls: ['./rvoiture.component.scss']
})
export class RvoitureComponent implements OnInit { 
  @ViewChild('content') content: ElementRef;
  items_vehi:any;
  vehi:any;
  somme:any;
  vehicules:any;
  datefins:any;
  datedeb:any;
  vehiculesplaque:any;
    droit: Observable<boolean>;
  constructor(private http:Http,private authService: AuthService) { 
    this.laodvehicule();
   this.vehicules ='';
   this.datefins ='';
   this.datedeb ='';
   this.droit = authService.isdroit();
  }

  ngOnInit() {
  }


  onChange(newValue) {
    this.http.get(apiUrl+"info_four.php?id_veh="+this.vehicules).map(res => res.json()).subscribe(data => {
     // console.log(data);
      this.vehiculesplaque = data.marque + " - " + data.plaque;
  
   });
  }

 

  laodvehicule(){
    this.http.get(apiUrl+"listes_veh.php").map(res => res.json()).subscribe(data => {
      this.items_vehi = data;
     

   });
}




chercher(c)
  {





    this.http.get(apiUrl+"date_v.php?id_veh="+c.id_veh+"&date_debut="+c.date_debut+"&date_fin="+c.date_fin).map(res => res.json()).subscribe(data => {
    
      // console.log(data);
       this.somme= data.result;
    // alert(data.prix);
      
       
      
    });


    this.http.get(apiUrl+"voiture_rapport.php?id_veh="+c.id_veh+"&date_debut="+c.date_debut+"&date_fin="+c.date_fin).map(res => res.json()).subscribe(data => {
    
      console.log(data);
      this.vehi = data;
   // alert(data.prix);
     





      
     
   });
  }

  telecharger(){

let doc = new jsPDF();
let specialElementHandlers = {
'#editor': function(element,renderer)
{
  return true;
}
};

let content =this.content.nativeElement;
doc.fromHTML(content.innerHTML,40,40,{
'elementHandlers' : specialElementHandlers
});
doc.save('test.pdf');
  }





  imprime_zon(STAROIL,event)
  {
  var zi = document.getElementById(event).innerHTML;
  
  var f = window.open("","ZoneImpr", "height=700, width=800,toolbar=0, menubar=1, scrollbars=1, resizable=no,status=1, location=1, left=10, top=10");
  
  f.document.body.style.color = '#000';
  f.document.body.style.backgroundColor = '#FFFFFF';
  //f.document.body.style.textalign = "center";
  document.getElementById(event).style.textAlign = "center"; 
  f.document.title = STAROIL;
  f.document.body.innerHTML += "" + zi + "";
  
  f.window.print();
  f.window.close();
  return true;
  }

}


