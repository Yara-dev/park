import { Component, OnInit,ViewContainerRef } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { AboutService } from '../../services/about.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import {ReactiveFormsModule, FormsModule, FormBuilder, Validators} from '@angular/forms';
let apiUrl = 'http://localhost:8888/serveurs/logis/';
@Component({
  selector: 'app-commande',
  templateUrl: './commande.component.html',
  styleUrls: ['./commande.component.scss']
})
export class CommandeComponent implements OnInit {
  items_four:any;
  items_aff:any;
  id_four:string;
checkedList : any[];
isselect:boolean;
date:any;
check:boolean;
  constructor(private http:Http,public toastr: ToastsManager,vcr: ViewContainerRef) { 

    this.toastr.setRootViewContainerRef(vcr);
    this.checkedList = [];
this.laodfournisseur();

this.laodaffecter();
this.isselect=false;
this.date = '0';

  }

  ngOnInit() {
  }
  laodfournisseur(){
    this.http.get(apiUrl+"listes.php").map(res => res.json()).subscribe(data => {
      this.items_four = data;
      //console.log(data);
  
   });
  }


  laodaffecter(){
    this.http.get(apiUrl+"listedemande.php").map(res => res.json()).subscribe(data => {
      this.items_aff = data;
    //  console.log(data);
  
   });
  }


  onClicked(f, event) {



  
    for (var i = 0; i < this.items_aff.length; i++) {
       // console.log("test --- " + this.items_aff[i].id_aff);
        if (this.items_aff[i].id_aff == event.target.value) {
            this.items_aff[i].checked = event.target.checked;
            this.check=event.target.checked;

            this.checkedList.push( this.items_aff[i].id_aff); 





this.http.get(apiUrl+"select.php?id_affe="+this.items_aff[i].id_aff+"&boole="+this.check+"&date="+this.date+"&user="+localStorage.getItem('user')).map(res => res.json()).subscribe(data => {
             
             // console.log(data);
           });


            
           
            
        }
      //  console.log("after update of checkbox :" + this.items_aff[i].checked);
       // console.log("after update of Data :" + this.items_aff[i].id_aff);
      //  console.log("after update of Data :" + event.target.value);

       
    }




  }

  onSave(c){
    if(this.date == '0')
      {
 this.toastr.error('Champ Date Commande vide', 'Attention !');
      }
      else
      {
             
              this.http.get(apiUrl+"saveall.php?id_four="+c.id_four+"&date="+this.date).map(res => res.json()).subscribe(data => {
      
      this.toastr.success('Fournisseur Selectionner', 'Success!');
      //console.log(data);
      this.laodaffecter();
   });
      }
   
  }


  onChange(newValue) {
  // console.log(newValue);
    this.isselect=true;
    // ... do other stuff here ...
}


}
