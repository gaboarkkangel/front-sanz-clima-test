import { Component, OnInit } from '@angular/core';
import { DashboardsService } from './dashboards.service';
import * as Chartist from 'chartist';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  countList: number;

  constructor(private dashService: DashboardsService) { }
  
  ngOnInit() {
    this.listAll();
      
  }

  listAll() { // obtine todos los registros de las operaciones de las sumas
    this.dashService
    .obtener()
    .subscribe((response) => {
      this.countList = Object.keys(response).length;
    });
  }

}
