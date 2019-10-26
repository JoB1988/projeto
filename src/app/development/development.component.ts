import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-development',
  templateUrl: './development.component.html',
  styleUrls: ['./development.component.scss']
})
export class DevelopmentComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['card', 'status', 'progress', 'date'];
  public dataSource = new MatTableDataSource<any>(undefined);
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor() { }

  ngOnInit() {
    this.dataSource.data = [
      { card: 'cartão a', status: 1, progress: 100, date: new Date() },
      { card: 'cartão b', status: 2, progress: 80, date: new Date() },
      { card: 'cartão c', status: 1, progress: 50, date: new Date() },
      { card: 'cartão d', status: 2, progress: 20, date: new Date() },
      { card: 'cartão e', status: 1, progress: 90, date: new Date() },
      { card: 'cartão f', status: 2, progress: 10, date: new Date() },
    ];

    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  ngAfterViewInit(): void {
  }

}
