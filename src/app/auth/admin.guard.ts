import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot,Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';
import 'rxjs/add/operator/take';
import decode from 'jwt-decode';
@Injectable()
export class AdminGuard implements CanActivate {


constructor(
  private authService: AuthService,
  private router: Router)
{

}
canActivate(): Observable<boolean> | Promise<boolean> | boolean {
  if (this.authService.isdroit()) {
    return true;
  }
  this.router.navigate(['/']);
  return false;
}


}