import { BrowserModule } from '@angular/platform-browser';

import { NgModule } from '@angular/core';
import {ReactiveFormsModule, FormsModule, FormBuilder, Validators,FormControlDirective} from '@angular/forms';
import { AppComponent } from './app.component';
import { MonPremierComponent } from './mon-premier/mon-premier.component';
import { AboutComponent } from './about/about.component';
import { AboutService } from '../services/about.service';
import { NgbProgressbarConfig} from '../services/progression';
import {Routes, RouterModule} from '@angular/router';
import { GalleryComponent } from './gallery/gallery.component';
import { HttpModule } from '@angular/http';
import {ToastModule} from 'ng2-toastr/ng2-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { VehiculeComponent } from './vehicule/vehicule.component';
import { ProduitComponent } from './produit/produit.component';
import { DataTableModule } from 'angular2-datatable';
import { AffectationComponent } from './affectation/affectation.component';
import { RapportComponent } from './rapport/rapport.component';
import { RapportFournisseurComponent } from './rapport-fournisseur/rapport-fournisseur.component';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { RvoitureComponent } from './rvoiture/rvoiture.component';
import { MenuComponent } from './menu/menu.component';
import { AuthService } from './auth/auth.service';
import { ClientService  } from '../services/client.service';
import { DepenseService  } from '../services/depense.service';
import { ChauffeurService  } from '../services/chauffeur.service';
import { VoyageService  } from '../services/voyage.service';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard} from './auth/admin.guard';
import './rxjs-operators';
import { AppRoutingModule } from './app-routing.module';
import { CommandeComponent } from './commande/commande.component';
import { SituationComponent } from './situation/situation.component';
import { VehiculesComponent } from './vehicules/vehicules.component';
import { EtatComponent } from './etat/etat.component';
import { ParametreComponent } from './parametre/parametre.component';
import { ProfilComponent } from './profil/profil.component';
import { VoyageComponent } from './voyage/voyage.component';
import {HashLocationStrategy,LocationStrategy} from '@angular/common';
import { ClientComponent } from './client/client.component';
import { ChauffeurComponent } from './chauffeur/chauffeur.component';
@NgModule({
  declarations: [
    AppComponent,
    MonPremierComponent,
    AboutComponent,
    GalleryComponent,
    VehiculeComponent,
    ProduitComponent,
    AffectationComponent,
    RapportComponent,
    RapportFournisseurComponent,
    LoginComponent,
    AccueilComponent,
   RvoitureComponent,
   MenuComponent,
   CommandeComponent,
   VoyageComponent,
   SituationComponent,
   VehiculesComponent,
   EtatComponent,
   ParametreComponent,
   ProfilComponent,
   ClientComponent,
   ChauffeurComponent
  ],
  imports: [
    BrowserModule,ReactiveFormsModule,
    FormsModule,HttpModule,ToastModule.forRoot(),AppRoutingModule,BrowserAnimationsModule,DataTableModule,NgbModule.forRoot()
  ],
  providers: [AboutService,DepenseService,ClientService,ChauffeurService,VoyageService,NgbProgressbarConfig, AuthService, AuthGuard,AdminGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
