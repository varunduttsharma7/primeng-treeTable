import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LazyTreeTableComponent } from './lazy-tree-table.component';

describe('LazyTreeTableComponent', () => {
  let component: LazyTreeTableComponent;
  let fixture: ComponentFixture<LazyTreeTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LazyTreeTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LazyTreeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
