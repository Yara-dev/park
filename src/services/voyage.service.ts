import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs";
@Injectable()
export class VoyageService 
{
    baseUrl:string = 'http://localhost:8888/serveurs/logis/voyage.php';

    constructor(private http: Http) {
        
    }

    createvoyage(date:string,vehicule:any,client:any,chauffeur:any,destination:any,marchandises:any,action: any) {
        var postData = JSON.stringify({ date:date,vehicule:vehicule,client:client,chauffeur:chauffeur,destination:destination,marchandises:marchandises,action:action});
        return this.http.post(this.baseUrl, postData).map((response: Response) => response.json());
    }

    createmonvoyage(unite:any,designation:any,quantite:any,prix:any,commentaire_voyage:any,id_voyage:number,action:any) {
        var postData = JSON.stringify({unite:unite,designation:designation,quantite:quantite,prix:prix,commentaire_voyage:commentaire_voyage,id_voyage:id_voyage,action: action});
        return this.http.post(this.baseUrl, postData).map((response: Response) => response.json());
    }

    updatevoyage(id:any,date:string,vehicule: any,client:any,chauffeur:any,destination:any,marchandises:any,action: any) {
        var postData = JSON.stringify({id:id,date:date,vehicule:vehicule,client:client,chauffeur:chauffeur,destination:destination,marchandises:marchandises,action:action });
        return this.http.post(this.baseUrl, postData).map((response: Response) => response.json());
    }

    updateretour(id:any,unite:string,designation_produit: any,quantite:any,prix:any,commentaire:any,action: any) {
        var postData = JSON.stringify({id:id,unite:unite,designation_produit:designation_produit,quantite:quantite,prix:prix,commentaire:commentaire,action:action });
        return this.http.post(this.baseUrl, postData).map((response: Response) => response.json());
    }


    updatefrais(id:any,designation_frais:string,quantite_frais: any,prix_frais:any,frais_commentaire:any,action: any) {
        var postData = JSON.stringify({id:id,designation_frais:designation_frais,quantite_frais:quantite_frais,prix_frais:prix_frais,frais_commentaire:frais_commentaire,action:action});
        return this.http.post(this.baseUrl, postData).map((response: Response) => response.json());
    }

    updateetat(id:any,action:any) {
        var postData = JSON.stringify({id:id,action:action });
        return this.http.post(this.baseUrl, postData).map((response: Response) => response.json());
    }

    getallretourmarchandises(id:any,action:any) {
        var postData = JSON.stringify({id:id,action:action});
        return this.http.post(this.baseUrl, postData).map((response: Response) => response.json());
    }


    updateservice(id_voyage:any,action:any) {
        var postData = JSON.stringify({id_voyage:id_voyage,action:action });
        return this.http.post(this.baseUrl, postData).map((response: Response) => response.json());
    }

    getallvoyage(action:any) {
        var postData = JSON.stringify({action:action});
        return this.http.post(this.baseUrl, postData).map((response: Response) => response.json());
    }

    getallmonvoyage(id_voyage:number,action:any) {
        var postData = JSON.stringify({id_voyage:id_voyage,action:action});
        return this.http.post(this.baseUrl, postData).map((response: Response) => response.json());
    }

    

    info_id(id:any,action:any){
        var postData = JSON.stringify({id:id,action: action });
        return this.http.post(this.baseUrl, postData).map((response: Response) => response.json());  
    }

    info_frais(id:any,action:any){
        var postData = JSON.stringify({id:id,action: action });
        return this.http.post(this.baseUrl, postData).map((response: Response) => response.json());  
    }

    getallvehicule(action:any) {
        var postData = JSON.stringify({action:action});
        return this.http.post(this.baseUrl, postData).map((response: Response) => response.json());
    }



    gettout(id_voyage:number,action:any) {
        var postData = JSON.stringify({id_voyage:id_voyage,action:action});
        return this.http.post(this.baseUrl, postData).map((response: Response) => response.json());
    }


}