import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerModelosComponent } from './ver-modelos.component';

describe('VerModelosComponent', () => {
  let component: VerModelosComponent;
  let fixture: ComponentFixture<VerModelosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VerModelosComponent]
    });
    fixture = TestBed.createComponent(VerModelosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
