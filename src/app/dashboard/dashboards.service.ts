import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
import { Calculation } from "app/model/calculation";
// import { Persona } from "./persona";

@Injectable({
  providedIn: "root"
})
export class DashboardsService {
  rutaApi = "http://localhost:3000/api/v1/";
  pathHistory = "history";
  pathCalc = "calc";

  constructor(private http: HttpClient) {}

  obtener() {
    return this.http.get(`${this.rutaApi}` + this.pathHistory);
  }

  createCalc(calculation: Calculation) {
    return this.http.post(`${this.rutaApi}` + this.pathCalc, calculation);
  }
}