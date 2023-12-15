/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Layout_containerComponent } from './layout_container.component';

describe('Layout_containerComponent', () => {
  let component: Layout_containerComponent;
  let fixture: ComponentFixture<Layout_containerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Layout_containerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Layout_containerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
