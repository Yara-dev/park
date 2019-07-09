import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportFournisseurComponent } from './rapport-fournisseur.component';

describe('RapportFournisseurComponent', () => {
  let component: RapportFournisseurComponent;
  let fixture: ComponentFixture<RapportFournisseurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RapportFournisseurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportFournisseurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
