import { Component, OnInit } from '@angular/core';
import {Http,Response, Headers, RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
//let apiUrl = 'http://staroilmali.africa-soft.ml/';
@Component({
  selector: 'app-rapport-fournisseur',
  templateUrl: './rapport-fournisseur.component.html',
  styleUrls: ['./rapport-fournisseur.component.scss']
})
export class RapportFournisseurComponent implements OnInit {
items_four:any;
four:any;
tota:any;
apiUrl: any  = 'http://localhost:8888/serveurs/logis/';
  constructor(private http:Http) { 

    this.laodfournisseur();
    
  }

  ngOnInit() {
  }



  laodfournisseur(){
    this.http.get(this.apiUrl+'listes.php').map(res => res.json()).subscribe(data => {
      this.items_four = data;
      console.log(data);
  
   });
  }


  chercher(c)
  {

//this.getheader();
    this.http.get(this.apiUrl+"rapport_four.php?id_four="+c.id_four+"&date_debut="+c.date_debut+"&date_fin="+c.date_fin).map(res => res.json()).subscribe(data => {
    
      console.log(data);
      this.four = data;
      if(this.four)
      {
        this.http.get(this.apiUrl+"detail.php?id_four="+c.id_four+"&date_debut="+c.date_debut+"&date_fin="+c.date_fin).map(res => res.json()).subscribe(data => {
    
      console.log(data);
      this.tota= data;
     
   });
      }
      
     
   });
  }



 




  imprime_zon(STAROIL,event)
  {
  var zi = document.getElementById(event).innerHTML;
  
  var f = window.open("","ZoneImpr", "height=700, width=800,toolbar=0, menubar=1, scrollbars=1, resizable=no,status=1, location=1, left=10, top=10");
  
  //f.document.body.style.color = '#000000';
  //f.document.body.style.backgroundColor = '#FFFFFF';
  //f.document.body.style.padding = "10px";
  
  f.document.title = STAROIL;
  f.document.body.innerHTML += "" + zi + "";
  
  f.window.print();
  f.window.close();
  return true;
  }


  getheader()
  {

    const headers = new Headers();
    headers.append("Cache-Control", "no-cache");
        headers.append('Access-Control-Allow-Origin', '*');
        headers.append('Access-Control-Allow-Methods', 'GET, POST');
        headers.append('Access-Control-Max-Age', '1728000');
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
      return this.http.get(this.apiUrl);
  }


  

}
