import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhyMyFyComponent } from './why-my-fy.component';

describe('WhyMyFyComponent', () => {
  let component: WhyMyFyComponent;
  let fixture: ComponentFixture<WhyMyFyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhyMyFyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhyMyFyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
