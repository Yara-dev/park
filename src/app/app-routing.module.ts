import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';
import { AdminGuard as RoleGuard} from './auth/admin.guard';
import { LoginComponent } from './login/login.component';
import { AccueilComponent } from './accueil/accueil.component';
import { MonPremierComponent } from './mon-premier/mon-premier.component';
import { AboutComponent } from './about/about.component';
import { GalleryComponent } from './gallery/gallery.component';
import { RapportComponent } from './rapport/rapport.component';
import { AffectationComponent } from './affectation/affectation.component';
import { RapportFournisseurComponent } from './rapport-fournisseur/rapport-fournisseur.component';
import { RvoitureComponent } from './rvoiture/rvoiture.component';
import { CommandeComponent } from './commande/commande.component';
import { SituationComponent } from './situation/situation.component';
import { VehiculeComponent } from './vehicule/vehicule.component';
import { VehiculesComponent } from './vehicules/vehicules.component';
import { EtatComponent } from './etat/etat.component';
import { ParametreComponent } from './parametre/parametre.component';
import { ProduitComponent } from './produit/produit.component';
import { ProfilComponent } from './profil/profil.component';
import { VoyageComponent } from './voyage/voyage.component';
import { ClientComponent } from './client/client.component';
import { ChauffeurComponent } from './chauffeur/chauffeur.component';
const routes: Routes = [
  { path: '', component: AccueilComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'fournisseur', component: MonPremierComponent},
  { path: 'vehicule', component: AboutComponent },
  { path: 'produit', component: GalleryComponent },
  { path: 'rapport', component: RapportComponent },
  { path: 'affecter', component: AffectationComponent},
  { path: 'rapportfournisseur', component: RapportFournisseurComponent},
   { path: 'rvoiture', component: RvoitureComponent},
   { path: 'commande', component: CommandeComponent},
   { path: 'situation', component: SituationComponent},
   { path: 'vehicules', component: VehiculesComponent},
   { path: 'etat', component: EtatComponent},
   { path: 'user', component: ProduitComponent},
   { path: 'profil', component: ProfilComponent},
   { path: 'voyage', component: VoyageComponent},
   { path: 'parametre', component: ParametreComponent},
   { path: 'client', component: ClientComponent},
   { path: 'chauffeur', component: ChauffeurComponent},
   // otherwise redirect to home
   { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }