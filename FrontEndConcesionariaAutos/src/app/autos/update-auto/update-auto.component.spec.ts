import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateAutoComponent } from './update-auto.component';

describe('UpdateAutoComponent', () => {
  let component: UpdateAutoComponent;
  let fixture: ComponentFixture<UpdateAutoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UpdateAutoComponent]
    });
    fixture = TestBed.createComponent(UpdateAutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
