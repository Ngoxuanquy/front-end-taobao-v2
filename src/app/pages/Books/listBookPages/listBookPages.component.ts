import { Component, OnInit } from '@angular/core';
import { List_booksComponent } from '../../../Features/books/components/list_books/list_books.component';

@Component({
  selector: 'app-listBookPages',
  templateUrl: './listBookPages.component.html',
  styleUrls: ['./listBookPages.component.css'],
  standalone: true,
  imports: [ListBookPagesComponent, List_booksComponent],
})
export class ListBookPagesComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
