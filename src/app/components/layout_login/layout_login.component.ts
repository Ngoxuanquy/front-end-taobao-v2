import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout_login',
  templateUrl: './layout_login.component.html',
  styleUrls: ['./layout_login.component.css'],
  standalone: true,
  imports: [Layout_loginComponent, RouterModule],
})
export class Layout_loginComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
