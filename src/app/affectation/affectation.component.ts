import { Component, OnInit,ViewContainerRef} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { AboutService } from '../../services/about.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
let apiUrl = 'http://localhost:8888/serveurs/logis/';
@Component({
  selector: 'app-affectation',
  templateUrl: './affectation.component.html',
  styleUrls: ['./affectation.component.scss']
})
export class AffectationComponent implements OnInit {
  items_vehi:any;
  items_four:any;
  items_produit :any;
  items_aff:any;
  id_pri:number;
  i_f:number;
  id_vehicule:number;
  quantite:any;
  id_prod:any;
  id_veh:any;
  enre:boolean;
  constructor(private http:Http,public toastr: ToastsManager,vcr: ViewContainerRef) { 

    this.toastr.setRootViewContainerRef(vcr);
this.quantite = 1;
this.laodvehicule();
this.laodfournisseur();
this.laodproduit();
this.laodaff();
this.id_prod = '';
this.id_veh = '';
  }

  ngOnInit() {
   this.reset();
  }




  laodvehicule(){
    this.http.get(apiUrl+"listes_veh.php").map(res => res.json()).subscribe(data => {
      this.items_vehi = data;
     // console.log(data);

   });
}



laodfournisseur(){
  this.http.get(apiUrl+"listes.php").map(res => res.json()).subscribe(data => {
    this.items_four = data;
    //console.log(data);

 });
}



laodproduit(){
  this.http.get(apiUrl+"liste_prod.php").map(res => res.json()).subscribe(data => {
    this.items_produit = data;
   // console.log(data);

 });
}




 //Ajout Vehicule 
 onSave(c){
if(this.id_prod < 1)
{

alert("Selectionner un Prodduit");
}

else if(this.id_veh < 1)
{

alert("Selectionner un Vehicule");
}
else
{

  this.http.get(apiUrl+"affectation.php?id_veh="+c.id_veh+"&id_prod="+c.id_prod+"&quantite="+c.quantite+"&user="+localStorage.getItem('user')).map(res => res.json()).subscribe(data => {
  
   // console.log(data);
    this.toastr.success(' Produit Ajouter', 'Success!');
    this.laodaff();
    this.enre = true;
 });

}

 }



 laodaff(){
  this.http.get(apiUrl+"listeaff.php").map(res => res.json()).subscribe(data => {
    this.items_aff = data;
  //  console.log(data);

   

 });
}





delete(id_:number){
  this.id_pri=id_;
    this.http.get(apiUrl+"delete_aff.php?id_pri="+this.id_pri).map(res => res.json()).subscribe(data => {
      
     // console.log(data);
      this.toastr.success('Annulation Produit', 'Success!');
      this.laodaff();
    
   });
  }

  



  reset()
  {
    
      this.http.get(apiUrl+"reset.php").map(res => res.json()).subscribe(data => {
        
       // console.log(data);
       // this.toastr.success('Annulation Produit', 'Success!');
        this.laodaff();
     });
    }



  saves(){
  
    this.http.get(apiUrl+"update_aff.php").map(res => res.json()).subscribe(data => {
      
     // console.log(data);
      this.toastr.success('Enregistrement Prise en Charge', 'Success!');
      this.laodaff();
      this.enre=false;
   });
   


  }

 
}
