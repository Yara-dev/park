import { Component, OnInit ,ViewContainerRef} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { AboutService } from '../../services/about.service';
import { VoyageService  } from '../../services/voyage.service';
import { DepenseService  } from '../../services/depense.service';
import { ClientService } from '../../services/client.service';
import { ChauffeurService } from '../../services/chauffeur.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
let apiUrl = 'http://localhost:8888/serveurs/logis/';
@Component({
  selector: 'voyage',
  templateUrl: './voyage.component.html',
  styleUrls: ['./voyage.component.scss']
})
export class VoyageComponent implements OnInit {
  nomchauffeur:any;
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
 action:string;
 listeveh:any;
 listeclient:any;
 listechauffeur:any;
 date_depart:any;
 id_client:any=1;
 id_chauffeur:any;
 id_veh:any;
 marchandises:any;
 destination:any;
 listevoyage:any;
 id_voyage:number;
 listedepense:any;
 listefrais:any;
 id_trans:number;
 listemonvoyage:any;
 frais:boolean;
 id_fr:number;

//boolean insertion marchandises
en_retour:boolean;
mo_retour:boolean;
//recuperation info retourn marchandises
id_service:any;
  unite:any;
  designation_produit:any;
  quantite_retour:any;
  prix_retour:any;
  commentaire_retour:any;

 //EDIT FRAIS

 id_frais:any;
 designation_frais:any;
 prix_frais:any;
 quantite_frais:any;
 frais_commentaire:any;
  constructor(private chauffeur:ChauffeurService,private depense:DepenseService,private client:ClientService,private about:AboutService,private voyage:VoyageService,private http:Http,public toastr: ToastsManager,vcr: ViewContainerRef) { 
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
   this.toutvehicule();
   this.toutclient();
   this.toutchauffeur();
   this.affichevoyage();
   this.affichedepense();
   //this.affichefrais();
  // this.affichemonvoyage();
  }

  //frais

  onsavefrais(s){
   this.depense.createdepense(s.id_depense,s.montant,s.quantite_frais,s.prix_frais,s.commentaire,this.id_voyage,this.action='news').subscribe(data=>{
    this.toastr.success('Enregistrement', 'Success!');
    this.affichefrais();
   });
  }
confir(id:number){
  this.en_retour=true;
  this.mo_retour=false;
this.id_trans=id;
this.affichemonvoyage();
this.voyage.gettout(this.id_trans,this.action="touts").subscribe(data =>{
  this.nomchauffeur=data.chauffeur;

  
    });
}

confirmer(){
    this.voyage.updateetat(this.id_trans,this.action='updatetravel').subscribe(data =>{
      if(data.result=='success')
      {
        this.toastr.success('Voyage Mise A jour', 'Success!');
        
      }
      else if(data.result=='error')
      {
        this.toastr.error('Erreur Enregistrer', 'Error!'); 
      }
      else if(data.result=='depense')
      {
        this.toastr.error('Merci de Renseigner les Frais de route', 'Error!');  
      }
      
      this.affichevoyage();
    })
    
  }

infor(s)
{
  this.voyage.createmonvoyage(s.unite,s.designation_produit,s.quantite,s.prix,s.commentaire_voyage,this.id_trans,this.action="newsmontant").subscribe(data=>{
    this.toastr.success('Enregistrer', 'Success!');
    this.affichemonvoyage();
  })
}


fin(){
  alert(this.id_trans);
  this.voyage.updateservice(this.id_trans,this.action="fin").subscribe(data=>{
    if(data.result=='success')
    {
      this.toastr.success('Voyage Terminer', 'Success!');
    }
    else if(data.result=='error')
    {
      this.toastr.error('Erreur Enregistrer', 'Error!'); 
    }
    else if(data.result=='depense')
    {
      this.toastr.error('Merci de Renseigner les Montant du Marchandises', 'Error!');  
    }
    
    this.affichevoyage();
  })
}
 
  onsavevoyage(s){
   
    alert(s.prix);
  }

  //Ajout Vehicule 
  onSave(c){

 if(this.date_depart =='')
    {
      this.toastr.error('Champ Date depart  vide', 'Error!');
    }
    else if(this.id_client =='')
    {
 this.toastr.error('Champ Client vide', 'Error!');
    }
     else if(this.id_veh == '')
    {
     this.toastr.error('Champ Vehicule vide', 'Error!'); 
    }
    else if(this.id_chauffeur == '')
    {
     this.toastr.error('Champ Chauffeur vide', 'Error!'); 
    }
    else

    {
this.voyage.createvoyage(c.date_depart,c.id_veh,c.id_client,c.id_chauffeur,c.destination,c.marchandises,this.action="news").subscribe(data=>{
  this.toastr.success('Enregistrement', 'Success!');
  this.affichevoyage();
});

    }



    
   }


toutvehicule(){
  this.voyage.getallvehicule(this.action="allvehicule").subscribe(data =>{
this.listeveh=data;
console.log(this.listeveh);
  });
}


toutfrais(){
  
}


toutclient(){
  this.client.getallclient(this.action="all").subscribe(data =>{
    this.listeclient = data;
  });
  
  }

