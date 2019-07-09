import { Component, OnInit,ViewContainerRef } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { AboutService } from '../../services/about.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
let apiUrl = 'http://localhost:8888/serveurs/logis/';
@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit {
  results:any;
  items:any;
 designation:string;
 reference:string;
 prix:string;
 commentaire:string;
 id_pri:number;
 e:boolean;
 en:boolean;
prod:string;
  constructor(private about:AboutService,private http:Http,public toastr: ToastsManager,vcr: ViewContainerRef) { 

    this.toastr.setRootViewContainerRef(vcr);
    this.e=false;
    this.en=true;
    this.laod();
    this.designation='';
    this.reference='';
    this.prix='';
    this.commentaire='';
    
  }

  ngOnInit() {
  }


 //Ajout Vehicule 
 onSave(c){
 if(this.designation =='')
    {
      this.toastr.error('Champ Designation  vide', 'Error!');
    }
    else if(this.reference =='')
    {
 this.toastr.error('Champ Reference vide', 'Error!');
    }
     else if(this.prix == '')
    {
     this.toastr.error('Champ Prix vide', 'Error!'); 
    }
    else if(this.commentaire == '')
    {
     this.toastr.error('Champ Commentaire vide', 'Error!'); 
    }
 else
 {

  this.http.get(apiUrl+"produit.php?designation="+c.designation+"&reference="+c.reference+"&commentaire="+c.commentaire+"&prix="+c.prix).map(res => res.json()).subscribe(data => {
  
  //  console.log(data);
    this.toastr.success('Enregistrement Produit', 'Success!');
    this.laod();
 });
 }

 }
 
 
 
 
   laod(){
     this.http.get(apiUrl+"liste_prod.php").map(res => res.json()).subscribe(data => {
       this.items = data;
      // console.log(data);
 
    });
 }




 test(id_:number,designation:string,reference:string,prix:string,commentaire:string)
 {
   this.id_pri=id_;
   this.designation=designation;
   this.reference=reference;
   this.prix=prix;
   this.commentaire=commentaire;
 
  
   this.http.get(apiUrl+"update.php?designation="+this.designation+"&reference="+this.reference+"&id_prod="+this.id_pri+"&prix="+this.prix+"&commentaire="+this.commentaire).map(res => res.json()).subscribe(data => {
     
    // console.log(data);
     this.toastr.success('Modification', 'Success!');
     this.laod();
  });
 
 }





envoie(ee)
{
this.prod=ee.nomp;
this.http.get(apiUrl+"onefournisseur.php?prod="+this.prod).map(res => res.json()).subscribe(data => {
 this.items =data;
    
 });
}

Edit(id:number){

 
  this.about.info_produit(id).subscribe(
         
    data => {
      this.results= data;
      
      this.designation=this.results.designation;
      this.reference=this.results.reference;
      this.prix=this.results.prix;
      this.commentaire=this.results.commentaire;
      this.id_pri=this.results._id;
      this.e=true;
      this.en=false;


      
    },
    err => {
     
    },
    () => console.log('Movie Search Complete')
);


} 

delete(id_:number){
this.id_pri=id_;
  this.http.get(apiUrl+"delete.php?id_prod="+this.id_pri).map(res => res.json()).subscribe(data => {
    
   // console.log(data);
    this.toastr.error('Suppression', 'Success!');
    this.laod();
 });
}



}
