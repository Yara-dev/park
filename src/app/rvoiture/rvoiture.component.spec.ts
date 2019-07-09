import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RvoitureComponent } from './rvoiture.component';

describe('RvoitureComponent', () => {
  let component: RvoitureComponent;
  let fixture: ComponentFixture<RvoitureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RvoitureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RvoitureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
