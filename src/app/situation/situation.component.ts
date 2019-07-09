import { Component, OnInit,ViewContainerRef} from '@angular/core';
import {Http} from '@angular/http';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import 'rxjs/add/operator/map';
let apiUrl = 'http://localhost:8888/serveurs/logis/';
@Component({
  selector: 'app-situation',
  templateUrl: './situation.component.html',
  styleUrls: ['./situation.component.scss']
})
export class SituationComponent implements OnInit {
  items_four:any;
  items_aff:any;
  check:boolean;
  etats:boolean;
  etatsub:boolean;
  coun:number;
  constructor(private http:Http,public toastr: ToastsManager,vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);

    this.laodfournisseur();
  }

  ngOnInit() {
  }




  laodfournisseur(){
    this.http.get(apiUrl+"listes.php").map(res => res.json()).subscribe(data => {
      this.items_four = data;
      console.log(data);
  
   });
  }

  onSave(c){
    this.http.get(apiUrl+"livraison.php?id_four="+c.id_four+"&etat="+c.etat).map(res => res.json()).subscribe(data => {
             
      console.log(data);
      this.items_aff = data;
      if(c.etat==3)
      {
        this.etats=true;
       // console.log(this.etats);
       
      }

      else{
        this.etats=false;
       // console.log(this.etats);
      }
      
   });
  }




  onClicked(f, event) {
  this.coun = 0;
    for (var i = 0; i < this.items_aff.length; i++) {
       // console.log("test --- " + this.items_aff[i].id_aff);
        if (this.items_aff[i].id_aff == event.target.value) {
            this.items_aff[i].checked = event.target.checked;
            this.check=event.target.checked;

          //  this.checkedList.push( this.items_aff[i].id_aff); 


            this.http.get(apiUrl+"selects.php?id_affe="+this.items_aff[i].id_aff+"&boole="+this.check+"&user="+localStorage.getItem('user')).map(res => res.json()).subscribe(data => {
           
              
           });
           
            
        }
      //  console.log("after update of checkbox :" + this.items_aff[i].checked);
       // console.log("after update of Data :" + this.items_aff[i].id_aff);
       // console.log("after update of Data :" + event.target.value);
        //console.log(this.coun);
       
    }
    
  }





  onSaves(c){
    this.http.get(apiUrl+"sav.php").map(res => res.json()).subscribe(data => {
             
     // console.log(data);
     this.toastr.success('Enregistrement Prise en Charge', 'Success!');

     this.http.get(apiUrl+"livraison.php?id_four="+c.id_four+"&etat="+c.etat).map(res => res.json()).subscribe(data => {
             
      console.log(data);
      this.items_aff = data;
      if(c.etat==3)
      {
        this.etats=true;
       // console.log(this.etats);
       
      }

      else{
        this.etats=false;
       // console.log(this.etats);
      }
      
   });
    
   });
  }


}