  toutchauffeur(){
    this.chauffeur.getallchauffeur(this.action="all").subscribe(data =>{
      this.listechauffeur = data;
    });
    
    }

  laod(){

    this.http.get(apiUrl+"listes.php").map(res => res.json()).subscribe(data => {
      this.items = data;
      //console.log(data);

   });
}

affichevoyage(){
  this.voyage.getallvoyage(this.action='allvoyage').subscribe(data=>{
    this.listevoyage=data;
  })
}


affichemonvoyage(){
  this.voyage.getallmonvoyage(this.id_trans,this.action='allmonvoyage').subscribe(data=>{
    this.listemonvoyage=data;


  })
}

//edit service

Editservice(id:number){
 this.en_retour=false;
 this.mo_retour=true;
 this.voyage.getallretourmarchandises(id,this.action="inforetour").subscribe(data =>{
  this.id_service=data.id_service;
  this.unite=data.unite;
  this.designation_produit=data.designation;
  this.quantite_retour=data.quantite;
  this.prix_retour=data.prix;
  this.commentaire_retour=data.commentaire;
 

 })
}

//Modification retour marchandises

updatereturn(s){
this.voyage.updateretour(s.id_service,s.unite,s.designation_produit,s.quantite_retour,s.prix_retour,s.commentaire_retour,this.action="updateretour").subscribe(data=>{
this.affichemonvoyage();
})
  
}


//affichage liste depense

affichedepense(){
  this.depense.getalldepense(this.action='alldepense').subscribe(data=>{
    this.listedepense=data;
  })
}
news(){
  //this.date_depart='';
   // this.destination='';
    //this.marchandises='';
   
   
  
    
  this.en=true;
  this.e=false;
  
}

affichefrais(){
  this.depense.getallfrais(this.id_voyage,this.action='allfrais').subscribe(data=>{
    this.listefrais=data;
  })
}

depenses(id:number)
{
  this.prix_frais='';
  this.designation_frais='';
  this.quantite_frais='';
  this.frais_commentaire='';
  this.frais=false;
  this.id_voyage=id;
  this.affichefrais();
}

Edit(id:number){

  this.voyage.info_id(id,this.action='edit').subscribe(data=>{

    this.id_voyage=data.id_voyage;
    this.id_client=data.client;
    this.id_veh=data.vehicule;
    this.id_chauffeur=data.chauffeur;
    this.date_depart=data.date_depart;
    this.destination=data.destination;
    this.marchandises=data.marchandises;
    this.e=true;
    this.en=false;

  })
 


} 


Editfrais(id:number){

  this.voyage.info_frais(id,this.action='editfrais').subscribe(data=>{

    this.id_voyage=data.id_voyage;
    this.id_fr=data.id_frais;
    this.designation_frais=data.designation;
    this.prix_frais=data.prix;
    this.quantite_frais=data.quantite;
    this.frais_commentaire=data.commentaire;
    this.frais=true;
  console.log(id);
    //this.e=true;
    //this.en=false;

  })
 


} 

envoie(ee)
{
this.fourni=ee.nomf;
this.http.get(apiUrl+"onefournisseur.php?four="+this.fourni).map(res => res.json()).subscribe(data => {
 this.items =data;
    
 });
}

test(id:number,date_depart:any,id_veh:any,id_client:any,id_chauffeur:any,destination:any,marchandises:any)
{
  this.id_voyage=id;
  this.id_chauffeur=id_chauffeur;
  this.id_client=id_client;
  this.id_veh=id_veh;
  this.destination=destination;
  this.marchandises=marchandises;
  this.date_depart=date_depart;
  //console.log(this.adresse);

   if(this.id_chauffeur =='')
    {
      this.toastr.error('Champ Nom  vide', 'Error!');
    }
    else if(this.id_client =='')
    {
 this.toastr.error('Champ Email vide', 'Error!');
    }
     else if(this.id_veh == '')
    {
     this.toastr.error('Champ Telephone vide', 'Error!'); 
    }
    else if(this.destination == '')
    {
     this.toastr.error('Champ Adresse vide', 'Error!'); 
    }
    else if(this.marchandises == '')
    {
     this.toastr.error('Champ Adresse vide', 'Error!'); 
    }

    else
    {
 this.voyage.updatevoyage(this.id_voyage,this.date_depart,this.id_veh,this.id_client,this.id_chauffeur,this.destination,this.marchandises,this.action='upda').subscribe(data=>{
  this.toastr.success('Modification', 'Success!');
  this.affichevoyage();
 })
 
    }
}



//modification 
editsfrais(s)
{
 
  console.log(s.id_fr);
  console.log(s.designation_frais);
  this.voyage.updatefrais(s.id_fr,s.designation_frais,s.quantite_frais,s.prix_frais,s.frais_commentaire,this.action="updatefrais").subscribe(data => {
    
    // console.log(data);
     this.toastr.error('Suppression', 'Success!');
    // this.laod();
  });
}


delete(id_:number){
this.id_pri=id_;
  this.http.get(apiUrl+"delete.php?id_pri="+this.id_pri).map(res => res.json()).subscribe(data => {
    
   // console.log(data);
    this.toastr.error('Suppression', 'Success!');
    this.laod();
 });
}





printCrossword(container) {
  var DocumentContainer = document.getElementById(container).innerHTML;
  var WindowObject = window.open('', "PrintWindow", "height=700, width=800,toolbar=0, menubar=1, scrollbars=1, resizable=no,status=1, location=1, left=10, top=10");
  WindowObject.document.writeln("<html><body><style> html,body,div,span,applet,object,iframe,h1,h2,h3,h4, h5, h6, p, blockquote, pre, a, abbr, acronym,  address, big, cite, code, del,  dfn,  em,  img,  ins,  kbd,  q,  s,  samp,  small, strike, strong, sub, sup,  tt,   var,   b,   u,  i,   center,   dl,   dt,   dd,   ol,   ul,   li,   fieldset,   form,  label,   legend,   table,  caption,  tbody,  tfoot,   thead,   tr,   th,   td,  article,   aside,  canvas,  details,  embed,  figure,  figcaption,  footer,  header,  hgroup,  menu,  nav,  output,  ruby,  section,  total,  time,  mark,  audio,v video{margin:0;padding:0;border:0;font-size:100%;font:inherit;vertical-align:baseline}   article,   aside,   details,  figcaption,figure,  footer,  header,  hgroup,  menu,  nav,  section{display:block}  body{line-height:1}  ol,ul{list-style:none}  blockquote,q{quotes:none}  blockquote:before,blockquote:after,q:before,q:after{content:'';content:none}  table{border-collapse:collapse;border-spacing:0}  body{height:840px;width:592px;margin:auto;font-family:'Open Sans',sans-serif;font-size:12px}  strong{font-weight:700} {position:relative;padding:4%} #header{height:80px} #header > #reference{float:right;text-align:right} #header > #reference h3{margin:0} #header > #reference h4{margin:0;font-size:85%;font-weight:600} #header > #reference p{margin:0;margin-top:2%;font-size:85%} #header > #logo{width:50%;float:left} #fromto{height:160px}  #fromto > #from,#fromto > #to{width:45%;min-height:90px;margin-top:30px;font-size:85%;padding:1.5%;line-height:120%}#fromto > #from{float:left;width:45%;background:#efefef;margin-top:30px;font-size:85%;padding:1.5%}  #fromto > #to{float:right;border:solid grey 1px}#items{margin-top:10px}#items > p{font-weight:700;text-align:right;margin-bottom:1%;font-size:65%}  #items > table{width:100%;font-size:85%;border:solid grey 1px}#items > table th:first-child{text-align:left}#items > table th{font-weight:400;padding:1px 4px}#items > table td{padding:1px 4px}#items > table th:nth-child(2),#items > table th:nth-child(4){width:45px}#items > table th:nth-child(3){width:60px}#items > table th:nth-child(5){width:80px}#items > table tr td:not(:first-child){text-align:right;padding-right:1%}#items table td{border-right:solid grey 1px;border:solid grey 1px}#items table tr td{padding-top:3px;padding-bottom:3px;height:10px}#items table tr:nth-child(1){border:solid grey 1px}#items table tr th{border-right:solid grey 1px;padding:3px} #items table tr:nth-child(2) > td{padding-top:8px}#summary{height:170px;margin-top:30px}#summary #note{float:left}#summary #note h4{font-size:10px;font-weight:600;font-style:italic;margin-bottom:4px}#summary #note p{font-size:10px;font-style:italic}#summary #total table{font-size:85%;width:260px;float:right}#summary #total table td{padding:3px 4px}#summary #total table tr td:last-child{text-align:right}#summary #total table tr:nth-child(3){background:#efefef;font-weight:600}#footer{margin:auto;position:absolute;left:4%;bottom:4%;right:4%;border-top:solid grey 1px}#footer p{margin-top:1%;font-size:65%;line-height:140%;text-align:center}</style>");

  WindowObject.document.writeln(DocumentContainer);
  WindowObject.document.writeln('</body></html>');
  WindowObject.document.close();
  WindowObject.focus();
  WindowObject.print();
  WindowObject.close();
}

}
