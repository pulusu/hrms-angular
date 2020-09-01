import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpDepartmentsComponent } from './emp-departments.component';

describe('EmpDepartmentsComponent', () => {
  let component: EmpDepartmentsComponent;
  let fixture: ComponentFixture<EmpDepartmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpDepartmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpDepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
