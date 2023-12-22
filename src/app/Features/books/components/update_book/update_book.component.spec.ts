/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { Update_bookComponent } from './update_book.component';

describe('Update_bookComponent', () => {
  let component: Update_bookComponent;
  let fixture: ComponentFixture<Update_bookComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Update_bookComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Update_bookComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
