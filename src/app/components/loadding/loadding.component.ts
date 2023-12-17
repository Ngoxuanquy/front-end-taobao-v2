import { Component, OnInit } from '@angular/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
@Component({
  selector: 'app-loadding',
  templateUrl: './loadding.component.html',
  styleUrls: ['./loadding.component.css'],
  standalone: true,
  imports: [LoaddingComponent,  NzSpinModule],
})
export class LoaddingComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
