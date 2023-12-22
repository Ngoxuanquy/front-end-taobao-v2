import { Component, OnInit } from '@angular/core';
import { ListTypeBookComponent } from '../../Features/typeBooks/components/listTypeBook/listTypeBook.component';

@Component({
  selector: 'app-typeBooks',
  templateUrl: './typeBooks.component.html',
  styleUrls: ['./typeBooks.component.css'],
  standalone: true,
  imports: [TypeBooksComponent, ListTypeBookComponent],
})
export class TypeBooksComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
