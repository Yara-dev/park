import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions, Response } from "@angular/http";
import { Observable } from "rxjs";
@Injectable()
export class ClientService 
{
    baseUrl:string = 'http://localhost:8888/serveurs/logis/client.php';

    constructor(private http: Http) {
        
    }

    createclient(nom:string,telephone: any,email:any,adresse:any,action: any) {
        var postData = JSON.stringify({ nom: nom,telephone:telephone,email:email,adresse:adresse,action:action });
        return this.http.post(this.baseUrl, postData).map((response: Response) => response.json());
    }

    updateclient(id:any,nom:string,telephone: any,email:any,adresse:any,action: any) {
        var postData = JSON.stringify({id:id, nom: nom,telephone:telephone,email:email,adresse:adresse,action:action });
        return this.http.post(this.baseUrl, postData).map((response: Response) => response.json());
    }

    getallclient(action:any) {
        var postData = JSON.stringify({action: action });
        return this.http.post(this.baseUrl, postData).map((response: Response) => response.json());
    }

    info_id(id:any,action:any){
        var postData = JSON.stringify({id:id,action: action });
        return this.http.post(this.baseUrl, postData).map((response: Response) => response.json());  
    }
}