import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PruebaMiscComponent } from './prueba-misc.component';

describe('PruebaMiscComponent', () => {
  let component: PruebaMiscComponent;
  let fixture: ComponentFixture<PruebaMiscComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PruebaMiscComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PruebaMiscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
