import { Injectable } from "@angular/core";
import {Http} from '@angular/http';
let apiUrl = 'http://localhost:8888/serveurs/logis/';
@Injectable()
export class AboutService{

constructor(private http:Http){


}
    

login(login,password) {

    var url=apiUrl;
          var da=apiUrl+"admin.php?login="+login+"&password="+password;
        var response = this.http.get(da).map(res => res.json());
        return response;
    
      }  


      info_id(id){

        var url=apiUrl;
        var da=apiUrl+"info_four.php?id="+id;
      var response = this.http.get(da).map(res => res.json());
      return response;

      }

      info_vehicule(id){

        var url=apiUrl;
        var da=apiUrl+"info_four.php?id_veh="+id;
      var response = this.http.get(da).map(res => res.json());
      return response;

      }  



      info_produit(id){

        var url=apiUrl;
        var da=apiUrl+"info_four.php?id_prod="+id;
      var response = this.http.get(da).map(res => res.json());
      return response;

      }  


      info_admin(id){

        var url=apiUrl;
        var da=apiUrl+"info_four.php?id_admin="+id;
      var response = this.http.get(da).map(res => res.json());
      return response;

      } 


      logout()
      {
        localStorage.removeItem("user");
      }

}