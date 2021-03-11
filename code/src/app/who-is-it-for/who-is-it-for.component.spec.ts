import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhoIsItForComponent } from './who-is-it-for.component';

describe('WhoIsItForComponent', () => {
  let component: WhoIsItForComponent;
  let fixture: ComponentFixture<WhoIsItForComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhoIsItForComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhoIsItForComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
