import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpDataEditComponent } from './emp-data-edit.component';

describe('EmpDataEditComponent', () => {
  let component: EmpDataEditComponent;
  let fixture: ComponentFixture<EmpDataEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpDataEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpDataEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
