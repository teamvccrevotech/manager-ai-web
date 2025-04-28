import {ChangeDetectionStrategy, Component, Input, OnInit} from '@angular/core';

export interface BreadcrumbItem {
  link?: string;
  name?: string;
}

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.scss']
})
export class BreadcrumbComponent implements OnInit {
  @Input() lang: string
  @Input() items: BreadcrumbItem[] = [];
  @Input() autoGenerate: boolean = false;
  @Input() routeLabel: string = 'breadcrumb';
  @Input() routeLabelFn: (label: string) => string = label => label;

  constructor() {
  }

  ngOnInit(): void {
  }
}
