import { Component, OnInit,ViewContainerRef  } from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import { AboutService } from '../../services/about.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Router } from '@angular/router';
let apiUrl = 'http://localhost:8888/serveurs/logis/';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
passe:any;
  constructor(private http:Http,public toastr: ToastsManager,vcr: ViewContainerRef,private router: Router) {
    this.toastr.setRootViewContainerRef(vcr);

this.passe = '';

   }

  ngOnInit() {
  }






    //Ajout Vehicule 
    onSave(c){
      if(this.passe =='')
      {
        this.toastr.error('Champ User  vide', '!');
      }
    
  else{
  this.http.get(apiUrl+"profil.php?login="+localStorage.getItem('user')+"&passe="+c.passe).map(res => res.json()).subscribe(data => {
      
        if(data.result == "success")
        {
          this.toastr.success('Mot de Passe Modifier', 'Success!');
          localStorage.removeItem('user');
          localStorage.removeItem('droit');
          this.toastr.error('Deconnexion', 'Information!');
          this.router.navigate(['/login']);
        }
        else
        {
          this.toastr.success('Erreur', 'Information!');
        }
        
     });
  }
   
      
     }

}
