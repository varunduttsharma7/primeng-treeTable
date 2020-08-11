import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '../node.service';
import { CHK_VALUES } from '../tree-table/tree-table.component';
import { ChildActivationEnd } from '@angular/router';

@Component({
  selector: 'app-lazy-tree-table',
  templateUrl: './lazy-tree-table.component.html',
  styleUrls: ['./lazy-tree-table.component.css']
})
export class LazyTreeTableComponent implements OnInit {


  files: TreeNode[];

  cols: any[];

  totalRecords: number;

  loading: boolean;

  constructor(private nodeService: NodeService) { }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'Name' }
    ];

    //in a production application, retrieve the logical number of rows from a remote datasource
    this.totalRecords = 1000;

    this.loading = true;
  }
  filteredRows: any;
  loadNodes(event) {
    console.log("node expanded", event);
    this.loading = true;

    this.nodeService.getDepartments().then((data: any[]) => {
      this.filteredRows = data.filter(row => this.filterField(row, event.filters))
      // sort data
      this.filteredRows.sort((a, b) => this.compareField(a, b, event.sortField) * event.sortOrder);
      this.files = this.filteredRows.slice(event.first, (event.first + event.rows));
      console.log("filtered", this.files);
      this.files = this.files.map(d => {
        return { ...d, leaf: false }
      });
      this.loading = false;
    });
  }
  filterField(row, filter) {
    let isInFilter = false;
    let noFilter = true;

    for (var columnName in filter) {
      if (row[columnName] == null) {
        return;
      }
      noFilter = false;
      let rowValue: String = row[columnName].toString().toLowerCase();
      let filterMatchMode: String = filter[columnName].matchMode;
      if (filterMatchMode.includes("contains") && rowValue.includes(filter[columnName].value.toLowerCase())) {
        isInFilter = true;
      } else if (filterMatchMode.includes("startsWith") && rowValue.startsWith(filter[columnName].value.toLowerCase())) {
        isInFilter = true;
      } else if (filterMatchMode.includes("in") && filter[columnName].value.includes(rowValue)) {
        isInFilter = true;
      }
    }

    if (noFilter) { isInFilter = true; }

    return isInFilter;
  }

  compareField(rowA, rowB, field: string): number {
    if (rowA[field] == null) return 1; // on considère les éléments null les plus petits
    if (typeof rowA[field] === 'string') {
      return rowA[field].localeCompare(rowB[field]);
    }
    if (typeof rowA[field] === 'number') {
      if (rowA[field] > rowB[field]) return 1;
      else return -1;
    }
  }


  onNodeExpand(event) {
    this.loading = true;
    console.log(event.node);
    const node = event.node;
    if (event.node.parent == undefined) {
      const department = event.node.data.name;
      this.nodeService.getGroupsByDepartment(department).subscribe(chidren => {
        this.loading = false;
        chidren = chidren.map(child => {
          return { ...child, leaf: false };
        });
        node.children = chidren;
        this.files = [...this.files];
      });
    } else {
      console.log("group node : ", node);
      const department = event.node.data.department;
      const group = event.node.data.name;
      console.log("find user", department, group);
      this.loading = false;
      this.nodeService.getUsersByDepartmentAndGroup(department, group).subscribe(children => {
        this.loading = false;
        node.children = children;
        this.files = [...this.files];
      });
    }

  }


  onGroupsLoad() {

    // this.nodeService.getGroupsByDepartment().subscribe(chidren => {
    //   console.log(chidren);
    // });
    this.nodeService.getUsersByDepartmentAndGroup().subscribe();
    // [1, 2, 3, 4].filter(d => console.log(d));
  }

  fillContent(event, element: HTMLSpanElement, rowNode) {
    let isChecked: boolean = (<HTMLInputElement>event.target).checked;
    element.textContent = isChecked ? CHK_VALUES.exclaimation : "";
    console.log(rowNode);
  }

  setSpanConetnt(element: HTMLSpanElement, value) {
    if (value == "full") {
      element.style.color = "black";
      return CHK_VALUES.ticks;
    } else if (value == "half") {
      element.style.color = "silver";
      return CHK_VALUES.ticks;
    }
    else {
      return "";
    }
  }
}
