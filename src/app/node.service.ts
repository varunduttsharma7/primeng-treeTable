import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TreeNode } from 'primeng-lts/api';
import { filter, tap, map } from "rxjs/operators";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NodeService {

  constructor(private http: HttpClient) { }

  getFilesystem() {
    return this.http.get('assets/data/detail.json')
      .toPromise()
      .then((res: any) => <TreeNode[]>res.data);
  }
  getDepartments() {
    return this.http.get('assets/data/departments.json')
      .toPromise()
      .then((res: any) => <TreeNode[]>res.data);
  }

  getGroupsByDepartment(department: string = "Department 1"): Observable<any> {
    return this.http.get('assets/data/groups.json')
      .pipe(
        map((data: any) => {
          return <any[]>data.data;
        }),
        map((res) => {
          return res.filter(d => { return d.data.department === department });
        }),
        tap(res => console.log("tap : ", res)));
  }
  getUsersByDepartmentAndGroup(department: string = "Department 1", group: string = "Group 1"): Observable<any> {
    return this.http.get('assets/data/users.json')
      .pipe(
        map((data: any) => {
          return <any[]>data.data;
        }),
        map((res) => {
          return res.filter(d => { return d.data.department === department && d.data.group === group });
        }),
        tap(res => console.log("tap users : ", res)));
  }

}
