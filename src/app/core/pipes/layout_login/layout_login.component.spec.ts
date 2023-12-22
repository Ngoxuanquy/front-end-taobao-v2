/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Layout_loginComponent } from './layout_login.component';

describe('Layout_loginComponent', () => {
  let component: Layout_loginComponent;
  let fixture: ComponentFixture<Layout_loginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Layout_loginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Layout_loginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
