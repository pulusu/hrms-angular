import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRunsComponent } from './add-runs.component';

describe('AddRunsComponent', () => {
  let component: AddRunsComponent;
  let fixture: ComponentFixture<AddRunsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddRunsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRunsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
