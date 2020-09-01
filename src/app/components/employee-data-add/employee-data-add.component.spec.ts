import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDataAddComponent } from './employee-data-add.component';

describe('EmployeeDataAddComponent', () => {
  let component: EmployeeDataAddComponent;
  let fixture: ComponentFixture<EmployeeDataAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmployeeDataAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeeDataAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
