import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpScoreEditComponent } from './emp-score-edit.component';

describe('EmpScoreEditComponent', () => {
  let component: EmpScoreEditComponent;
  let fixture: ComponentFixture<EmpScoreEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmpScoreEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpScoreEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
