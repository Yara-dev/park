import { Component, OnInit ,ViewContainerRef} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { ChauffeurService } from '../../services/chauffeur.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
let apiUrl = 'http://localhost:8888/serveurs/logis/';
@Component({
  selector: 'voyage',
  templateUrl: './chauffeur.component.html',
  styleUrls: ['./chauffeur.component.scss']
})
export class ChauffeurComponent implements OnInit {

  results:any;
  items:any;
 nom:string;
 permit:string;
 telephone:string;
 adresse:string;
 id_pri:number;
 a:boolean;
 e:boolean;
 en:boolean;
 fou:boolean;
 fourni:string;
 action:string;
 resultat:any;
 id_chauffeur:number;
  constructor(private chauffeur:ChauffeurService,private http:Http,public toastr: ToastsManager,vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
    this.e=false;
    this.en=true;
    this.a=true;
    this.fou=false;
    this.laod();
    this.nom ='';
    this.permit='';
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
    else if(this.permit =='')
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

      this.chauffeur.createchauffeur(c.nom,c.telephone,c.permit,c.adresse,this.action="news").subscribe(data => {
        this.resultat = data;
        if (this.resultat.result == "success") {

            this.toastr.success('Chauffeur Ajouter', 'Success!');
            //this.getall();
        }
        else {
            this.toastr.error('Error', 'Error!');
        }

    });

// this.http.get(apiUrl+"fournisseur.php?nom="+c.nom+"&email="+c.email+"&telephone="+c.telephone+"&adresse="+c.adresse).map(res => res.json()).subscribe(data => {
    
//      // console.log(data);
//       this.toastr.success('Enregistrement', 'Success!');
//       this.laod();
//    });
    }



    
   }




  laod(){
this.chauffeur.getallchauffeur(this.action="all").subscribe(data =>{
  this.items = data;
});

}

 Edit(id:number){

this.chauffeur.info_id(id,this.action="edit").subscribe(data =>{
  this.id_chauffeur=data.id_chauffeur;
this.nom = data.nom;
this.telephone =data.telephone;
this.permit =data.permit;
this.adresse = data.adresse;
this.en =false;
this.e=true;
});


}




envoie(ee)
{
this.fourni=ee.nomf;
this.http.get(apiUrl+"onefournisseur.php?four="+this.fourni).map(res => res.json()).subscribe(data => {
 this.items =data;
    
 });
}

update(id_chauffeur:number,nom:string,permit:any,telephone:any,adresse:any)
{
  this.id_chauffeur=this.id_chauffeur;
  this.nom=nom;
  this.permit=permit;
  this.telephone=telephone;
  this.adresse=adresse;
  //console.log(this.adresse);

   if(this.nom =='')
    {
      this.toastr.error('Champ Nom  vide', 'Error!');
    }
    else if(this.permit =='')
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
 this.chauffeur.updatechauffeur(this.id_chauffeur,this.nom,this.telephone,this.permit,this.adresse,this.action='upda').subscribe(data =>{
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
