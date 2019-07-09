import { Component, OnInit ,ViewContainerRef} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { AboutService } from '../../services/about.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
let apiUrl = 'http://localhost:8888/serveurs/logis/';
@Component({
  selector: 'app-mon-premier',
  templateUrl: './mon-premier.component.html',
  styleUrls: ['./mon-premier.component.scss']
})
export class MonPremierComponent implements OnInit {

  results:any;
  items:any;
 nom:string;
 email:string;
 telephone:string;
 adresse:string;
 id_pri:number;
 e:boolean;
 en:boolean;
 fou:boolean;
 fourni:string;
  constructor(private about:AboutService,private http:Http,public toastr: ToastsManager,vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
    this.e=false;
    this.en=true;
    this.fou=false;
    this.laod();
    this.nom ='';
    this.email='';
    this.telephone='';
    this.adresse='';
  }

  ngOnInit() {
   
  }

  //Ajout Vehicule 
  onSave(c){

 if(this.nom =='')
    {
      this.toastr.error('Champ Nom  vide', 'Error!');
    }
    else if(this.email =='')
    {
 this.toastr.error('Champ Email vide', 'Error!');
    }
     else if(this.telephone == '')
    {
     this.toastr.error('Champ Telephone vide', 'Error!'); 
    }
    else if(this.adresse == '')
    {
     this.toastr.error('Champ Adresse vide', 'Error!'); 
    }
    else

    {

this.http.get(apiUrl+"fournisseur.php?nom="+c.nom+"&email="+c.email+"&telephone="+c.telephone+"&adresse="+c.adresse).map(res => res.json()).subscribe(data => {
    
     // console.log(data);
      this.toastr.success('Enregistrement', 'Success!');
      this.laod();
   });
    }



    
   }




  laod(){
    this.http.get(apiUrl+"listes.php").map(res => res.json()).subscribe(data => {
      this.items = data;
      //console.log(data);

   });
}

Edit(id:number){

 
  this.about.info_id(id).subscribe(
         
    data => {
      this.results= data;
      
      this.nom=this.results.nom;
      this.email=this.results.email;
      this.telephone=this.results.telephone;
      this.adresse=this.results.adresse;
      this.id_pri=this.results._id;
      this.e=true;
      this.en=false;


      
    },
    err => {
     
    },
    () => console.log('Movie Search Complete')
);


} 

envoie(ee)
{
this.fourni=ee.nomf;
this.http.get(apiUrl+"onefournisseur.php?four="+this.fourni).map(res => res.json()).subscribe(data => {
 this.items =data;
    
 });
}

test(id_:number,nom:string,email:string,telephone:string,adresse:string)
{
  this.id_pri=id_;
  this.nom=nom;
  this.email=email;
  this.telephone=telephone;
  this.adresse=adresse;
  //console.log(this.adresse);

   if(this.nom =='')
    {
      this.toastr.error('Champ Nom  vide', 'Error!');
    }
    else if(this.email =='')
    {
 this.toastr.error('Champ Email vide', 'Error!');
    }
     else if(this.telephone == '')
    {
     this.toastr.error('Champ Telephone vide', 'Error!'); 
    }
    else if(this.adresse == '')
    {
     this.toastr.error('Champ Adresse vide', 'Error!'); 
    }

    else
    {
 
  this.http.get(apiUrl+"update.php?nom_four="+this.nom+"&email="+this.email+"&telephone="+this.telephone+"&adresse="+this.adresse+"&id_pri="+this.id_pri).map(res => res.json()).subscribe(data => {
    
    //console.log(data);
    this.toastr.success('Modification', 'Success!');
    this.laod();
 });
    }
}


delete(id_:number){
this.id_pri=id_;
  this.http.get(apiUrl+"delete.php?id_pri="+this.id_pri).map(res => res.json()).subscribe(data => {
    
   // console.log(data);
    this.toastr.error('Suppression', 'Success!');
    this.laod();
 });
}



}
