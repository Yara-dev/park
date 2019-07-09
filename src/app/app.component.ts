import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';
let apiUrl = 'http://staroilmali.africa-soft.ml/fournisseur/';
@Component({
  selector: 'app-root',
  template: `
    <app-menu></app-menu>
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class AppComponent {

 
constructor(private authService: AuthService)
{

  
}



}
