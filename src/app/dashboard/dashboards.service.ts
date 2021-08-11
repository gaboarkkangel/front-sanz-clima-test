import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";
// import { Persona } from "./persona";

@Injectable({
  providedIn: "root"
})
export class DashboardsService {
  rutaApi = "http://localhost:3000/api/v1/";
  path = "history";

  constructor(private http: HttpClient) {}

  obtener() {
    return this.http.get(`${this.rutaApi}` + this.path);
  }
}