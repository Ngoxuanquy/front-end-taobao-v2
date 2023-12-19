/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { QlDanhMucSachComponent } from './QlDanhMucSach.component';

describe('QlDanhMucSachComponent', () => {
  let component: QlDanhMucSachComponent;
  let fixture: ComponentFixture<QlDanhMucSachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QlDanhMucSachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QlDanhMucSachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
