import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpLeaveRequestsComponent } from './emp-leave-requests.component';

describe('EmpLeaveRequestsComponent', () => {
  let component: EmpLeaveRequestsComponent;
  let fixture: ComponentFixture<EmpLeaveRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpLeaveRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpLeaveRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
