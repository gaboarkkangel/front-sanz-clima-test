import { Injectable } from "@angular/core";

import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class TableListsService {
  rutaApi = "http://localhost:3000/api/v1/";
  path = "history";

  constructor(private http: HttpClient) {}

  listarOperaciones() {
    return this.http.get(`${this.rutaApi}` + this.path);
  }
}