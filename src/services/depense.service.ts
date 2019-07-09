import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs";
@Injectable()
export class DepenseService 
{
    baseUrl:string = 'http://localhost:8888/serveurs/logis/depense.php';

    constructor(private http: Http) {
        
    }

    createdepense(frais:any,montant:any,quantite:any,prix:any,commentaire:any,id_voyage:number,action: any) {
        var postData = JSON.stringify({ frais:frais,montant:montant,quantite:quantite,prix:prix,commentaire:commentaire,id_voyage:id_voyage,action:action});
        return this.http.post(this.baseUrl, postData).map((response: Response) => response.json());
    }

    updatedepense(id:any,designation:any,commentaire:any,action: any) {
        var postData = JSON.stringify({id:id,designation:designation,commentaire:commentaire,action:action });
        return this.http.post(this.baseUrl, postData).map((response: Response) => response.json());
    }

    getallvoyage(action:any) {
        var postData = JSON.stringify({action:action});
        return this.http.post(this.baseUrl, postData).map((response: Response) => response.json());
    }

    

    info_id(id:any,action:any){
        var postData = JSON.stringify({id:id,action: action });
        return this.http.post(this.baseUrl, postData).map((response: Response) => response.json());  
    }

    getalldepense(action:any) {
        var postData = JSON.stringify({action:action});
        return this.http.post(this.baseUrl, postData).map((response: Response) => response.json());
    }
    getallfrais(id_voyage:number,action:any) {
        var postData = JSON.stringify({id_voyage:id_voyage,action:action});
        return this.http.post(this.baseUrl, postData).map((response: Response) => response.json());
    }


}