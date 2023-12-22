/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { List_booksComponent } from './list_books.component';

describe('List_booksComponent', () => {
  let component: List_booksComponent;
  let fixture: ComponentFixture<List_booksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ List_booksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(List_booksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
