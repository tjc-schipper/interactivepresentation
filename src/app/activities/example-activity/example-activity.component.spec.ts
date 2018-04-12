import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExampleActivityComponent } from './example-activity.component';

describe('ExampleActivityComponent', () => {
  let component: ExampleActivityComponent;
  let fixture: ComponentFixture<ExampleActivityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExampleActivityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExampleActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
