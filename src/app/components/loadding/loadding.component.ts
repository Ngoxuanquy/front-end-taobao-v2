import { Component, OnInit } from '@angular/core';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { SpinService } from '../../core/services/spin.service';
import { CommonModule } from '@angular/common';
import { Observable, of } from 'rxjs';
@Component({
  selector: 'app-loadding',
  templateUrl: './loadding.component.html',
  styleUrls: ['./loadding.component.css'],
  standalone: true,
  imports: [
    NzSpinModule,
    CommonModule
  ],
})
export class LoaddingComponent implements OnInit {
  isLoading$: Observable<boolean> = of(false);
  constructor(private spinService: SpinService) {}

  ngOnInit() {
    this.isLoading$ = this.spinService.isLoading$;
  }
}
