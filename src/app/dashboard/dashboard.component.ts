import { Component, OnInit } from '@angular/core';
import { DashboardsService } from './dashboards.service';
import { FormGroup, FormControl, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  createForm = this.fb.group({
    elementos: this.fb.array([])
  });
  countList: number;

  constructor(  private dashService: DashboardsService,
                private fb: FormBuilder
              ) { }
  
  ngOnInit() {
    this.listAll();
  }

  get elementos() {
    return this.createForm.get('elementos') as FormArray;
  }

  agregarElemento() {
    const elementoFormGroup = this.fb.group({
      elemento : ['', Validators.required]
    });
    this.elementos.push(elementoFormGroup);
  }

  removerElemento(indice : number) {
    this.elementos.removeAt(indice);
  }

  refrescar() {
    this.elementos.controls.splice(0, this.elementos.length);
  }

  listAll() { // obtine todos los registros de las operaciones de las sumas
    this.dashService
    .obtener()
    .subscribe((response) => {
      this.countList = Object.keys(response).length;
    });
  }

  submit() {
    if(!this.createForm.valid) {
      alert('Debe completar todos los campos');
    }

    console.log(this.createForm.value);
  }

}
