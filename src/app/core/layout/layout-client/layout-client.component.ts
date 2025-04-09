import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../../components/header/header.component';
import { FooterComponent } from '../../../components/footer/footer.component';

@Component({
  selector: 'app-layout-client',
  standalone: true,
  imports: [
    RouterModule,
    HeaderComponent,
    FooterComponent
  ],
  templateUrl: './layout-client.component.html',
  styleUrls: ['./layout-client.component.css']
})
export class LayoutClientComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
