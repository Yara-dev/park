import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../auth/auth.service';
@Component({
  selector: 'app-rapport',
  templateUrl: './rapport.component.html',
  styleUrls: ['./rapport.component.scss']
})
export class RapportComponent implements OnInit {
droit: Observable<boolean>;
  constructor(private authService: AuthService) { 


     this.droit = authService.isdroit();
  }

  ngOnInit() {
  }

}
