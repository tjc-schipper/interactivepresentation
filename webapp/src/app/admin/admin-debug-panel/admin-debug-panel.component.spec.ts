import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDebugPanelComponent } from './admin-debug-panel.component';

describe('AdminDebugPanelComponent', () => {
  let component: AdminDebugPanelComponent;
  let fixture: ComponentFixture<AdminDebugPanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminDebugPanelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminDebugPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
