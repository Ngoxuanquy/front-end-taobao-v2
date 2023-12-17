/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoaddingComponent } from './loadding.component';

describe('LoaddingComponent', () => {
  let component: LoaddingComponent;
  let fixture: ComponentFixture<LoaddingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoaddingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoaddingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
