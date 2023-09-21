import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoDetalleComponent } from './auto-detalle.component';

describe('AutoDetalleComponent', () => {
  let component: AutoDetalleComponent;
  let fixture: ComponentFixture<AutoDetalleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutoDetalleComponent]
    });
    fixture = TestBed.createComponent(AutoDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
