import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormUpdateuComponent } from './form-updateu.component';

describe('FormUpdateuComponent', () => {
  let component: FormUpdateuComponent;
  let fixture: ComponentFixture<FormUpdateuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FormUpdateuComponent]
    });
    fixture = TestBed.createComponent(FormUpdateuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
