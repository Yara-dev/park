import { Component, OnInit,ViewContainerRef } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { AboutService } from '../../services/about.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';
let apiUrl = 'http://localhost:8888/serveurs/logis/';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  results:any;
  items:any;
 marque:string;
 plaque:string;
 telephone:string;
 adresse:string;
 id_pri:number;
 e:boolean;
 en:boolean;
 isLoggedIn:boolean;
vehicu:string;

  constructor(private about:AboutService,private http:Http,public toastr: ToastsManager,vcr: ViewContainerRef,private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);
    this.e=false;
    this.en=true;
    this.laod();
    this.marque='';
    this.plaque='';
    if(localStorage.getItem("user")) {
      this.isLoggedIn = true;
     
    }
    else
    {
      this.isLoggedIn =false;
      this.router.navigate(['login']);
    }
  

   }

  ngOnInit() {
  }

envoie(ee)
{
this.vehicu=ee.nomv;
this.http.get(apiUrl+"onefournisseur.php?veh="+this.vehicu).map(res => res.json()).subscribe(data => {
 this.items =data;
    
 });
}
  //Ajout Vehicule 
  onSave(c){
    if(this.marque =='')
    {
      this.toastr.error('Champ Marque  vide', 'Attention!');
    }
    else if(this.plaque =='')
    {
 this.toastr.error('Champ Plaque vide', 'Attention!');
    }
  
else{
this.http.get(apiUrl+"vehicule.php?marque="+c.marque+"&plaque="+c.plaque).map(res => res.json()).subscribe(data => {
    
      console.log(data);
      this.toastr.success('Vehicule Ajouter', 'Success!');
      this.laod();
   });
}
 
    
   }




   laod(){
    this.http.get(apiUrl+"listes_veh.php").map(res => res.json()).subscribe(data => {
      this.items = data;
      //console.log(data);

   });
}



Edit(id:number){

 
  this.about.info_vehicule(id).subscribe(
         
    data => {
      this.results= data;
      
      this.marque=this.results.marque;
      this.plaque=this.results.plaque;
      
      this.id_pri=this.results._id;
      this.e=true;
      this.en=false;


      
    },
    err => {
     
    }),
    () => console.log('error');


} 


test(id_:number,marque:string,plaque:string)
{
  this.id_pri=id_;
  this.marque=marque;
  this.plaque=plaque;

 
  this.http.get(apiUrl+"update.php?marque="+this.marque+"&plaque="+this.plaque+"&id_veh="+this.id_pri).map(res => res.json()).subscribe(data => {
    
    console.log(data);
    this.toastr.success('Modification', 'Success!');
    this.laod();
 });

}


delete(id_:number){
this.id_pri=id_;
  this.http.get(apiUrl+"delete.php?vehi="+this.id_pri).map(res => res.json()).subscribe(data => {
    
   //console.log(data);
    this.toastr.error('Suppression', 'Success!');
    this.laod();
 });
}






}
