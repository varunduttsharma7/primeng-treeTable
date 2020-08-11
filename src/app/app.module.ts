import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { FormsModule } from "@angular/forms";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TreeTableModule } from 'primeng/treetable';
import { TreeTableComponent } from './tree-table/tree-table.component';
import { LazyTreeTableComponent } from './lazy-tree-table/lazy-tree-table.component';

@NgModule({
  declarations: [
    AppComponent,
    TreeTableComponent,
    LazyTreeTableComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    TreeTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
