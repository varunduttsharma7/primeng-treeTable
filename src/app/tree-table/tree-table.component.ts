import { Component, OnInit } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { NodeService } from '../node.service';

@Component({
  selector: 'app-tree-table',
  templateUrl: './tree-table.component.html',
  styleUrls: ['./tree-table.component.css']
})
export class TreeTableComponent implements OnInit {

  files: TreeNode[];
  selectedNodes: TreeNode[];
  cols: any[];
  loading: boolean = false;
  totalRecords: number;

  constructor(private nodeService: NodeService) { }

  ngOnInit() {
    this.cols = [
      { field: 'name', header: 'Name' }

    ];
    this.nodeService.getFilesystem().then(files => {
      this.totalRecords = files.length;
      this.files = files;
      // this.loading = false;
    });
  }


  onReadAccess(event, rowData, rowNode) {
    console.log(rowNode);
    // rowNode.parent.data.read = "full";
    // rowNode.parent.parent.data.read = "full";
  }


  fillContent(event: Event, element: HTMLSpanElement, rowData) {
    let isChecked: boolean = (<HTMLInputElement>event.target).checked;
    element.textContent = isChecked ? CHK_VALUES.exclaimation : "";
    // element.style.color = isChecked ? "red" : "";
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

export enum CHK_VALUES {
  "ticks" = "✔",
  "exclaimation" = "?",
  "question" = "!"
}