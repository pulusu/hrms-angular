import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrSocialMediaComponent } from './hr-social-media.component';

describe('HrSocialMediaComponent', () => {
  let component: HrSocialMediaComponent;
  let fixture: ComponentFixture<HrSocialMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrSocialMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrSocialMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
