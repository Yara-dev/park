import { Component, OnInit ,ViewContainerRef} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { ClientService } from '../../services/client.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
let apiUrl = 'http://localhost:8888/serveurs/logis/';
@Component({
  selector: 'voyage',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  results:any;
  items:any;
 nom:string;
 email:string;
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
 id_client:number;
  constructor(private client:ClientService,private http:Http,public toastr: ToastsManager,vcr: ViewContainerRef) { 
    this.toastr.setRootViewContainerRef(vcr);
    this.e=false;
    this.en=true;
    this.a=true;
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

      this.client.createclient(c.nom,c.telephone,c.email,c.adresse,this.action="news").subscribe(data => {
        this.resultat = data;
        if (this.resultat.result == "success") {

            this.toastr.success('Clients Ajouter', 'Success!');
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
this.client.getallclient(this.action="all").subscribe(data =>{
  this.items = data;
});

}

 Edit(id:number){

this.client.info_id(id,this.action="edit").subscribe(data =>{
  this.id_client=data.id_client;
this.nom = data.nom;
this.telephone =data.telephone;
this.email =data.email;
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

update(id_client:number,nom:string,email:string,telephone:string,adresse:string)
{
  this.id_client=id_client;
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
 this.client.updateclient(this.id_client,this.nom,this.telephone,this.email,this.adresse,this.action='upda').subscribe(data =>{
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
