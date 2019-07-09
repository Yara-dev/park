import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs";
@Injectable()
export class ChauffeurService 
{
    baseUrl:string = 'http://localhost:8888/serveurs/logis/chauffeur.php';

    constructor(private http: Http) {
        
    }

    createchauffeur(nom:string,telephone: any,permit:any,adresse:any,action: any) {
        var postData = JSON.stringify({ nom: nom,telephone:telephone,permit:permit,adresse:adresse,action:action });
        return this.http.post(this.baseUrl, postData).map((response: Response) => response.json());
    }

    updatechauffeur(id:any,nom:string,telephone: any,permit:any,adresse:any,action: any) {
        var postData = JSON.stringify({id:id, nom: nom,telephone:telephone,permit:permit,adresse:adresse,action:action });
        return this.http.post(this.baseUrl, postData).map((response: Response) => response.json());
    }

    getallchauffeur(action:any) {
        var postData = JSON.stringify({action: action });
        return this.http.post(this.baseUrl, postData).map((response: Response) => response.json());
    }

    info_id(id:any,action:any){
        var postData = JSON.stringify({id:id,action: action });
        return this.http.post(this.baseUrl, postData).map((response: Response) => response.json());  
    }
}