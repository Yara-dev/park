import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChauffeurComponent } from './chauffeur.component';

describe('MonPremierComponent', () => {
  let component: ChauffeurComponent;
  let fixture: ComponentFixture<ChauffeurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChauffeurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChauffeurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
