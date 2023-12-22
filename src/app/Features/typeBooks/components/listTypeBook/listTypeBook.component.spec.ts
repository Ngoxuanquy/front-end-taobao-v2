/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListTypeBookComponent } from './listTypeBook.component';

describe('ListTypeBookComponent', () => {
  let component: ListTypeBookComponent;
  let fixture: ComponentFixture<ListTypeBookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListTypeBookComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListTypeBookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
