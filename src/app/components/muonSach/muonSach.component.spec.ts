/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MuonSachComponent } from './muonSach.component';

describe('MuonSachComponent', () => {
  let component: MuonSachComponent;
  let fixture: ComponentFixture<MuonSachComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MuonSachComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MuonSachComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
