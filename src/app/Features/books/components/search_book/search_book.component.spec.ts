/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Search_bookComponent } from './search_book.component';

describe('Search_bookComponent', () => {
  let component: Search_bookComponent;
  let fixture: ComponentFixture<Search_bookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Search_bookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Search_bookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
