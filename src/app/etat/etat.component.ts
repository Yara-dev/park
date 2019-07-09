import { Component, OnInit } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
let apiUrl = 'http://localhost:8888/serveurs/logis/';
@Component({
  selector: 'app-etat',
  templateUrl: './etat.component.html',
  styleUrls: ['./etat.component.scss']
})
export class EtatComponent implements OnInit {
items_etat:any;
  constructor(private http:Http) { 

    this.laodetat();
  }

  ngOnInit() {
  }





  laodetat(){
    this.http.get(apiUrl+"etat.php").map(res => res.json()).subscribe(data => {
      this.items_etat = data;
     // console.log(data);
  
   });
  }

}
