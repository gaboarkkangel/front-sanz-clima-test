import { Component, OnInit } from '@angular/core';
import { DashboardsService } from './dashboards.service';
import { Calculation } from '../model/calculation';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  createForm = this.fb.group({
    element: this.fb.array([])
  });
  calculation : Calculation;
  countList: number;

  constructor(  private dashService: DashboardsService,
                private fb: FormBuilder,
                private toastr: ToastrService
              ) { }
  
  ngOnInit() {
    this.listAll();
  }

  get element() {
    return this.createForm.get('element') as FormArray;
  }

  agregarElemento() {
    const elementoFormGroup = this.fb.group({
      elemento : ['', Validators.required]
    });
    this.element.push(elementoFormGroup);
  }

  removerElemento(indice : number) {
    this.element.removeAt(indice);
  }

  refrescar() {
    this.element.controls.splice(0, this.element.length);
    this.listAll();
  }

  listAll() { // obtine todos los registros de las operaciones de las sumas
    this.dashService
    .obtener()
    .subscribe((response) => {
      this.countList = Object.keys(response).length;
    });
  }

  createOperation(items) {
    this.dashService
    .createCalc(items)
    .subscribe( response => {
      console.log(response);
      this.refrescar();
      this.toastr.success('La suma ha sido creada, puede consultar en el menú History List', 'Operación Creada')
    }, e => {
      console.log(e.error.message);
      this.toastr.error(e.error.message, 'Error')
    });
  }

  submit() {
    if(!this.createForm.valid) {
      alert('Debe completar todos los campos');
    }
    let arrayElement = this.createForm.value.element;
    console.log(arrayElement);
    
    this.createOperation(this.createForm.value);
  }

}
