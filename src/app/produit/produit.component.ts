import { Component, OnInit,ViewContainerRef } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { AboutService } from '../../services/about.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';
let apiUrl = 'http://localhost:8888/serveurs/logis/';
@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.scss']
})
export class ProduitComponent implements OnInit {

  user:string;
  passe:string;
  id_pri:number;
  e:boolean;
  en:boolean;
  results:any;
  items:any;

  constructor(private about:AboutService,private http:Http,public toastr: ToastsManager,vcr: ViewContainerRef,private router: Router) { 


    this.toastr.setRootViewContainerRef(vcr);
    this.e=false;
    this.en=true;
this.laod();
  }



   //Ajout Vehicule 
   onSave(c){
    if(this.user =='')
    {
      this.toastr.error('Champ User  vide', 'Attention!');
    }
    else if(this.passe =='')
    {
 this.toastr.error('Champ Mot de Passe vide', 'Attention!');
    }
  
else{
this.http.get(apiUrl+"inseradmin.php?user="+c.user+"&passe="+c.passe).map(res => res.json()).subscribe(data => {
    
      console.log(data);
      this.toastr.success('Vehicule Ajouter', 'Success!');
     this.laod();
   });
}
 
    
   }

   laod(){
    this.http.get(apiUrl+"listesadmin.php").map(res => res.json()).subscribe(data => {
      this.items = data;
      //console.log(data);

   });
}

   Edit(id:number){

 
    this.about.info_admin(id).subscribe(
           
      data => {
        this.results= data;
        
        this.user=this.results.user;
        this.passe=this.results.passe;
        
        this.id_pri=this.results._id;
        this.e=true;
        this.en=false;
  
  
        
      },
      err => {
       
      }),
      () => console.log('error');
  
  
  } 
  
  
  test(id_:number,user:string,passe:string)
  {
    this.id_pri=id_;
    this.user=user;
    this.passe=passe;
  
   
    this.http.get(apiUrl+"update.php?user="+this.user+"&passe="+this.passe+"&id_admin="+this.id_pri).map(res => res.json()).subscribe(data => {
      
      console.log(data);
      this.toastr.success('Modification', 'Success!');
      //this.laod();
   });
  
  }
  
  
  delete(id_:number){
  this.id_pri=id_;
    this.http.get(apiUrl+"delete.php?id_admin="+this.id_pri).map(res => res.json()).subscribe(data => {
      
     //console.log(data);
      this.toastr.error('Suppression', 'Success!');
      this.laod();
     // this.laod();
   });
  }


  ngOnInit() {
  }

}
