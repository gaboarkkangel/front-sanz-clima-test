import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { TableListsService } from './table-lists.service'
@Component({
  selector: 'app-table-list',
  templateUrl: './table-list.component.html',
  styleUrls: ['./table-list.component.css']
})
export class TableListComponent implements OnInit {

  countList:number;
  list: any = [];
  constructor( private tableListService: TableListsService) { }

  ngOnInit() {
    this.listAll();
      
  }

  listAll() { // obtine todos los registros de las operaciones de las sumas
    this.tableListService
    .listarOperaciones()
    .subscribe((response) => {
      this.list = response;
      this.list.forEach(obj => {
        let jObj = JSON.parse(obj.element);
        console.log(jObj)
        obj.element = jObj.item;
      });
      this.countList = Object.keys(response).length;
    });
  }

}
